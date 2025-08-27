const { connection } = require("../../config/connection");

// Get All Offer Letter Requests
const GetAllOfferLetterRequests = (req, res) => {
    const sql = "SELECT * FROM `offer_letter_requests`";
    connection.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching all offer letter requests:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        
        if (data.length === 0) {
            return res.status(404).json({ message: 'No offer letter requests found' });
        }

        return res.json({
            message: 'All offer letter requests retrieved successfully',
            data: data // Return all records
        });
    });
};

const UpdateOfferLetterStatus = (req, res) => {
    const request_id = req.params.id; // Using route parameter :id
    const { status } = req.body;     // Status still comes from body

    if (!request_id || !status) {
        return res.status(400).json({ message: 'Request ID and status are required' });
    }

    if (!['pending', 'reject', 'accept'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    const sql = "UPDATE `offer_letter_requests` SET `status` = ? WHERE `id` = ?";
    connection.query(sql, [status, request_id], (err, result) => {
        if (err) {
            console.error('Error updating offer letter status:', err);
            return res.status(500).json({ message: 'Server error', error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Request not found' });
        }
        return res.json({ message: 'Status updated successfully', status });
    });
};
module.exports = { 
    GetAllOfferLetterRequests, 
    UpdateOfferLetterStatus 
};