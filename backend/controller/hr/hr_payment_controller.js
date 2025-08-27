const { connection } = require("../../config/connection");

const AddPayment = (req, res) => {
    const {
        amount,
        recipientType,
        recipientId,
        recipientName,
        adminAccountNo,
        date,
        status = 'Pending'
    } = req.body;

    if (!amount || !recipientType || !recipientId || !recipientName || !adminAccountNo || !date) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be provided'
        });
    }

    if (!['Manager', 'Supervisor'].includes(recipientType)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid recipient type'
        });
    }

    if (status && !['Pending', 'Paid'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status'
        });
    }

    const query = `
        INSERT INTO payment_vouchers (
            amount,
            recipient_type,
            recipient_id,
            recipient_name,
            admin_account_no,
            date,
            status
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [amount, recipientType, recipientId, recipientName, adminAccountNo, date, status];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error creating payment voucher:', error);
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
            message: 'Payment voucher created successfully',
            data: {
                id: result.insertId,
                amount,
                recipientType,
                recipientId,
                recipientName,
                adminAccountNo,
                date,
                status
            }
        });
    });
};

const GetPayment = (req, res) => {
    connection.query('SELECT * FROM payment_vouchers', (error, rows) => {
        if (error) {
            console.error('Error fetching payment vouchers:', error);
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

const GetPaymentByRecipientId = (req, res) => {
    const { recipient_id } = req.params;

    const query = 'SELECT * FROM payment_vouchers WHERE recipient_id = ?';
    const values = [recipient_id];

    connection.query(query, values, (error, rows) => {
        if (error) {
            console.error('Error fetching payment vouchers by recipient ID:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No payment vouchers found for this recipient'
            });
        }

        res.status(200).json({
            success: true,
            data: rows
        });
    });
};

const EditPayment = (req, res) => {
    const { id } = req.params;
    const {
        amount,
        recipientType,
        recipientId,
        recipientName,
        adminAccountNo,
        date,
        status
    } = req.body;

    if (!amount || !recipientType || !recipientId || !recipientName || !adminAccountNo || !date || !status) {
        return res.status(400).json({
            success: false,
            message: 'All required fields must be provided'
        });
    }

    if (!['Manager', 'Supervisor'].includes(recipientType)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid recipient type'
        });
    }

    if (!['Pending', 'Paid'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status'
        });
    }

    const query = `
        UPDATE payment_vouchers
        SET
            amount = ?,
            recipient_type = ?,
            recipient_id = ?,
            recipient_name = ?,
            admin_account_no = ?,
            date = ?,
            status = ?
        WHERE id = ?
    `;
    const values = [amount, recipientType, recipientId, recipientName, adminAccountNo, date, status, id];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating payment voucher:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment voucher not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payment voucher updated successfully',
            data: {
                id,
                amount,
                recipientType,
                recipientId,
                recipientName,
                adminAccountNo,
                date,
                status
            }
        });
    });
};

const EditPaymentByRecipientId = (req, res) => {
    const { recipient_id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!status) {
        return res.status(400).json({
            success: false,
            message: 'Status is required'
        });
    }

    if (!['Pending', 'Paid'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status. Allowed values: Pending, Paid'
        });
    }

    // Update only the status
    const query = `
        UPDATE payment_vouchers
        SET
            status = ?
        WHERE recipient_id = ?
    `;
    const values = [status, recipient_id];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error updating payment voucher status by recipient ID:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'No payment vouchers found for this recipient'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payment voucher status updated successfully',
            data: {
                recipient_id,
                status
            }
        });
    });
};

const DeletePayment = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM payment_vouchers WHERE id = ?';
    const values = [id];

    connection.query(query, values, (error, result) => {
        if (error) {
            console.error('Error deleting payment voucher:', error);
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'Payment voucher not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Payment voucher deleted successfully'
        });
    });
};

module.exports = { 
    AddPayment, 
    GetPayment, 
    GetPaymentByRecipientId, 
    EditPayment, 
    EditPaymentByRecipientId, 
    DeletePayment 
};