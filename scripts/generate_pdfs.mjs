import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

const DOCS_DIR = path.resolve('docs');
const PUBLIC_DOCS_DIR = path.resolve('public/docs');

if (!fs.existsSync(PUBLIC_DOCS_DIR)) {
  fs.mkdirSync(PUBLIC_DOCS_DIR, { recursive: true });
}

// Color palette matching Soft Haeven's Editorial Aesthetic
const COLORS = {
  ink: '#2D2A26',
  clay: '#B05B3B',
  sand: '#D4C3A3',
  lightBg: '#F8F6F0',
  charcoal: '#5A5A5A',
  white: '#FFFFFF',
  line: '#E2DCD5',
  tableHeaderBg: '#2D2A26',
  tableRowAlt: '#FAF8F5'
};

function formatText(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1').replace(/`(.*?)`/g, '$1');
}

function parseMarkdown(content) {
  const lines = content.split(/\r?\n/);
  const elements = [];
  let inCodeBlock = false;
  let codeBuffer = [];
  let tableBuffer = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push({ type: 'code', content: codeBuffer.join('\n') });
        codeBuffer = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    // Check for table line
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      tableBuffer.push(line);
      continue;
    } else if (tableBuffer.length > 0) {
      elements.push({ type: 'table', rows: parseTable(tableBuffer) });
      tableBuffer = [];
    }

    if (!line.trim()) {
      elements.push({ type: 'space' });
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push({ type: 'h1', text: line.replace('# ', '').trim() });
    } else if (line.startsWith('## ')) {
      elements.push({ type: 'h2', text: line.replace('## ', '').trim() });
    } else if (line.startsWith('### ')) {
      elements.push({ type: 'h3', text: line.replace('### ', '').trim() });
    } else if (line.startsWith('#### ')) {
      elements.push({ type: 'h4', text: line.replace('#### ', '').trim() });
    } else if (line.trim() === '---') {
      elements.push({ type: 'hr' });
    } else if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      elements.push({ type: 'bullet', text: line.trim().substring(2).trim() });
    } else if (/^\d+\.\s/.test(line.trim())) {
      const match = line.trim().match(/^(\d+)\.\s(.*)$/);
      elements.push({ type: 'numbered', num: match[1], text: match[2].trim() });
    } else if (line.trim().startsWith('>')) {
      elements.push({ type: 'quote', text: line.replace(/^>\s*/, '').trim() });
    } else {
      elements.push({ type: 'p', text: line.trim() });
    }
  }

  if (tableBuffer.length > 0) {
    elements.push({ type: 'table', rows: parseTable(tableBuffer) });
  }

  return elements;
}

function parseTable(lines) {
  const rows = [];
  for (const line of lines) {
    // Check if it's the separator line | :--- | ---: |
    if (/^\|[\s\-:]+\|/.test(line.trim())) {
      continue;
    }
    const cols = line
      .split('|')
      .slice(1, -1)
      .map(c => c.trim());
    if (cols.length > 0) {
      rows.push(cols);
    }
  }
  return rows;
}

