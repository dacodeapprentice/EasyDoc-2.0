import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Helper to convert any CSS color string (oklch, oklab, display-p3) to standard rgba
function convertColorToRgba(colorStr: string): string {
  if (!colorStr || typeof colorStr !== 'string') return colorStr;
  if (!colorStr.includes('oklch') && !colorStr.includes('oklab')) return colorStr;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return '#0f172a';

    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#0f172a';
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    const alpha = (a / 255).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return '#0f172a';
  }
}

function sanitizeOklchInString(val: string): string {
  if (!val || typeof val !== 'string' || (!val.includes('oklch') && !val.includes('oklab'))) return val;
  return val.replace(/oklch\([^)]+\)/gi, (match) => convertColorToRgba(match))
            .replace(/oklab\([^)]+\)/gi, (match) => convertColorToRgba(match));
}

export async function exportToPdf(elementId: string, filename: string): Promise<boolean> {
  const source = document.getElementById(elementId);
  if (!source) {
    console.error(`Target document element #${elementId} not found.`);
    return false;
  }

  // 1. Create a dedicated off-screen clone positioned at (0, 0) in viewport coords
  // so html2canvas never suffers from off-screen negative coordinate clipping
  const clone = source.cloneNode(true) as HTMLElement;
  clone.id = 'document-canvas-pdf-clone';
  clone.style.cssText = `
    position: fixed !important;
    left: 0 !important;
    top: 0 !important;
    width: 794px !important;
    min-width: 794px !important;
    max-width: 794px !important;
    min-height: 1123px !important;
    transform: none !important;
    box-shadow: none !important;
    background-color: #ffffff !important;
    box-sizing: border-box !important;
    z-index: -99999 !important;
    opacity: 0.02 !important;
    pointer-events: none !important;
  `;

  document.body.appendChild(clone);

  try {
    // 2. Wait for web fonts to be completely ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Wait for all images inside clone to be loaded
    const imgElements = Array.from(clone.querySelectorAll('img'));
    await Promise.all(
      imgElements.map((img) => {
        if (img.complete && img.naturalHeight !== 0) return Promise.resolve(true);
        return new Promise((resolve) => {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
          setTimeout(() => resolve(false), 2000);
        });
      })
    );

    // Allow browser one animation frame to render layout
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const cloneHeight = Math.max(clone.scrollHeight, 1123);

    // Pre-sanitize all inline and computed styles on the clone before html2canvas
    const allElements = [clone, ...Array.from(clone.querySelectorAll('*'))] as HTMLElement[];
    const targetProperties = [
      'color',
      'backgroundColor',
      'borderColor',
      'borderTopColor',
      'borderBottomColor',
      'borderLeftColor',
      'borderRightColor',
      'outlineColor',
    ];

    allElements.forEach((el) => {
      if (!el.style) return;
      try {
        const computed = window.getComputedStyle(el);
        targetProperties.forEach((prop) => {
          const val = (computed as any)[prop];
          if (val && typeof val === 'string' && (val.includes('oklch') || val.includes('oklab'))) {
            el.style.setProperty(
              prop.replace(/([A-Z])/g, '-$1').toLowerCase(),
              convertColorToRgba(val),
              'important'
            );
          }
        });
      } catch {
        // Ignore
      }
    });

    // 3. High-resolution capture at exact 794px A4 width
    const canvas = await html2canvas(clone, {
      scale: 2.0, // High-DPI for sharp, clear text and images
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      x: 0,
      y: 0,
      width: 794,
      height: cloneHeight,
      windowWidth: 794,
      windowHeight: cloneHeight,
      imageTimeout: 10000,
      onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
        // Sanitize styles in cloned document
        const styleTags = clonedDoc.querySelectorAll('style');
        styleTags.forEach((tag) => {
          if (tag.textContent && (tag.textContent.includes('oklch') || tag.textContent.includes('oklab'))) {
            tag.textContent = sanitizeOklchInString(tag.textContent);
          }
        });

        clonedEl.style.transform = 'none';
        clonedEl.style.backgroundColor = '#ffffff';
        clonedEl.style.width = '794px';
        clonedEl.style.maxWidth = '794px';
        clonedEl.style.minWidth = '794px';
        clonedEl.style.opacity = '1';

        // Preserve cloned images
        const clonedImgs = clonedEl.querySelectorAll('img');
        clonedImgs.forEach((clonedImg) => {
          clonedImg.crossOrigin = 'anonymous';
          clonedImg.style.visibility = 'visible';
          clonedImg.style.opacity = '1';
        });
      },
    });

    // 4. Remove temporary clone from DOM
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }

    // 5. Build PDF with precise A4 multi-page math
    const imgData = canvas.toDataURL('image/jpeg', 0.98);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210 mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297 mm
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page pagination: only if content exceeds 1 full page by more than 8mm margin
    while (heightLeft > 8) {
      position = heightLeft - imgHeight; // Correct continuous offset
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;

    // Download method: Create a Blob URL and trigger link download directly
    try {
      const pdfBlob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(pdfBlob);
      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = blobUrl;
      downloadAnchor.download = safeFilename;
      downloadAnchor.style.display = 'none';
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();

      setTimeout(() => {
        if (downloadAnchor.parentNode) {
          downloadAnchor.parentNode.removeChild(downloadAnchor);
        }
        URL.revokeObjectURL(blobUrl);
      }, 2000);
    } catch {
      // Fallback
      pdf.save(safeFilename);
    }

    return true;
  } catch (error) {
    console.error('Failed to generate PDF document:', error);
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }
    return false;
  }
}

export function printDocument(): void {
  const scaleWrapper = document.getElementById('document-scale-wrapper');
  const previousTransform = scaleWrapper ? scaleWrapper.style.transform : '';

  if (scaleWrapper) {
    scaleWrapper.style.transform = 'none';
  }

  window.print();

  if (scaleWrapper) {
    scaleWrapper.style.transform = previousTransform;
  }
}
