const { connection } = require("../../config/connection");

const GetAdminBalance = (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  const sql = `SELECT SUM(company_amount) AS total_amount
    FROM transactions
    WHERE MONTH(created_at) = ? AND YEAR(created_at) = ?`;
  connection.query(sql, [currentMonth, currentYear], (err, data) => {
    if (err) {
      //   console.log(err);
      return res.json(err);
    } else {
      //   console.log(data);
      if (data[0].total_amount === null) {
        console.log("Null");
      } else {
        const sql_salaries = `SELECT SUM(balance) AS total_salary
    FROM user_balances WHERE MONTH(updated_at) = ? AND YEAR(updated_at) = ?`;

        connection.query(
          sql_salaries,
          [currentMonth, currentYear],
          (reject, resolve) => {
            if (reject) {
              console.log(reject);
            } else {
              console.log(resolve);
              return res.json(data[0].total_amount - resolve[0].total_salary);
            }
          }
        );
      }
    }
  });
};

const GetSalaries = (req, res) => {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const sql_salaries = `SELECT SUM(balance) AS total_salary
  FROM user_balances WHERE MONTH(updated_at) = ? AND YEAR(updated_at) = ?`;

  connection.query(
    sql_salaries,
    [currentMonth, currentYear],
    (reject, resolve) => {
      if (reject) {
        return res.json(reject);
      } else {
        return res.json(resolve[0].total_salary);
      }
    }
  );
};

module.exports = { GetAdminBalance, GetSalaries };