function renderDocumentToPDF(docTitle, docSubtitle, elements, outputPath) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 55, bottom: 55, left: 50, right: 50 },
      bufferPages: true
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    const pageWidth = doc.page.width - 100; // 495.28 pt usable width

    // Header banner on first page
    doc.rect(50, 45, pageWidth, 6).fill(COLORS.clay);
    doc.moveDown(0.8);

    doc
      .font('Helvetica-Bold')
      .fontSize(22)
      .fillColor(COLORS.ink)
      .text(docTitle, { align: 'left' });

    if (docSubtitle) {
      doc
        .font('Helvetica-Bold')
        .fontSize(12)
        .fillColor(COLORS.clay)
        .text(docSubtitle, { align: 'left' });
    }

    doc
      .font('Helvetica')
      .fontSize(9)
      .fillColor(COLORS.charcoal)
      .text(`Smart India Hackathon Innovation Submission  •  Date: September 2026  •  Version 1.0`, { align: 'left' });

    doc.moveDown(0.5);
    doc.strokeColor(COLORS.sand).lineWidth(1).moveTo(50, doc.y).lineTo(50 + pageWidth, doc.y).stroke();
    doc.moveDown(1);

    // Render elements
    for (let i = 0; i < elements.length; i++) {
      const el = elements[i];

      // Auto page break safety buffer
      if (doc.y > doc.page.height - 85 && el.type !== 'space') {
        doc.addPage();
      }

      switch (el.type) {
        case 'h1': {
          if (doc.y > 100) doc.moveDown(0.8);
          doc
            .font('Helvetica-Bold')
            .fontSize(16)
            .fillColor(COLORS.ink)
            .text(formatText(el.text));
          doc.strokeColor(COLORS.clay).lineWidth(1.5).moveTo(50, doc.y + 2).lineTo(130, doc.y + 2).stroke();
          doc.moveDown(0.5);
          break;
        }
        case 'h2': {
          doc.moveDown(0.6);
          if (doc.y > doc.page.height - 90) doc.addPage();
          doc
            .font('Helvetica-Bold')
            .fontSize(13)
            .fillColor(COLORS.clay)
            .text(formatText(el.text));
          doc.moveDown(0.3);
          break;
        }
        case 'h3': {
          doc.moveDown(0.4);
          if (doc.y > doc.page.height - 80) doc.addPage();
          doc
            .font('Helvetica-Bold')
            .fontSize(11)
            .fillColor(COLORS.ink)
            .text(formatText(el.text));
          doc.moveDown(0.2);
          break;
        }
        case 'h4': {
          doc.moveDown(0.3);
          doc
            .font('Helvetica-Bold')
            .fontSize(10)
            .fillColor(COLORS.charcoal)
            .text(formatText(el.text));
          doc.moveDown(0.2);
          break;
        }
        case 'hr': {
          doc.moveDown(0.5);
          doc.strokeColor(COLORS.line).lineWidth(0.8).moveTo(50, doc.y).lineTo(50 + pageWidth, doc.y).stroke();
          doc.moveDown(0.5);
          break;
        }
        case 'quote': {
          const startY = doc.y;
          const cleanText = formatText(el.text);
          doc
            .font('Helvetica-Oblique')
            .fontSize(9.5)
            .fillColor('#3E3832')
            .text(cleanText, 65, doc.y, { width: pageWidth - 25 });
          const endY = doc.y;
          doc.strokeColor(COLORS.clay).lineWidth(2.5).moveTo(53, startY - 1).lineTo(53, endY).stroke();
          doc.x = 50;
          doc.moveDown(0.4);
          break;
        }
        case 'bullet': {
          const cleanText = formatText(el.text);
          doc.font('Helvetica').fontSize(9.5).fillColor(COLORS.ink);
          doc.fillColor(COLORS.clay).text('•', 55, doc.y, { continued: true });
          doc.fillColor(COLORS.ink).text(`  ${cleanText}`, 65, doc.y, { width: pageWidth - 20 });
          doc.x = 50;
          doc.moveDown(0.25);
          break;
        }
        case 'numbered': {
          const cleanText = formatText(el.text);
          doc.font('Helvetica').fontSize(9.5).fillColor(COLORS.ink);
          doc.font('Helvetica-Bold').fillColor(COLORS.clay).text(`${el.num}.`, 55, doc.y, { continued: true });
          doc.font('Helvetica').fillColor(COLORS.ink).text(` ${cleanText}`, 68, doc.y, { width: pageWidth - 22 });
          doc.x = 50;
          doc.moveDown(0.25);
          break;
        }
        case 'code': {
          if (doc.y > doc.page.height - 110) doc.addPage();
          const startY = doc.y;
          const lines = el.content.split('\n').slice(0, 30); // reasonable display
          const codeText = lines.join('\n');
          doc.font('Courier').fontSize(8);
          const height = doc.heightOfString(codeText, { width: pageWidth - 20 }) + 12;

          doc.rect(50, startY, pageWidth, height).fill(COLORS.lightBg);
          doc.strokeColor(COLORS.sand).lineWidth(0.5).rect(50, startY, pageWidth, height).stroke();

          doc.fillColor('#262626').text(codeText, 60, startY + 6, { width: pageWidth - 20 });
          doc.x = 50;
          doc.y = startY + height + 6;
          break;
        }
        case 'table': {
          if (el.rows.length === 0) break;
          const colsCount = el.rows[0].length;
          const colWidth = pageWidth / colsCount;

          if (doc.y > doc.page.height - 100) doc.addPage();

          // Render rows
          for (let r = 0; r < el.rows.length; r++) {
            const row = el.rows[r];
            const isHeader = r === 0;

            // Calculate row height
            doc.font(isHeader ? 'Helvetica-Bold' : 'Helvetica').fontSize(8);
            let maxCellHeight = 16;
            for (let c = 0; c < row.length; c++) {
              const textHeight = doc.heightOfString(formatText(row[c]), { width: colWidth - 8 }) + 6;
              if (textHeight > maxCellHeight) maxCellHeight = textHeight;
            }

            if (doc.y + maxCellHeight > doc.page.height - 50) {
              doc.addPage();
            }

            const rowY = doc.y;

            // Background
            if (isHeader) {
              doc.rect(50, rowY, pageWidth, maxCellHeight).fill(COLORS.tableHeaderBg);
            } else if (r % 2 === 1) {
              doc.rect(50, rowY, pageWidth, maxCellHeight).fill(COLORS.tableRowAlt);
            }

            // Cell text
            for (let c = 0; c < row.length; c++) {
              const cellX = 50 + c * colWidth;
              const cellText = formatText(row[c]);
              doc
                .font(isHeader ? 'Helvetica-Bold' : 'Helvetica')
                .fontSize(8)
                .fillColor(isHeader ? COLORS.white : COLORS.ink)
                .text(cellText, cellX + 4, rowY + 4, { width: colWidth - 8, align: 'left' });
            }

            // Bottom border
            doc
              .strokeColor(isHeader ? COLORS.clay : COLORS.line)
              .lineWidth(isHeader ? 1.2 : 0.5)
              .moveTo(50, rowY + maxCellHeight)
              .lineTo(50 + pageWidth, rowY + maxCellHeight)
              .stroke();

            doc.y = rowY + maxCellHeight + 2;
          }
          doc.x = 50;
          doc.moveDown(0.4);
          break;
        }
        case 'p': {
          const cleanText = formatText(el.text);
          doc
            .font('Helvetica')
            .fontSize(9.5)
            .fillColor(COLORS.ink)
            .text(cleanText, { width: pageWidth, lineGap: 1.5 });
          doc.moveDown(0.25);
          break;
        }
        case 'space': {
          doc.moveDown(0.3);
          break;
        }
      }
    }

    // Add page numbers and running header/footer
    const range = doc.bufferedPageRange();
    for (let i = range.start; i < range.start + range.count; i++) {
      doc.switchToPage(i);

      // Running Header (pages after first)
      if (i > 0) {
        doc
          .font('Helvetica')
          .fontSize(7.5)
          .fillColor(COLORS.charcoal)
          .text(`Soft Haeven  |  ${docTitle}`, 50, 30, { align: 'left' });

        doc
          .font('Helvetica-Bold')
          .fontSize(7.5)
          .fillColor(COLORS.clay)
          .text(`SIH Innovation Submission`, 50 + pageWidth - 150, 30, { width: 150, align: 'right' });

        doc.strokeColor(COLORS.line).lineWidth(0.5).moveTo(50, 42).lineTo(50 + pageWidth, 42).stroke();
      }

      // Running Footer (all pages)
      doc.strokeColor(COLORS.line).lineWidth(0.5).moveTo(50, doc.page.height - 40).lineTo(50 + pageWidth, doc.page.height - 40).stroke();

      doc
        .font('Helvetica')
        .fontSize(7.5)
        .fillColor(COLORS.charcoal)
        .text(`Soft Haeven — Indian Cultural & Heritage Platform`, 50, doc.page.height - 32, { align: 'left' });

      doc
        .font('Helvetica')
        .fontSize(7.5)
        .fillColor(COLORS.charcoal)
        .text(`Page ${i + 1} of ${range.count}`, 50 + pageWidth - 100, doc.page.height - 32, { width: 100, align: 'right' });
    }

    doc.end();
    stream.on('finish', () => resolve(outputPath));
    stream.on('error', reject);
  });
}

