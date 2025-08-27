const { connection } = require("../../config/connection");
const { SendMailCertificate } = require("../../mail/mailer-controller");
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateCertificate(data) {
  const doc = new PDFDocument();
  const filename = `certificate_${data.eti_id}_${Date.now()}.pdf`;
 const filePath = path.join(__dirname, '..', 'public', 'certificates', filename);



  const writeStream = fs.createWriteStream(filePath);
  doc.pipe(writeStream);

  // Sample certificate content
  doc.fontSize(24).text('Certificate of Completion', { align: 'center' });
  doc.moveDown();
  doc.fontSize(18).text(`Awarded to: ${data.username}`, { align: 'center' });
  doc.moveDown();
  doc.text(`Tech: ${data.tech}`, { align: 'center' });
  doc.text(`Projects Completed: ${data.project_count}`, { align: 'center' });
  doc.text(`Experience Duration: ${data.duration}`, { align: 'center' });

  doc.end();

  return new Promise((resolve, reject) => {
    writeStream.on('finish', () => resolve(`/certificates/${filename}`));
    writeStream.on('error', reject);
  });
}


const SubmitCertificateReq = (req, res) => {
  const { eti_id, username, email, tech, project_count, joining_date, cnic } = req.body;
  const{ intern_id } = req.params;

  if (!eti_id || !username || !email || !project_count) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const durationSQL = "SELECT duration FROM intern_table WHERE email = ?";
  connection.query(durationSQL, [email], (err, result) => {
    if (err || result.length === 0) {
      return res.status(404).json({ message: "Intern not found or DB error", error: err?.message });
    }
    const duration = result[0].duration;
  const sql = `
    INSERT INTO certificate_requests 
    (eti_id, username, email, tech, project_count, duration, joining_date, cnic, status,intern_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?)
  `;

  const values = [eti_id, username, email, tech, project_count, duration, joining_date, cnic, intern_id];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error("Insert error:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
    return res.status(201).json({
      message: "Certificate request submitted",
      request_id: result.insertId,
      status: "submitted",
      eti_id,
      username,
      email,
      tech,
      project_count,
      joining_date,
      cnic,
      intern_id
    });
  });
});
};

const GetAllCertificateReqs = (req, res) => {
  const sql = "SELECT * FROM certificate_requests";
  connection.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    if (rows.length === 0) {
      return res.status(404).json({ message: "No certificate requests found" });
    }
    return res.status(200).json({ requests: rows });
  });
}

const SupApproveCert = (req, res) => {
  const { id } = req.params;
  const { remarks } = req.body;

  const sql = `
    UPDATE certificate_requests 
    SET supervisor_remarks = ?, status = 'supervisor_approved' 
    WHERE id = ?
  `;

  connection.query(sql, [remarks, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Supervisor approval failed", error: err.message });
    }
    return res.json({ message: "Supervisor approved", id });
  });
};

const ManApproveCert = (req, res, next) => {
  const { id } = req.params;
  const { issued_by } = req.body;

      const sql = `
        UPDATE certificate_requests 
        SET status = 'manager_approved' 
        WHERE id = ? AND status = 'supervisor_approved'
    `;

      connection.query(sql, [id], (err, result) => {
        if (err) {
          return res.status(500).json({ message: "Manager approval failed", error: err.message });
       }
         req.body.issued_by = issued_by;
        req.params.id = id;

        next();
  });
};

const CertificateIssuance = (req, res) => {
  const { id } = req.params;
  const { status, issued_by } = req.body;

  const selectSql = `SELECT * FROM certificate_requests WHERE id = ? AND status = 'manager_approved'`;

  connection.query(selectSql, [id], async (err, rows) => {
    if (err || rows.length === 0) {
      return res.status(400).json({ message: "No eligible request found" });
    }
  
    
    const data = rows[0];
    
    const certificateUrl = await generateCertificate(data);
    const insertSql = `
      INSERT INTO certificates 
      (student_username, student_email, eti_id, tech, project_count, experience_duration, issued_by, certificate_url, intern_id) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const insertValues = [
      data.username,
      data.email,
      data.eti_id,
      data.tech,
      data.project_count,
      data.duration,
      issued_by,
      certificateUrl,
      intern_id
    ];

    connection.query(insertSql, insertValues, (err2, result) => {
      if (err2) {
        return res.status(500).json({ message: "Certificate issue failed", error: err2.message });
      }

      SendMailCertificate(
          data.username,
          data.email,
          data.tech,
          data.duration,
          data.project_count,
          issued_by
        );

      return res.status(200).json({
        message: "Manager approved! Certificate issued successfully",
        certificateId: result.insertId,
        duration: data.duration,
        username: data.username,
        email: data.email,
        tech: data.tech,
        project_count: data.project_count,
        issued_by,
        intern_id
      });
    });
  });
  }

  const GetAllCertificates = (req, res) => {
    const sql = "SELECT * FROM `certificates`";
    try{
        connection.query(sql, (err, data) => {
        if (err){
            console.error('Error fetching all certificates:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        if (data.length === 0)
            return res.status(404).json({ message: "No certificates found" });

        return res.json({
            message: "Certificates retrieved successfully",
            data: data
        });
    });
    } catch (error) {
        console.error("Server crash:", error);
  res.status(500).json({ message: "Unexpected server error", error });
}
    
};

const GetCertificatesByEmail = 
  (req, res) => {
  const { email } = req.params;
  const sql = "SELECT * FROM certificates WHERE student_email = ?";
  connection.query(sql, [email], (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "Database error", error: err.message });
    }
    res.status(200).json({ certificates: rows });
  });
}

module.exports = {
  SubmitCertificateReq,
  SupApproveCert,
  ManApproveCert,
  CertificateIssuance,
  GetAllCertificates,
  GetCertificatesByEmail,
  GetAllCertificateReqs
};