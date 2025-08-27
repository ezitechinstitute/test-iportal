const { connection } = require("../../config/connection");
const GetInternAnnouncements = (req, res) => {
    connection.query('SELECT * FROM announcements', (error, rows) => {
        if (error) {
            console.error('Error fetching announcements:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        res.status(200).json({
            success: true,
            data: rows
        });
    });
};
module.exports = {
    GetInternAnnouncements,
};