async function main() {
  console.log('Generating Soft Haeven Documentation PDFs...');

  const files = [
    {
      src: '01_PRD.md',
      title: 'Product Requirements Document (PRD)',
      subtitle: 'Soft Haeven — Cultural Heritage & Civic Conservation Platform',
      pdfName: '01_Soft_Haeven_PRD.pdf'
    },
    {
      src: '02_ARCHITECTURE.md',
      title: 'Software Architecture Document (SAD)',
      subtitle: 'System Architecture, Domain Registries & Core Subsystems',
      pdfName: '02_Soft_Haeven_Architecture.pdf'
    },
    {
      src: '03_UI_UX_SPECIFICATION.md',
      title: 'UI/UX Design Specification Document',
      subtitle: 'Editorial Aesthetic, Typographic System & Layout Tokens',
      pdfName: '03_Soft_Haeven_UI_UX_Specification.pdf'
    },
    {
      src: '04_SRS.md',
      title: 'Software Requirements Specification (SRS)',
      subtitle: 'IEEE 830 Conforming System & Functional Requirements',
      pdfName: '04_Soft_Haeven_SRS.pdf'
    },
    {
      src: '05_DEVELOPMENT_GUIDE.md',
      title: 'Development & Engineering Guide',
      subtitle: 'Local Setup, Code Structure, Workflows & Production Build',
      pdfName: '05_Soft_Haeven_Development_Guide.pdf'
    }
  ];

  for (const item of files) {
    const mdPath = path.join(DOCS_DIR, item.src);
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, 'utf8');
      const elements = parseMarkdown(content);

      // Save to docs/ and public/docs/
      const outPublic = path.join(PUBLIC_DOCS_DIR, item.pdfName);
      const outDocs = path.join(DOCS_DIR, item.pdfName);

      await renderDocumentToPDF(item.title, item.subtitle, elements, outPublic);
      fs.copyFileSync(outPublic, outDocs);

      console.log(`✓ Generated: ${item.pdfName} (${fs.statSync(outPublic).size} bytes)`);
    }
  }

  // Generate Master Combined Dossier
  console.log('Generating Master Combined SIH Innovation Dossier PDF...');
  let combinedElements = [];
  combinedElements.push({
    type: 'h1',
    text: 'Soft Haeven — Master Technical & Product Documentation'
  });
  combinedElements.push({
    type: 'p',
    text: 'Comprehensive documentation dossier prepared for Smart India Hackathon (SIH) submission. Includes Product Requirements Document (PRD), System Architecture Document (SAD), UI/UX Design Specifications, IEEE 830 Software Requirements Specification (SRS), and Development Engineering Guide.'
  });
  combinedElements.push({ type: 'hr' });

  for (const item of files) {
    const mdPath = path.join(DOCS_DIR, item.src);
    if (fs.existsSync(mdPath)) {
      const content = fs.readFileSync(mdPath, 'utf8');
      const elements = parseMarkdown(content);
      combinedElements.push({ type: 'h1', text: `Section: ${item.title}` });
      combinedElements.push({ type: 'hr' });
      combinedElements = combinedElements.concat(elements);
      combinedElements.push({ type: 'hr' });
    }
  }

  const masterPdfName = 'Soft_Haeven_Complete_SIH_Documentation.pdf';
  const masterPublic = path.join(PUBLIC_DOCS_DIR, masterPdfName);
  const masterDocs = path.join(DOCS_DIR, masterPdfName);

  await renderDocumentToPDF(
    'Soft Haeven — Complete SIH Documentation Suite',
    'Full Product, Architecture, UI/UX, SRS & Engineering Dossier',
    combinedElements,
    masterPublic
  );
  fs.copyFileSync(masterPublic, masterDocs);
  console.log(`✓ Generated Master: ${masterPdfName} (${fs.statSync(masterPublic).size} bytes)`);

  console.log('\nAll PDF documents generated successfully!');
}

main().catch(err => {
  console.error('Error generating PDFs:', err);
  process.exit(1);
});
