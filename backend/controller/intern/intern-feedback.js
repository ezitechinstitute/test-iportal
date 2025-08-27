const { connection } = require("../../config/connection");

// Get Feedback by eti_id (from session)
const GetFeedback = (req, res) => {
    const { id } = req.query; 

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sql = "SELECT * FROM `intern_feedback` WHERE `eti_id` = ?";
    connection.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error fetching feedback:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        return res.json(data);
    });
};

// Insert Feedback (using exact received ID)
const InsertFeedback = (req, res) => {
    const { feedback_text } = req.body;
    const { id } = req.query;  // Use exact received ID

    console.log('Received ID:', id); // Log the received ID
  
    if (!feedback_text) {
        console.error('Feedback text is missing');
        return res.status(400).json({ message: 'Feedback text is required' });
    }
  
    if (!id) {
        console.error('ID is missing');
        return res.status(400).json({ message: 'ID is required' });
    }
  
    const sql = "INSERT INTO `intern_feedback` (`eti_id`, `feedback_text`) VALUES (?, ?)";
    connection.query(sql, [id, feedback_text], (err, result) => {
        if (err) {
            console.error('Error while inserting feedback:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        console.log('Feedback inserted with ID:', result.insertId);
        return res.status(201).json({ message: 'Feedback inserted successfully', feedback_id: result.insertId });
    });
};

// Manager Complaint
const ManagerComplaint = (req, res) => {
    const { eti_id, complaint_name, complaint_text } = req.body;

    if (!eti_id || !complaint_name || !complaint_text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = "INSERT INTO `manager_complaints` (`eti_id`, `complaint_name`, `complaint_text`) VALUES (?, ?, ?)";
    connection.query(sql, [eti_id, complaint_name, complaint_text], (err, result) => {
        if (err) {
            console.error('Error while posting manager complaint:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        console.log('Manager complaint posted with ID:', result.insertId);
        return res.status(201).json({ message: 'Manager complaint posted successfully', complaint_id: result.insertId });
    });
};

// Supervisor Complaint
const SupervisorComplaint = (req, res) => {
    const { eti_id, complaint_name, complaint_text } = req.body;

    if (!eti_id || !complaint_name || !complaint_text) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const sql = "INSERT INTO `supervisor_complaints` (`eti_id`, `complaint_name`, `complaint_text`) VALUES (?, ?, ?)";
    connection.query(sql, [eti_id, complaint_name, complaint_text], (err, result) => {
        if (err) {
            console.error('Error while posting supervisor complaint:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        console.log('Supervisor complaint posted with ID:', result.insertId);
        return res.status(201).json({ message: 'Supervisor complaint posted successfully', complaint_id: result.insertId });
    });
};

// Get Manager Complaints by eti_id
const GetManagerComplaints = (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sql = "SELECT * FROM `manager_complaints` WHERE `eti_id` = ?";
    connection.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error fetching manager complaints:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        return res.json(data);
    });
};

// Get Supervisor Complaints by eti_id
const GetSupervisorComplaints = (req, res) => {
    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }

    const sql = "SELECT * FROM `supervisor_complaints` WHERE `eti_id` = ?";
    connection.query(sql, [id], (err, data) => {
        if (err) {
            console.error('Error fetching supervisor complaints:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        return res.json(data);
    });
};

module.exports = { 
    GetFeedback, 
    InsertFeedback, 
    ManagerComplaint, 
    SupervisorComplaint,
    GetManagerComplaints,
    GetSupervisorComplaints
};