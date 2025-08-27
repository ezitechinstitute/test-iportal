// const axios = require("axios");
// const axios = require("axios/dist/node/axios.cjs");

// async function SendMessageRemote(phone) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// Registration Successful!

// We are delighted to inform you that your registration is successful. Welcome to Ezitech's Community!

// Our Manager will contact you as soon as possible.
// If the manager does not respond within 24 hours, you should send a reminder message to this number.

// Best regards
//   `,
//     //  key
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function SendMessageOnsite(phone) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// Registration Successful!

// We are delighted to inform you that your registration is successful. Welcome to Ezitech's Community!

// Our Manager will contact you as soon as possible.
// If the manager does not respond within 24 hours, you should send a reminder message to this number.

// Best regards
//   `,
//     //  key
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function SendMessageOther(phone) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// Registration Successful!

// We are delighted to inform you that your registration is successful. Welcome to Ezitech's Community!

// Our Manager will contact you as soon as possible.
// If the manager does not respond within 24 hours, you should send a reminder message to this number.

// Best regards
//   `,
//       // key
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function SendMessageAssignPortal(phone, name, email, password, contact) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// Welcome to the Ezitech Institute IPortal! Your Portal Login Details

// Dear ${name},

// To help you get started, we have created an account for you on our company portal. Below are your login details:

// Portal URL: https://interns.ezitech.org
// Email: ${email}
// Password:${password}

// Internship Status : TEST

// Please follow these steps to log in:

// 1. Click on the portal link above or copy and paste it into your browser
// 2. Enter your email address and temporary password

// If you encounter any issues while logging in or have any questions, feel free to reach out at help@ezitech.org

// Please contact your assign manager for queries & test submisson: ${contact}

// Best regards`,
//       // key
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function SendInvoicePartial(
//   phone,
//   i_name,
//   i_id,
//   i_date,
//   t_amount,
//   rec_amount,
//   rem_amount,
//   d_date,
//   m_name
// ) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// 💵 Payment Invoice 💵

// Dear ${i_name},

// You have successfully completed your payment.

// Invoice ID: ${i_id}
// Created Date: ${i_date}

// Payment Details:

// Total Amount Rs: ${t_amount}
// Paid Amount Rs: ${rec_amount}
// Remaining Amount Rs: ${rem_amount}

// IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.

// Received By: ${m_name}

// Regards :
// Ezitech Institute`,
//       // key
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// async function SendInvoiceInitial(
//   phone,
//   i_name,
//   i_id,
//   i_date,
//   t_amount,
//   rec_amount,
//   rem_amount,
//   d_date,
//   m_name
// ) {
//   try {
//     const response = await axios.post("https://mkt.eziline.com/api/send", {
//       number: phone,
//       type: "text",
//       message: `
// 💵 Payment Invoice 💵

// Dear ${i_name},

// You have successfully completed your payment.

// Invoice ID: ${i_id}
// Created Date: ${i_date}

// Payment Details:

// Total Amount Rs: ${t_amount}
// Paid Amount Rs: ${rec_amount}
// Remaining Amount Rs: ${rem_amount}
// Due Date: ${d_date}

// IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.

// NOTE: We kindly request you to clear the remaining amount of Rs: ${rem_amount} before the due date of ${d_date}. Otherwise, your iportal deactivate.

// Received By: ${m_name}

// Regards :
// Ezitech Institute`,
//       // Key
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = {
//   SendMessageRemote,
//   SendMessageOnsite,
//   SendMessageOther,
//   SendMessageAssignPortal,
//   SendInvoiceInitial,
//   SendInvoicePartial,
// };
