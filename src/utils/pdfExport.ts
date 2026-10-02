import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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
 * and triggers immediate download.
 */
export async function exportToPdf(elementId: string, filename: string): Promise<boolean> {
  const source = document.getElementById(elementId);
  if (!source) {
    console.error(`Target document element #${elementId} not found.`);
    return false;
  }

  // Check if source is currently in a display:none container (e.g. mobile editor view)
  const isHidden = source.offsetParent === null || source.offsetWidth === 0;

  let targetElement: HTMLElement = source;
  let tempContainer: HTMLElement | null = null;
  const scaleWrapper = document.getElementById('document-scale-wrapper');
  const prevTransform = scaleWrapper ? scaleWrapper.style.transform : '';
  const prevTransition = scaleWrapper ? scaleWrapper.style.transition : '';

  if (isHidden) {
    // If hidden on mobile, render an exact 1:1 container at (0, 0) behind viewport
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
  } else {
    // Source is on screen: unscale wrapper for high-res 1:1 pixelated capture
    if (scaleWrapper) {
      scaleWrapper.style.transform = 'none';
      scaleWrapper.style.transition = 'none';
    }
  }

  try {
    if (document.fonts) {
      await document.fonts.ready;
    }

    // Convert vector DOM into a crisp high-resolution pixelated raster canvas (2x density)
    const canvas = await html2canvas(targetElement, {
      scale: 2.0, // 2x high-resolution pixel density (1588px wide for 794px A4)
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      imageTimeout: 15000,
    });

    // Cleanup temporary offscreen container or restore scale
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
    }
    if (scaleWrapper && !isHidden) {
      scaleWrapper.style.transform = prevTransform;
      scaleWrapper.style.transition = prevTransition;
    }

    // Convert high-resolution pixelated canvas into JPEG image data
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

    // First page: render high-resolution pixelated result
    pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pdfHeight;

    // Multi-page pagination if content exceeds 1 page
    while (heightLeft > 5) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, pdfWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pdfHeight;
    }

    const safeFilename = filename.toLowerCase().endsWith('.pdf') ? filename : `${filename}.pdf`;

    // Download via direct Blob URL link
    let downloaded = false;
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
      downloaded = true;

      setTimeout(() => {
        if (downloadAnchor.parentNode) {
          document.body.removeChild(downloadAnchor);
        }
        URL.revokeObjectURL(blobUrl);
      }, 2500);
    } catch {
      // Fallback to pdf.save
    }

    if (!downloaded) {
      pdf.save(safeFilename);
    }

    return true;
  } catch (error) {
    console.error('High-resolution pixelated PDF generation error:', error);
    if (tempContainer && tempContainer.parentNode) {
      document.body.removeChild(tempContainer);
    }
    if (scaleWrapper && !isHidden) {
      scaleWrapper.style.transform = prevTransform;
      scaleWrapper.style.transition = prevTransition;
    }
    return false;
  }
}
