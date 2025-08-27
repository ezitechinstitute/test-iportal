const { connection } = require("../../config/connection");
const {
  SendMailRegister,
  SendMailVerifyCode,
} = require("../../mail/mailer-controller");

const {
  SendMessageRemote,
  SendMessageOnsite,
  SendMessageOther,
} = require("../../whatsapp/whatsapp-api.js");
// const { DeleteVerificationCode } = require("../combine/Verify-Email.js");
const dotenv = require("dotenv").config();

// const id = process.env.INSTANCEID;
// const token = process.env.ACCESSTOKEN;

const RegisterInterns = (req, res) => {
  const {
    internUsername,
    internemail,
    internCity,
    internPhone,
    internGender,
    internImage,
    internJoinDate,
    internDob,
    internUniversity,
    country,
    interviewType,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  } = req.body.value;

  let interndata = [
    internUsername,
    internemail,
    internCity,
    internPhone,

    internGender,
    internImage,
    internJoinDate,
    internDob,
    internUniversity,
    country,
    interviewType,
    internTechnology,
    internDuration,
    internType,
    interviewDate,
    interviewTime,
  ];

  const sql0 = "SELECT * FROM `intern_table` WHERE `email`= (?)";
  connection.query(sql0, [internemail], (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      let flag = 0;

      for (let i = 0; i < data.length; i++) {
        if (data[0].email === internemail) {
          flag = 1;
          return res.json({ exist: true });
        }
      }

      if (flag === 0) {
        const sql1 =
          "INSERT INTO `intern_table`(`name`, `email`, `city`, `phone`, `gender`, `image`, `join_date`, `birth_date`, `university`, `country`, `interview_type`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

        connection.query(sql1, [interndata], (err, data) => {
          if (err) {
            console.log(err);
            return res.json(err);
          } else {
            // console.log(data)
            if (data.affectedRows === 1) {
              SendMailRegister(
                internUsername,
                internemail,
                internTechnology,
                internType,
                interviewType
              );
              // if (interviewType === "Remote") {
              //   if (
              //     internTechnology === "Digital Marketing" ||
              //     internTechnology === "Search Engine Optimization (SEO)" ||
              //     internTechnology === "WordPress Development"
              //   ) {
              //     createOtherQueue(internPhone);
              //     setInterval(() => {
              //       if (dataOther.length > 0) {
              //         SendMessageOther(getOtherQueue().slice(1, 13));
              //       }
              //     }, 60000);
              //   } else {
              //     createQueueRemote(internPhone);
              //     setInterval(() => {
              //       if (dataRemote.length > 0) {
              //         SendMessageRemote(getRemoteQueue().slice(1, 13));
              //       }
              //     }, 60000);
              //   }

              //   // SendMailRemote(
              //   //   internUsername,
              //   //   internemail,
              //   //   interviewDate,
              //   //   interviewTime
              //   // );
              // } else {
              //   if (
              //     internTechnology === "Digital Marketing" ||
              //     internTechnology === "Search Engine Optimization (SEO)" ||
              //     internTechnology === "WordPress Development"
              //   ) {
              //     createOtherQueue(internPhone);
              //     setInterval(() => {
              //       if (dataOther.length > 0) {
              //         SendMessageOther(getOtherQueue().slice(1, 13));
              //       }
              //     }, 60000);
              //   } else {
              //     createQueueOnsite(internPhone);
              //     setInterval(() => {
              //       if (dataOnsite.length > 0) {
              //         SendMessageOnsite(getOnisteQueue().slice(1, 13));
              //       }
              //     }, 60000);
              //   }
              //   // getOnisteQueue();

              //   // SendMailOnsite(internUsername, internemail);
              // }

              return res.json(data.affectedRows);
            }
          }
        });
      }
    }
  });
};

const GetRegisterUni = (req, res) => {
  const sql = "SELECT `uni_name` FROM `universities` WHERE `uni_status` = 1";
  connection.query(sql, (err, data) => {
    if (err) throw err;
    return res.json(data);
  });
};

const GetInternImage = (req, res) => {
  const { email } = req.query; // Use req.query for GET requests

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const sql = `
    SELECT it.image 
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE it.email = ?`;

  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length > 0) {
      return res.json({ image: data[0].image }); // Return only the image
    } else {
      return res.json({ image: null }); // No image found
    }
  });
};

const GetInternPost = (req, res) => {
  const { email } = req.query; // Use req.query for GET requests

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const sql = `
    SELECT it.image, it.name, it.technology, it.join_date
    FROM intern_table it 
    JOIN intern_accounts ia 
    ON it.email = ia.email 
    WHERE it.email = ?`;

  connection.query(sql, [email], (err, data) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (data.length > 0) {
      // Return the image, name, technology, and join_date
      return res.json({
        image: data[0].image,
        name: data[0].name,
        technology: data[0].technology,
        joinDate: data[0].join_date,
      });
    } else {
      return res.json({
        image: null,
        name: null,
        technology: null,
        joinDate: null,
      }); // No data found
    }
  });
};



// cron.schedule('0 * * * * *', () => {
//   console.log('Running a task every 1 minute');

//   // Example: Deleting a file
//   const filePath = './temporaryFile.txt';
//   fs.unlink(filePath, (err) => {
//     if (err) {
//       console.error("Error deleting file:", err);
//     } else {
//       console.log("File deleted successfully.");
//     }
//   });
// });

//   const sql1 =
// "INSERT INTO `intern_table`(`name`, `email`, `phone`, `cnic`, `gender`, `image`, `join_date`, `birth_date`, `university`, `degree`, `interview_type`, `technology`, `duration`, `intern_type`, `interview_date`, `interview_time`) VALUES (?)";

let dataOnsite = [];
let dataRemote = [];
let dataOther = [];

function createQueueOnsite(number) {
  dataOnsite.push(number);
}

function getOnisteQueue() {
  return dataOnsite.pop();
}

function createQueueRemote(number) {
  dataRemote.push(number);
}

function getRemoteQueue() {
  return dataRemote.pop();
}

function createOtherQueue(number) {
  dataOther.push(number);
}

function getOtherQueue() {
  return dataOther.pop();
}

module.exports = {
  RegisterInterns,
  GetRegisterUni,
  GetInternImage,
  GetInternPost,
};
