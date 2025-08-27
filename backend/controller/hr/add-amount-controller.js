const { connection } = require("../../config/connection");
const cron = require("node-cron");
const {
  SendInvoiceInitial,
  SendInvoicePartial,
} = require("../../whatsapp/whatsapp-api");
const {
  SendMailInitialInvoice,
  SendMailPartialInvoice,
} = require("../../mail/mailer-controller");

const AddAmount = (req, res) => {
  const {
    invoiceId,
    fullAmount,
    paidAmount,
    invoiceDate,
    invoiceDue,
    managerName,
    managerMail,
    paymentMode,
    internName,
    internEmail,
    internPhone,
  } = req.body.invoice;

  const sqlManager = "SELECT * FROM `manager_accounts` WHERE `email` = ?";
  connection.query(sqlManager, [managerMail], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (paymentMode === "Initial") {
        const remainingAmount = fullAmount - paidAmount;
        const managerAmount = data[0].comission;
        const companyAmount = paidAmount - managerAmount;

        // transaction query
        const sql =
          "INSERT INTO `transactions`(`amount`, `manager_email`, `company_amount`, `manager_amount`, `remaining_amount`) VALUES (?)";
        const values = [
          paidAmount,
          managerMail,
          companyAmount,
          managerAmount,
          remainingAmount,
        ];
        connection.query(sql, [values], (err, results) => {
          if (err) {
            return res.json(err);
          }

          // update balance
          updateBalance = (email, updateAmount, callback) => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;

            const updateSql = `INSERT INTO user_balances (email, balance, year, month)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE balance = balance + VALUES(balance)`;

            const updateValues = [
              email,
              updateAmount,
              currentYear,
              currentMonth,
            ];

            connection.query(updateSql, updateValues, callback);
          };

          // creare invoice
          createInvoice = (
            inv_id,
            intern_name,
            intern_contact,
            intern_email,
            received_amount,
            remaining_amount,
            due_date,
            received_by,
            callback
          ) => {
            // const dueDate = new Date().getDay() + 10;

            const invoiceSql =
              "INSERT INTO invoices (inv_id, name, contact, intern_email, received_amount, remaining_amount, due_date, received_by) VALUES (?,?,?,?,?,?,?,?)";
            const invoiceData = [
              inv_id,
              intern_name,
              intern_contact,
              intern_email,
              received_amount,
              remaining_amount,
              due_date,
              received_by,
            ];
            connection.query(invoiceSql, invoiceData, callback);
          };

          // updateBalance(instructorEmail, instructorAmount, (err) => {
          //   if (err) {
          //     console.log(err);
          //     return res.json(err);
          //   }

          updateBalance(managerMail, managerAmount, (err) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }

            // store remaining amount
            const storeRemainingAmount = (
              internName,
              internEmail,
              internContact,
              remAmount,
              callback
            ) => {
              const remainingSql = `INSERT INTO intern_remaining_amounts (name, email, contact, remaining_amount)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE remaining_amount = VALUES(remaining_amount)`;

              const remainingValue = [
                internName,
                internEmail,
                internContact,
                remAmount,
              ];

              connection.query(remainingSql, remainingValue, callback);
            };

            storeRemainingAmount(
              internName,
              internEmail,
              internPhone,
              remainingAmount,
              (err) => {
                if (err) {
                  console.log(err);
                  return res.json(err);
                }

                // call create invoice message and function
                createInvoice(
                  invoiceId,
                  internName,
                  internPhone,
                  internEmail,
                  paidAmount,
                  remainingAmount,
                  invoiceDue,
                  managerMail,
                  (err) => {
                    if (err) {
                      console.log(err);
                      return res.json(err);
                    }
                  }
                );

                // createInvoiceQueueInitial(internPhone);

                // setInterval(() => {
                //   if (invoiceQueueInitial.length > 0) {
                SendMailInitialInvoice(
                  internEmail,
                  internName,
                  invoiceId,
                  invoiceDate,
                  fullAmount,
                  paidAmount,
                  remainingAmount,
                  invoiceDue,
                  managerName
                );
                // }
                // }, 60000);

                return res.json(
                  "Amount added and balances updated successfully"
                );
              }
            );
          });
        });
        // });
      } else {
        const companyAmount = paidAmount;

        // transaction query
        const sql =
          "INSERT INTO `transactions`(`amount`, `company_amount`, `manager_email`) VALUES (?)";
        const values = [paidAmount, companyAmount, managerMail];
        connection.query(sql, [values], (err, results) => {
          if (err) {
            return res.json(err);
          }

          // update balance
          updateBalance = (email, updateAmount, callback) => {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1;

            const updateSql = `INSERT INTO user_balances (email, balance, year, month)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE balance = balance + VALUES(balance)`;

            const updateValues = [
              email,
              updateAmount,
              currentYear,
              currentMonth,
            ];

            // console.log(updateValues);

            connection.query(updateSql, updateValues, callback);
          };

          // create invoice
          createInvoice = (
            inv_id,
            intern_name,
            intern_contact,
            intern_email,
            received_amount,
            received_by,
            callback
          ) => {
            // const dueDate = new Date().getDay() + 10;

            const invoiceSql =
              "INSERT INTO invoices (inv_id, name, contact, intern_email, received_amount, received_by) VALUES (?,?,?,?,?,?)";
            const invoiceData = [
              inv_id,
              intern_name,
              intern_contact,
              intern_email,
              received_amount,
              received_by,
            ];
            // console.log(invoiceData);
            connection.query(invoiceSql, invoiceData, callback);
          };

          updatePendingAmount = (email, callback) => {
            const updatePendingSql =
              "DELETE FROM intern_remaining_amounts WHERE email = (?)";
            connection.query(updatePendingSql, email, callback);
          };

          // updateBalance(instructorEmail, instructorAmount, (err) => {
          //   if (err) {
          //     console.log(err);
          //     return res.json(err);
          //   }

          // here whatsapp

          createInvoice(
            invoiceId,
            internName,
            internPhone,
            internEmail,
            paidAmount,
            managerMail,
            (err) => {
              if (err) {
                console.log(err);
                return res.json(err);
              }
            }
          );

          updatePendingAmount(internEmail, (err) => {
            if (err) {
              console.log(err);
              return res.json(err);
            }
          });

          // createInvoiceQueuePartial(internPhone);

          // setInterval(() => {
          //   if (invoiceQueuePartial.length > 0) {
          SendMailPartialInvoice(
            internEmail,
            internName,
            invoiceId,
            invoiceDate,
            fullAmount,
            paidAmount,
            0,
            0,
            managerName
          );
          //   }
          // }, 60000);

          return res.json("Amount added and balances updated successfully");
        });
        // });
      }
    }
  });
};

cron.schedule("0 0 1 * *", () => {
  const resetBalance = "UPDATE `user_balances` SET `balance`= 0";
  connection.query(resetBalance, (reject, resolve) => {
    if (reject) {
      return res.json(reject);
    } else {
      console.log("Balance Reset Successfully");
    }
  });
});

// const ShowMessage = () => {
//   console.log("This Function Run Every 1 Minutes!");
// };

// cron.schedule("*/15 * * * * *", () => {
//   ShowMessage();
// });

// setInterval(() => {
//   ShowMessage();
// }, 5000)

// let invoiceQueueInitial = [];
// let invoiceQueuePartial = [];

// function createInvoiceQueueInitial(phone) {
//   invoiceQueueInitial.push(phone);
// }

// function getInvoiceQueueInitial() {
//   return invoiceQueueInitial.pop();
// }

// function createInvoiceQueuePartial(phone) {
//   invoiceQueuePartial.push(phone);
// }

// function getInvoiceQueuePartial() {
//   return invoiceQueuePartial.pop();
// }

module.exports = { AddAmount };
