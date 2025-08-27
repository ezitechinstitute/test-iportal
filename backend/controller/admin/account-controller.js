const { connection } = require("../../config/connection");

const GetAllRecords = (req, res) => {
  const { fromDate, toDate } = req.query.searchDate;

  if (fromDate === "" && toDate === "") {
    const sql = `SELECT * FROM accounts`;
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  } else {
    const sql = "SELECT * FROM `accounts` WHERE `date` BETWEEN ? AND ?";
    connection.query(sql, [fromDate, toDate], (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        return res.json(data);
      }
    });
  }
};

const CreditSum = (req, res) => {
  const sql = "SELECT SUM(credit) as totalCredit FROM accounts";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].totalCredit);
    }
  });
};

const DebitSum = (req, res) => {
  const sql = "SELECT SUM(debit) as totalDebit FROM accounts";
  connection.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data[0].totalDebit);
    }
  });
};

const AddBalance = (req, res) => {
  const { tDate, popt, description, amount } = req.body.transaction;
  console.log(req.body);
  if (popt === "credit") {
    const sql =
      "SELECT balance AS totalBalance FROM accounts ORDER BY id DESC LIMIT 1";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        const total = parseInt(amount) + data[0].totalBalance;
        const sql =
          "INSERT INTO accounts (date,credit,description,balance) VALUES (?,?,?,?)";
        const values = [tDate, amount, description, total];
        connection.query(sql, values, (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            return res.send({
              message: "Transaction Submit Successfully",
              data: data,
            });
          }
        });
      }
    });
  }
  if (popt === "debit") {
    const sql =
      "SELECT balance AS totalBalance FROM accounts ORDER BY id DESC LIMIT 1";
    connection.query(sql, (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        if (data[0].totalBalance > 0) {
          const total = data[0].totalBalance - parseInt(amount);
          const sql =
            "INSERT INTO accounts (date,debit,description,balance) VALUES (?,?,?,?)";
          const values = [tDate, amount, description, total];
          connection.query(sql, values, (err, data) => {
            if (err) {
              return res.json(err);
            } else {
              return res.send({
                message: "Transaction Submit Successfully",
                data: data,
              });
            }
          });
        } else {
          return res.json({ message: "You have insufficient balance" });
        }
      }
    });
  }
};

module.exports = {
  CreditSum,
  DebitSum,
  AddBalance,
  GetAllRecords,
};
