import jsPDFImport, { jsPDF as jsPDFNamed } from 'jspdf';
import html2canvas from 'html2canvas';

// Robust constructor resolution for jsPDF across both ESM and CommonJS bundles
const JsPdfConstructor: any =
  typeof jsPDFNamed === 'function'
    ? jsPDFNamed
    : typeof jsPDFImport === 'function'
    ? jsPDFImport
    : (jsPDFImport as any)?.default && typeof (jsPDFImport as any).default === 'function'
    ? (jsPDFImport as any).default
    : (jsPDFImport as any)?.jsPDF;

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

/**
 * Converts the vector DOM document into a high-resolution pixelated raster PDF file
 * and triggers immediate download to the user's device.
 */
export async function exportToPdf(elementId: string, filename: string): Promise<boolean> {
  const source = document.getElementById(elementId);
  if (!source) {
    console.error(`Target document element #${elementId} not found.`);
    return false;
  }

  // 1. Temporarily unscale the wrapper so the element is rendered at 100% natural resolution (794px width)
  const scaleWrapper = document.getElementById('document-scale-wrapper');
  const prevTransform = scaleWrapper ? scaleWrapper.style.transform : '';
  const prevTransition = scaleWrapper ? scaleWrapper.style.transition : '';

  if (scaleWrapper) {
    scaleWrapper.style.transition = 'none';
    scaleWrapper.style.transform = 'none';
    // Force DOM reflow to synchronously apply unscaled layout
    void scaleWrapper.offsetHeight;
  }

  // Check if source is hidden (e.g. mobile editor view)
  const isHidden = source.offsetParent === null || source.offsetWidth === 0;
  let targetElement: HTMLElement = source;
  let tempContainer: HTMLElement | null = null;

  if (isHidden) {
    tempContainer = document.createElement('div');
    tempContainer.style.cssText = `
      position: fixed !important;
      left: 0 !important;
      top: 0 !important;
      width: 794px !important;
      z-index: -99999 !important;
      background-color: #ffffff !important;
      pointer-events: none !important;
      overflow: visible !important;
    `;
    const clone = source.cloneNode(true) as HTMLElement;
    clone.style.width = '794px';
    clone.style.minWidth = '794px';
    clone.style.maxWidth = '794px';
    clone.style.transform = 'none';
    clone.style.backgroundColor = '#ffffff';
    clone.style.display = 'block';
    tempContainer.appendChild(clone);
    document.body.appendChild(tempContainer);
    targetElement = clone;
  }

  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    // 2. High-resolution pixelated rasterization (2x scale for sharp, high-DPI graphics)
    const canvas = await html2canvas(targetElement, {
      scale: 2.0, // High-resolution pixel density (1588px wide for 794px A4)
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
      scrollX: 0,
      scrollY: 0,
    });

    // Cleanup temporary elements / restore scale wrapper
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
    }
    if (scaleWrapper) {
      scaleWrapper.style.transform = prevTransform;
      scaleWrapper.style.transition = prevTransition;
    }

    // 3. Convert high-resolution pixelated canvas into JPEG image data
    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // 4. Instantiate jsPDF using robust constructor
    const pdf = new JsPdfConstructor({
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

    // Multi-page pagination if content exceeds 1 A4 page
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;

    // 5. Trigger download using official pdf.save()
    let downloadSucceeded = false;
    try {
      pdf.save(safeFilename);
      downloadSucceeded = true;
    } catch (saveErr) {
      console.warn('pdf.save failed, falling back to direct blob anchor:', saveErr);
    }

    // Fallback if needed: direct anchor click
    if (!downloadSucceeded) {
      try {
        const pdfBlob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(pdfBlob);
        const downloadAnchor = document.createElement('a');
        downloadAnchor.href = blobUrl;
        downloadAnchor.download = safeFilename;
        downloadAnchor.rel = 'noopener';
        downloadAnchor.style.display = 'none';
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadSucceeded = true;

        setTimeout(() => {
          if (downloadAnchor.parentNode) {
            document.body.removeChild(downloadAnchor);
          }
          URL.revokeObjectURL(blobUrl);
        }, 2500);
      } catch (anchorErr) {
        console.error('All download methods failed:', anchorErr);
      }
    }

    return true;
  } catch (error) {
    console.error('High-resolution pixelated PDF generation error:', error);
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
    }
    if (scaleWrapper) {
      scaleWrapper.style.transform = prevTransform;
      scaleWrapper.style.transition = prevTransition;
    }
    return false;
  }
}
