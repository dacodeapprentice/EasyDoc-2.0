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
    if (!ctx) return '#1e293b';

    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = '#1e293b';
    ctx.fillStyle = colorStr;
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
    const alpha = (a / 255).toFixed(3);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    return '#1e293b';
  }
}

function sanitizeOklchInString(val: string): string {
  if (!val || typeof val !== 'string' || !val.includes('oklch')) return val;
  return val.replace(/oklch\([^)]+\)/gi, (match) => convertColorToRgba(match));
}

export async function exportToPdf(elementId: string, filename: string): Promise<boolean> {
  const source = document.getElementById(elementId);
  if (!source) {
    console.error(`Target document element #${elementId} not found.`);
    return false;
  }

  // 1. Create a dedicated off-screen clone with exact locked A4 dimensions
  const clone = source.cloneNode(true) as HTMLElement;
  clone.id = 'pdf-export-clone';
  clone.style.cssText = `
    position: absolute !important;
    left: -9999px !important;
    top: 0 !important;
    width: 794px !important;
    min-width: 794px !important;
    max-width: 794px !important;
    min-height: 1123px !important;
    transform: none !important;
    box-shadow: none !important;
    background-color: #ffffff !important;
    box-sizing: border-box !important;
    z-index: -9999 !important;
  `;

  // Standardize desktop paddings on clone to match exactly
  clone.classList.remove('p-8', 'sm:p-10', 'p-12', 'sm:p-16', 'p-14', 'sm:p-14');
  clone.style.padding = '44px 52px';

  document.body.appendChild(clone);

  try {
    // 2. Wait for fonts to be ready
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Wait for all images inside clone to be fully loaded
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

    // Allow layout update
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const cloneHeight = Math.max(clone.scrollHeight, 1123);

    // 3. High-resolution capture at exact 794px width
    const canvas = await html2canvas(clone, {
      scale: 2.0, // High-DPI for crisp vector-like text and images
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 794,
      height: cloneHeight,
      windowWidth: 794,
      windowHeight: cloneHeight,
      imageTimeout: 15000,
      onclone: (clonedDoc: Document, clonedEl: HTMLElement) => {
        // Sanitize styles in cloned document to remove any oklch
        const styleTags = clonedDoc.querySelectorAll('style');
        styleTags.forEach((tag) => {
          if (tag.textContent && tag.textContent.includes('oklch')) {
            tag.textContent = sanitizeOklchInString(tag.textContent);
          }
        });

        clonedEl.style.transform = 'none';
        clonedEl.style.backgroundColor = '#ffffff';
        clonedEl.style.width = '794px';
        clonedEl.style.maxWidth = '794px';
        clonedEl.style.minWidth = '794px';

        // Preserve cloned images
        const clonedImgs = clonedEl.querySelectorAll('img');
        clonedImgs.forEach((clonedImg) => {
          clonedImg.crossOrigin = 'anonymous';
          clonedImg.style.visibility = 'visible';
          clonedImg.style.opacity = '1';
        });

        const nodes: HTMLElement[] = [
          clonedEl,
          ...Array.from(clonedEl.querySelectorAll('*') as NodeListOf<HTMLElement>),
        ];

        const targetProperties = [
          'color',
          'background-color',
          'border-color',
          'border-top-color',
          'border-bottom-color',
          'border-left-color',
          'border-right-color',
          'outline-color',
          'box-shadow',
        ];

        nodes.forEach((node) => {
          if (!node || !node.style) return;
          try {
            const computed = window.getComputedStyle(node);
            targetProperties.forEach((prop) => {
              const val = computed.getPropertyValue(prop);
              if (val && val.includes('oklch')) {
                node.style.setProperty(prop, sanitizeOklchInString(val), 'important');
              }
            });
          } catch {
            // Ignore detached node
          }
        });
      },
    });

    // 4. Remove off-screen clone
    if (clone.parentNode) {
      clone.parentNode.removeChild(clone);
    }

    // 5. Build PDF with precise A4 multi-page math
    const imgData = canvas.toDataURL('image/jpeg', 0.96);
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
    pdf.save(safeFilename);
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
