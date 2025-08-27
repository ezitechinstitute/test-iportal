const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/download-certificate/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '../public/certificates', filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    console.error("❌ File not found:", filePath);
    res.status(404).json({ message: "Certificate not found" });
  }
});

module.exports = router;
