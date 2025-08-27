const express = require("express");
const cors = require("cors");
const { DataBase } = require("./config/connection");
const router = require("./routes/app-routes");
const bodyParser = require("body-parser");
const RunJob = require("./controller/combine/Run-Scheduler");
const { VerifyEmail } = require("./controller/combine/Verify-Email");
const dotenv = require("dotenv").config();
const downloadRoutes = require("./routes/downloadRoutes");
const affiliateRoutes = require("./routes/affiliate-routes");

const PORT = 8088;
const path = require('path')

const app = express();
app.use(bodyParser.json({ limit: "35mb" })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: "35mb", extended: true }));
app.use(express.json());

// Configure CORS options
const corsOptions = {
  origin: [
    "https://interns.ezitech.org",
    "https://manager.ezitech.org",
    "https://admin.ezitech.org",
    "https://register.ezitech.org",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Optional: Allowed methods
  // allowedHeaders: ["Content-Type", "Authorization"], // Optional: Allowed headers
  // credentials: true, // Optional: Enable credentials if needed
};

app.use(cors(corsOptions));

const certPath = path.join(__dirname, 'public/certificates');
app.use('/certificates', express.static(path.join(__dirname, '/controller/public/certificates')));

app.use(router);
app.use('/api/affiliate', affiliateRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/', downloadRoutes);
const fs = require('fs');
app.get('/list-certs', (req, res) => {
  const dir = path.join(__dirname, 'public/certificates');
  fs.readdir(dir, (err, files) => {
    if (err) return res.status(500).send('Cannot read directory');
    res.send(files);
  });
});

DataBase();

app.listen(PORT, () => {
  console.log(`Server Running on: ${PORT}`);
});

// Serve static assets from the build folder
// app.use(express.static(path.join(__dirname, "build")));

// // Fallback route to handle React routes on refresh
// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "build", "index.html"));
// });

RunJob();
// VerifyEmail()
