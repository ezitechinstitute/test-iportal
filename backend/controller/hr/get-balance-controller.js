const { connection } = require("../../config/connection");

const GetManagerBalance = (req, res) => {
  const { email } = req.params;

  const sql = "SELECT `balance` FROM `user_balances` WHERE `email` = (?)";
  connection.query(sql, [email], (err, data) => {
    if (err) {
        console.log(err)
      return res.json(err);
    } else {
        // console.log(data)
      return res.json(data);
    }
  });
};

module.exports = { GetManagerBalance };
