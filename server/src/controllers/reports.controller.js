const { Parser } = require('json2csv');
const PDFDocument = require('pdfkit');

async function exportCSV(req, res) {
  try {
    const payload = req.body.json ? JSON.parse(req.body.json) : req.body;
    const parser = new Parser();
    const csv = parser.parse(payload);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
    res.send(csv);
  } catch (err) {
    res.status(400).json({ error: 'Failed to generate CSV', details: err.message });
  }
}

async function exportPDF(req, res) {
  try {
    const payload = req.body.json ? JSON.parse(req.body.json) : req.body;
    const doc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    doc.pipe(res);
    doc.fontSize(16).text('Green H2 Site Recommendation Report', { underline: true });
    doc.moveDown();
    doc.fontSize(10).text(JSON.stringify(payload, null, 2));
    doc.end();
  } catch (err) {
    res.status(400).json({ error: 'Failed to generate PDF', details: err.message });
  }
}

module.exports = { exportCSV, exportPDF };
