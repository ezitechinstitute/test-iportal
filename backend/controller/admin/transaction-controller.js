const { connection } = require("../../config/connection");

const Transactions = (req, res) => {
  const { month } = req.params;
  const currentYear = new Date().getFullYear();

  const sql =
    "SELECT * FROM `transactions` WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?";
  connection.query(sql, [month, currentYear], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const Invoices = (req, res) => {
  const { month } = req.params;
  const currentYear = new Date().getFullYear();

  const sql =
    "SELECT * FROM `invoices` WHERE MONTH(created_at) = ? AND YEAR(created_at) = ? ORDER BY id DESC";
  connection.query(sql, [month, currentYear], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};

const GetTotalAmount = (req, res) => {
  const sql = "SELECT SUM(amount) as total_amount FROM transactions";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].total_amount);
    }
  });
};

const GetReceivedAmount = (req, res) => {
  const sql =
    "SELECT SUM(received_amount) as received_amount FROM invoices WHERE status = 1";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].received_amount);
    }
  });
};

const GetRemainingAmount = (req, res) => {
  const sql =
    "SELECT SUM(remaining_amount) as remaining_amount FROM intern_remaining_amounts";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].remaining_amount);
    }
  });
};

const ActivePortal = (email) => {
  const sql0 = "UPDATE `intern_table` SET `status`= 'Active' WHERE `email` = ?";
  connection.query(sql0, [email], (err, data) => {
    if (err) {
      return err;
    } else {
      if (data.affectedRows === 1) {
        const sql1 =
          "UPDATE `intern_accounts` SET `int_status`= 'Active' WHERE `email` = ?";
        connection.query(sql1, [email], (reject, resolve) => {
          if (reject) {
            return reject;
          } else {
            console.log("Portal Activated");
          }
        });
      }
    }
  });
};

const ApproveInvoice = (req, res) => {
  const { email } = req.params;
  const { paidAmount } = req.body;

  if (paidAmount > 3000) {
    const sql = "UPDATE `invoices` SET `status`= 1 WHERE `intern_email` = ?";

    connection.query(sql, [email], async (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        if (data.affectedRows === 1) {
          ActivePortal(email);
          return res.json(data.affectedRows);
        }
      }
    });
  } else {
    const sql = "UPDATE `invoices` SET `status`= 1 WHERE `intern_email` = ?";

    connection.query(sql, [email], (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data.affectedRows);
      }
    });
  }
};

const DeleteInvoice = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM `invoices` WHERE `id` = ?";
  connection.query(sql, [id], (err, data) => {
    if (err) throw err;
    return res.json({ message: "Invoice deleted successfuly" });
  });
};

module.exports = {
  Transactions,
  Invoices,
  ApproveInvoice,
  GetTotalAmount,
  GetReceivedAmount,
  GetRemainingAmount,
  DeleteInvoice,
};
