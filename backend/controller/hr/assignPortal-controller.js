const { connection } = require("../../config/connection");
const { SendMailAssignPortal } = require("../../mail/mailer-controller");
const { SendMessageAssignPortal } = require("../../whatsapp/whatsapp-api");
const bcrypt = require("bcryptjs");

const AssignPortal = (req, res) => {
  const { EZI_ID, name, email, phone, password, technology, managerContact } =
    req.body;
  //   console.log(req.body);

  const sql0 = "UPDATE `intern_table` SET `status`='Test' WHERE `email` = (?)";
  connection.query(sql0, [email], async (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      if (data.affectedRows === 1) {
        let hashPassword = await bcrypt.hash(password, 8);
        const internData = [
          EZI_ID,
          name,
          email,
          phone,
          hashPassword,
          technology,
        ];

        const sql1 =
          "INSERT INTO `intern_accounts`(`eti_id`, `name`, `email`, `phone`, `password`, `int_technology`) VALUES (?)";

        connection.query(sql1, [internData], (reject, resolve) => {
          if (reject) {
            return res.json(reject);
          } else {
            SendMailAssignPortal(name, email, password);
            // createPhoneQueue(phone);
            // createNameQueue(name);
            // createEmailQueue(email);
            // createPasswordQueue(password);
            // setInterval(() => {
            //   if (
            //     portalPhoneQueue.length > 0 &&
            //     portalNameQueue.length > 0 &&
            //     portalEmailQueue.length > 0 &&
            //     portalPasswordQueue.length > 0
            //   ) {
            //     SendMessageAssignPortal(
            //       getPhoneQueue().slice(1, 13),
            //       getNameQueue(),
            //       getEmailQueue(),
            //       getPasswordQueue(),
            //       managerContact
            //     );
            //   }
            // }, 30000);
          }
          return res.json(resolve.affectedRows);
        });
      }
    }
  });
};

// const ActivePortal = (req, res) => {
//   const { email } = req.body;

//   const sql0 =
//     "UPDATE `intern_table` SET `status`='Active' WHERE `email` = (?)";
//   connection.query(sql0, [email], (err, data) => {
//     if (err) {
//       return res.json(err);
//     } else {
//       if (data.affectedRows === 1) {
//         const sql1 =
//           "UPDATE `intern_accounts` SET `status`='Active' WHERE `email` = (?)";
//         connection.query(sql1, [email], (reject, resolve) => {
//           if (reject) {
//             return res.json(reject);
//           } else {
//             if (resolve.affectedRows === 1) {
//               const sql2 =
//                 "UPDATE `complete_test` SET `status`='Active' WHERE `email` = (?)";
//               connection.query(sql2, [email], (rej, rev) => {
//                 if (rej) {
//                   return res.json(rej);
//                 } else {
//                   if (rev.affectedRows === 1) {
//                     const sql_delete =
//                       "DELETE FROM `complete_test` WHERE `email` = ?";
//                     connection.query(sql_delete, [email], (reje, reso) => {
//                       if (reje) {
//                         return res.json(reje);
//                       } else {
//                         return res.json(reso.affectedRows);
//                       }
//                     });
//                   }
//                 }
//               });
//             }
//           }
//         });
//       }
//     }
//   });
// };

let portalPhoneQueue = [];
let portalNameQueue = [];
let portalEmailQueue = [];
let portalPasswordQueue = [];

function createPhoneQueue(number) {
  portalPhoneQueue.push(number);
}

function createNameQueue(name) {
  portalNameQueue.push(name);
}

function createEmailQueue(email) {
  portalEmailQueue.push(email);
}

function createPasswordQueue(password) {
  portalPasswordQueue.push(password);
}

function getPhoneQueue() {
  return portalPhoneQueue.pop();
}

function getNameQueue() {
  return portalNameQueue.pop();
}

function getEmailQueue() {
  return portalEmailQueue.pop();
}

function getPasswordQueue() {
  return portalPasswordQueue.pop();
}

module.exports = { AssignPortal };
