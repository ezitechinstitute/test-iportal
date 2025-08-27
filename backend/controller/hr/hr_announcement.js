
const { connection } = require("../../config/connection");

const AddAnnouncement = (req, res) => {
    const { title, message, author_name, author_id } = req.body;

    // Validate required fields
    if (!title || !message || !author_name || !author_id) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be provided'
        });
    }

    const query = `
        INSERT INTO announcements (
            title,
            message,
            author_name,
            author_id
        ) VALUES (?, ?, ?, ?)
    `;
    const values = [title, message, author_name, author_id];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error creating announcement:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({
                    success: false,
                    message: 'Duplicate entry encountered'
                });
            }
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Announcement created successfully',
            data: {
                id: result.insertId,
                title,
                message,
                author_name,
                author_id
            }
        });
    });
};

const GetAnnouncements = (req, res) => {
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

const GetAnnouncementById = (req, res) => {
    const { author_id } = req.params; // Get author_id from URL parameter


    let query = 'SELECT * FROM announcements WHERE author_id = ?';
    let values = [author_id];

   

    connection.query(query, values, (error, rows) => {
        if (error) {
            console.error('Error fetching announcements by author ID:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        res.status(200).json({
            success: true,
            data: rows // Return all matching announcements
        });
    });
};

const EditAnnouncement = (req, res) => {
    const { id } = req.params;
    const { title, message, author_name, author_id } = req.body;

    // Validate required fields
    if (!title || !message || !author_name || !author_id) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be provided'
        });
    }

    const query = `
        UPDATE announcements
        SET
            title = ?,
            message = ?,
            author_name = ?,
            author_id = ?
        WHERE id = ?
    `;
    const values = [title, message, author_name, author_id, id];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating announcement:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Announcement updated successfully',
            data: {
                id,
                title,
                message,
                author_name,
                author_id
            }
        });
    });
};

const DeleteAnnouncement = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM announcements WHERE id = ?';
    const values = [id];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error deleting announcement:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Announcement not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Announcement deleted successfully'
        });
    });
};

module.exports = {
    AddAnnouncement,
    GetAnnouncements,
    GetAnnouncementById,
    EditAnnouncement,
    DeleteAnnouncement
};