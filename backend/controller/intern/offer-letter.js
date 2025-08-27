const { connection } = require("../../config/connection");

// Get Offer Letter Request by ezi_id (using route parameter)
const GetOfferLetterRequest = (req, res) => {
    const ezi_id = req.params.id; // Using route parameter :id

    if (!ezi_id) {
        return res.status(400).json({ message: 'EZI ID is required' });
    }

    const sql = "SELECT * FROM `offer_letter_requests` WHERE `ezi_id` = ?";
    connection.query(sql, [ezi_id], (err, data) => {
        if (err) {
            console.error('Error fetching offer letter request:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        
        if (data.length === 0) {
            return res.status(404).json({ message: `No offer letter requests found for ezi_id: ${ezi_id}` });
        }

        return res.json({
            message: 'Offer letter request retrieved successfully',
            data: data[0] // Return first record (assuming ezi_id is unique)
        });
    });
};

// Insert Offer Letter Request
const InsertOfferLetterRequest = (req, res) => {
    const { offer_letter_id,username, email, ezi_id, intern_status, tech, reason } = req.body;

    // Validation
    if (!username || !email || !ezi_id || !reason) {
        console.error('Required fields are missing');
        return res.status(400).json({ 
            message: 'Username, email, EZI ID, and reason are required' 
        });
    }

    const sql = `
        INSERT INTO \`offer_letter_requests\` 
        (\`offer_letter_id\`,\`username\`, \`email\`, \`ezi_id\`, \`intern_status\`, \`tech\`, \`reason\`, \`status\`) 
        VALUES (?,?,?, ?, ?, ?, ?, 'pending')
    `;
    
    const values = [
        offer_letter_id,
        username,
        email,
        ezi_id,
        intern_status || null,
        tech || null,
        reason
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error while inserting offer letter request:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        console.log('Offer letter request inserted with ID:', result.insertId);
        return res.status(201).json({ 
            message: 'Offer letter request submitted successfully', 
            request_id: result.insertId,
            status: 'pending'
        });
    });
};

const GetManagerDetails = (req, res) => {
    const { interview_type } = req.query;

    if (!interview_type) {
        return res.status(400).json({ message: 'Interview type is required' });
    }

    const sql = `
        SELECT ma.name, ma.contact 
        FROM manager_accounts ma
        JOIN manager_permissions mp ON ma.manager_id = mp.manager_id
        WHERE ma.loginas = 'Manager' 
        AND mp.interview_type = ?
    `;

    connection.query(sql, [interview_type], (err, data) => {
        if (err) {
            console.error('Error fetching manager details:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }

        if (data.length === 0) {
            return res.status(404).json({ message: `No managers found for interview type: ${interview_type}` });
        }

        return res.json({
            message: 'Manager details retrieved successfully',
            data: data // Return all matching managers
        });
    });
};
module.exports = { 
    GetOfferLetterRequest, 
    InsertOfferLetterRequest, 
    GetManagerDetails // Export the new controller
};