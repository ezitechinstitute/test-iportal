const nodeMailer = require("nodemailer");
const dotenv = require("dotenv").config();

// Send Mail for Registration
function SendMailRegister(
  name,
  email,
  technology,
  intern_type,
  interview_type
) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  let mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email, // List of recipients
    subject: "Ezitech Internship Registration", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Successful</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #e9f0f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #3275db;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .footer {
      background-color: #f6f6f6;
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #3275db;
      text-decoration: none;
    }
    .bold-text {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Welcome to Ezitech Community!
    </div>
    <div class="body">
      <p>Dear ${name},</p>
      <p>We are delighted to inform you that your registration is successful. Welcome to Ezitech's Community!</p>
      <p><span class="bold-text">Your Details:</span></p>
      <p><strong>Internship Type:</strong> ${intern_type}</p>
      <p><strong>Interview Type:</strong> ${interview_type}</p>
      <p><strong>Technology:</strong> ${technology}</p>
      <p>Our Manager will contact you within 48 hours. If you do not receive a response within this time, please send a reminder email to <a href="mailto:help@ezitech.org">help@ezitech.org</a>.</p>
      <p>If you encounter any issues during registration, please send your query along with your WhatsApp number to <a href="mailto:help@ezitech.org">help@ezitech.org</a>. Your issue will be resolved within a few hours.</p>
    </div>
    <div class="footer">
      <p>Best Regards,<br>Ezitech Institute - Internship Management Team</p>
    </div>
  </div>
</body>
</html>`, // Email Template
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}

//Internship Certificate Mail
function SendMailCertificate(name, email, tech, duration, projectCount, issued_by) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST,
    port: process.env.MAILPORT,
    secure: true,
    auth: {
      user: process.env.REGMAIL,
      pass: process.env.MAILPASS,
    },
  });

  let mailOptions = {
    from: process.env.REGMAIL,
    to: email,
    subject: "Your Internship Certificate has been Issued!",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Certificate Issued</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f3f6f9;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #28a745;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .footer {
      background-color: #f6f6f6;
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #28a745;
      text-decoration: none;
    }
    .bold-text {
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Certificate Issued Successfully!
    </div>
    <div class="body">
      <p>Dear ${name},</p>
      <p>We are pleased to inform you that your <strong>Internship Completion Certificate</strong> for the <strong>${tech}</strong> program has been successfully issued.</p>

      <p><strong>Certificate Details:</strong></p>
      <p><strong>Technology:</strong> ${tech}</p>
      <p><strong>Duration:</strong> ${duration}</p>
      <p><strong>Completed Projects:</strong> ${projectCount}</p>
      <p><strong>Issued By:</strong> ${issued_by}</p>

      <p>Your certificate will also appear on your public Ezitech profile shortly. Please keep an eye on your dashboard for updates.</p>

      <p>If you have any questions or concerns, feel free to contact our support team at <a href="mailto:help@ezitech.org">help@ezitech.org</a>.</p>
    </div>
    <div class="footer">
      <p>Best Regards,<br>Ezitech Institute - Internship Management Team</p>
    </div>
  </div>
</body>
</html>`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Certificate Email Error:", err);
    } else {
      console.log("Certificate Email Sent");
    }
  });
}


// University Account Create Email
function SendMailUniAccount(name, email, password) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  let mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email, // List of recipients
    subject: "Welcome to Ezitech Internship Portal!", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ezitech University Account Creation</title>
  <style>
/*    #3275db*/
    body {
      font-family: 'Arial', sans-serif;
      background-color: #e9f0f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #3275db;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background-color: #3275db;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
   /* .cta-button:hover {
      background-color: #009c8c;
    }*/
    .footer {
      background-color: #f6f6f6;
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #3275db;
      text-decoration: none;
    }
    .bold-text {
      font-weight: bold;
    }
    .instructions {
      background-color: #f0f8ff;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      border-left: 5px solid #3275db;
    }
    .instructions ol {
      padding-left: 20px;
      color: #555;
    }
    .instructions li {
      margin-bottom: 10px;
    }
    .footer-logo {
      width: 150px;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Welcome to Ezitech Internship Portal!
    </div>
    <div class="body">
      <p>Dear <span class="bold-text">${name} Team,</span></p>
      <p>We are excited to have you onboard! Your university account has been successfully created on the <span class="bold-text">Ezitech Internship Portal</span>. You can now access information related to the students who are currently interning with Ezitech Institute.</p>
      
      <p><span class="bold-text">Here are your login details:</span></p>
      <p><span class="bold-text">Login URL:</span> <a href="https://admin.ezitech.org/university-login" class="cta-button" style="color: white" target="_blank">Login to Your Account</a></p>
      <p><span class="bold-text">Username:</span> ${email}</p>
      <p><span class="bold-text">Temporary Password:</span> ${password}</p>
      
      <div class="instructions">
        <p><span class="bold-text">How to Log In:</span></p>
        <ol>
          <li>Click the login URL above.</li>
          <li>Enter your username and temporary password.</li>
          <li>Once logged in, we recommend changing your password for security.</li>
        </ol>
      </div>
    </div>
    <div class="footer">
      <p>If you need any assistance, feel free to contact us at <a href="mailto:help@ezitech.org">help@ezitech.org</a>.</p>
      <p>Best Regards,<br>Ezitech Institute - Internship Management Team</p>
    </div>
  </div>
</body>
</html>
`, // Email Template
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}

// Send Mail for Assign Test & Portal
function SendMailAssignPortal(name, email, password) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  let mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email, // List of recipients
    subject: "Welcome to Ezitech Institute IPortal - Your Login Details", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
    * {
      -webkit-font-smoothing: antialiased;
    }
    body {
      Margin: 0;
      padding: 0;
      min-width: 100%;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      mso-line-height-rule: exactly;
    }
    table {
      border-spacing: 0;
      color: #333333;
      font-family: Arial, sans-serif;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .webkit {
      max-width: 600px;
    }
    .outer {
      Margin: 0 auto;
      width: 100%;
      max-width: 600px;
    }
    .full-width-image img {
      width: 100%;
      max-width: 600px;
      height: auto;
    }
    .inner {
      padding: 10px;
    }
    p {
      Margin: 0;
      padding-bottom: 10px;
    }
    .h1 {
      font-size: 21px;
      font-weight: bold;
      Margin-top: 15px;
      Margin-bottom: 5px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .h2 {
      font-size: 18px;
      font-weight: bold;
      Margin-top: 10px;
      Margin-bottom: 5px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .one-column .contents {
      text-align: left;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .one-column p {
      font-size: 14px;
      Margin-bottom: 10px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .two-column {
      text-align: center;
      font-size: 0;
    }
    .two-column .column {
      width: 100%;
      max-width: 300px;
      display: inline-block;
      vertical-align: top;
    }
    .contents {
      width: 100%;
    }
    .two-column .contents {
      font-size: 14px;
      text-align: left;
    }
    .two-column img {
      width: 100%;
      max-width: 280px;
      height: auto;
    }
    .two-column .text {
      padding-top: 10px;
    }
    .three-column {
      text-align: center;
      font-size: 0;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .three-column .column {
      width: 100%;
      max-width: 200px;
      display: inline-block;
      vertical-align: top;
    }
    .three-column .contents {
      font-size: 14px;
      text-align: center;
    }
    .three-column img {
      width: 100%;
      max-width: 180px;
      height: auto;
    }
    .three-column .text {
      padding-top: 10px;
    }
    .img-align-vertical img {
      display: inline-block;
      vertical-align: middle;
    }
    @media only screen and (max-device-width: 480px) {
    table[class=hide], img[class=hide], td[class=hide] {
      display: none !important;
    }
    .contents1 {
      width: 100%;
    }
    .contents1 {
      width: 100%;
    }
    </style>
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        table {border-collapse: collapse !important;}
      </style>
      <![endif]-->
    </head>
    
    <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
        <tr>
          <td width="100%"><div class="webkit" style="max-width:600px;Margin:0 auto;"> 
              
              <!--[if (gte mso 9)|(IE)]>
    
                <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                  <tr>
                    <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                    <![endif]--> 
              
              <!-- ======= start main body ======= -->
              <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:600px;">
                <tr>
                  <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><!-- ======= start header ======= -->
                    
                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                      <tr>
                        <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                              <tr>
                                <td align="center"><center>
                                    <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                      <tbody>
                                        <tr>
                                          <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                            
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f3f2f0">
                                              <tr>
                                                <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                              <table width="100%" style="border-spacing:0" >
                              <tr>
                              <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                              <![endif]-->
                                                  
                                                  <div class="column" style="width:100%;max-width:80px;display:inline-block;vertical-align:top;">
                                                    <table class="contents" style="border-spacing:0; width:100%"  >
                                                     <!--  <tr>
                                                        <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:5px;" align="left"><a href="#" target="_blank"><img src="https://register.ezitech.org/MailLogo/mail.jpg" alt="" width="60" height="60" style="border-width:0; max-width:60px;height:auto; display:block" align="left"/></a></td>
                                                      </tr> -->
                                                    </table>
                                                  </div>
                                                  
                                                  <!--[if (gte mso 9)|(IE)]>
                              </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                              <![endif]-->
                                                  
                                                  <div class="column" style="width:100%;max-width:518px;display:inline-block;vertical-align:top;">
                                                    <table width="100%" style="border-spacing:0" cellpadding="0" cellspacing="0" border="0" >
                                                      <tr>
                                                        <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                              <td align="left" valign="top">&nbsp;</td>
                                                            </tr>
                                                           <!--  <tr>
                                                              <td  align="right" valign="top"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/c01afe22-e370-4df3-b96e-927714713f51.jpg" width="20" height="16" style="border-width:0; max-width:20px;height:auto; max-height:16px; padding-top:0px; padding-left:10px" alt=""/><font style="font-size:11px; text-decoration:none; color:#474b53; font-family: Verdana, Geneva, sans-serif; text-align:left; line-height:16px; padding-bottom:30px"><a href="#" target="_blank" style="color:#474b53; text-decoration:none">View as a web page</a></font></td>
                                                            </tr> -->
                                                          </table></td>
                                                      </tr>
                                                    </table>
                                                  </div>
                                                  
                                                  <!--[if (gte mso 9)|(IE)]>
                              </td>
                              </tr>
                              </table>
                              <![endif]--></td>
                                              </tr>
                                              <tr>
                                                <td>&nbsp;</td>
                                              </tr>
                                            </table></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </center></td>
                              </tr>
                            </tbody>
                          </table></td>
                      </tr>
                    </table>
                    
                    <!-- ======= end header ======= --> 
                    
                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= --> 
                    
                    <!-- ======= start hero article ======= -->
                    
                    <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; border-top:1px solid #e8e7e5" bgcolor="#FFFFFF">
                      <tr>
                        <td align="left" style="padding:50px 50px 50px 50px"><p style="color:#262626; font-size:24px; text-align:left; font-family: sans-serif"><strong>Dear ${name}</strong>,</p>
                          <p style="font-size:16px; text-align:left; font-family: sans-serif; line-height:20px "> 
                          Welcome to the Ezitech Institute IPortal! Your Portal Login Details<br/> <br/>

                          To help you get started, we have created an account for you on our company portal. Below are your login details:
                            <br />
                            <br />
                            <strong> Login Details </strong>
                            <br/>
                            <br/>
                            <strong>Portal URL: </strong> https://interns.ezitech.org
                            <br/>
                            <strong>Email: </strong> ${email}
                            <br/>
                             <strong>Password: </strong> ${password}
                            <br/>
                            <br/>
                            <br/>
                             <strong>Internship Status: </strong> Test
                            <br/>
                            <br/>
                            <br/>
                              <p>Please follow these steps to log in:</p>
                            <br/>
                            <br/>
                            <ol> 
                            <li>Click on the portal url above or copy and paste it into your browser</li>
                            <li>Enter your email address and temporary password</li>
                            </ol>
                            <p>If you encounter any issues while logging in or have any questions, feel free to reach out at help@ezitech.org</p>
                            <br/>
                          </p>
                          <p style="font-size:16px; text-align:left; font-family: sans-serif; line-height:20px ">
                            Best Regards, <br />
                            EZITECH</p></td>
                      </tr>
                    </table>
                    
                    <!-- ======= end hero article ======= --> 
                    
                    <!-- ======= start footer ======= -->
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td height="30">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;"><!--[if (gte mso 9)|(IE)]>
                              <table width="100%" style="border-spacing:0" >
                              <tr>
                              <td width="60%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                              <![endif]-->
                          
                          <div class="column" style="width:100%;max-width:350px;display:inline-block;vertical-align:top;">
                            <table class="contents" style="border-spacing:0; width:100%">
                              <tr>
                                
                                <td width="100%" align="center" valign="middle" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><p style="color:#787777; font-size:13px; text-align:center; font-family: sans-serif"> ezitech.org &copy; ${year}<br />
                              </tr>
                            </table>
                          </div>
                          </td>
                      <tr>
                        <td height="30">&nbsp;</td>
                      </tr>
                    </table>
                    
                    <!-- ======= end footer ======= --></td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
            </tr>
          </table>
          <![endif]--> 
            </div></td>
        </tr>
      </table>
    </center>
    </body>
    </html>`, // Email Template
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}

// Send Mail for Initial Invoice
function SendMailInitialInvoice(
  email,
  i_name,
  i_id,
  i_date,
  t_amount,
  rec_amount,
  rem_amount,
  d_date,
  m_name
) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  /*let mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email, // List of recipients
    subject: "💵 Payment Invoice 💵", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
    * {
      -webkit-font-smoothing: antialiased;
    }
    body {
      Margin: 0;
      padding: 0;
      min-width: 100%;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      mso-line-height-rule: exactly;
    }
    table {
      border-spacing: 0;
      color: #333333;
      font-family: Arial, sans-serif;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .webkit {
      max-width: 600px;
    }
    .outer {
      Margin: 0 auto;
      width: 100%;
      max-width: 600px;
    }
    .full-width-image img {
      width: 100%;
      max-width: 600px;
      height: auto;
    }
    .inner {
      padding: 10px;
    }
    p {
      Margin: 0;
      padding-bottom: 10px;
    }
    .h1 {
      font-size: 21px;
      font-weight: bold;
      Margin-top: 15px;
      Margin-bottom: 5px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .h2 {
      font-size: 18px;
      font-weight: bold;
      Margin-top: 10px;
      Margin-bottom: 5px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .one-column .contents {
      text-align: left;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .one-column p {
      font-size: 14px;
      Margin-bottom: 10px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .two-column {
      text-align: center;
      font-size: 0;
    }
    .two-column .column {
      width: 100%;
      max-width: 300px;
      display: inline-block;
      vertical-align: top;
    }
    .contents {
      width: 100%;
    }
    .two-column .contents {
      font-size: 14px;
      text-align: left;
    }
    .two-column img {
      width: 100%;
      max-width: 280px;
      height: auto;
    }
    .two-column .text {
      padding-top: 10px;
    }
    .three-column {
      text-align: center;
      font-size: 0;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .three-column .column {
      width: 100%;
      max-width: 200px;
      display: inline-block;
      vertical-align: top;
    }
    .three-column .contents {
      font-size: 14px;
      text-align: center;
    }
    .three-column img {
      width: 100%;
      max-width: 180px;
      height: auto;
    }
    .three-column .text {
      padding-top: 10px;
    }
    .img-align-vertical img {
      display: inline-block;
      vertical-align: middle;
    }
    @media only screen and (max-device-width: 480px) {
    table[class=hide], img[class=hide], td[class=hide] {
      display: none !important;
    }
    .contents1 {
      width: 100%;
    }
    .contents1 {
      width: 100%;
    }
    </style>
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        table {border-collapse: collapse !important;}
      </style>
      <![endif]-->
    </head>
    
    <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
        <tr>
          <td width="100%"><div class="webkit" style="max-width:600px;Margin:0 auto;"> 
              
              <!--[if (gte mso 9)|(IE)]>
    
                <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                  <tr>
                    <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                    <![endif]--> 
              
              <!-- ======= start main body ======= -->
              <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:600px;">
                <tr>
                  <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><!-- ======= start header ======= -->
                    
                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                      <tr>
                        <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                              <tr>
                                <td align="center"><center>
                                    <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                      <tbody>
                                        <tr>
                                          <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                            
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f3f2f0">
                                              <tr>
                                                <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                              <table width="100%" style="border-spacing:0" >
                              <tr>
                              <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                              <![endif]-->
                                                  
                                                  <div class="column" style="width:100%;max-width:80px;display:inline-block;vertical-align:top;">
                                                    <table class="contents" style="border-spacing:0; width:100%"  >
                                                     <!--  <tr>
                                                        <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:5px;" align="left"><a href="#" target="_blank"><img src="https://register.ezitech.org/MailLogo/mail.jpg" alt="" width="60" height="60" style="border-width:0; max-width:60px;height:auto; display:block" align="left"/></a></td>
                                                      </tr> -->
                                                    </table>
                                                  </div>
                                                  
                                                  <!--[if (gte mso 9)|(IE)]>
                        !     </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                              <![endif]-->
                                                  
                                                  <div class="column" style="width:100%;max-width:518px;display:inline-block;vertical-align:top;">
                                                    <table width="100%" style="border-spacing:0" cellpadding="0" cellspacing="0" border="0" >
                                                      <tr>
                                                        <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                              <td align="left" valign="top">&nbsp;</td>
                                                            </tr>
                                                           <!--  <tr>
                                                              <td  align="right" valign="top"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/c01afe22-e370-4df3-b96e-927714713f51.jpg" width="20" height="16" style="border-width:0; max-width:20px;height:auto; max-height:16px; padding-top:0px; padding-left:10px" alt=""/><font style="font-size:11px; text-decoration:none; color:#474b53; font-family: Verdana, Geneva, sans-serif; text-align:left; line-height:16px; padding-bottom:30px"><a href="#" target="_blank" style="color:#474b53; text-decoration:none">View as a web page</a></font></td>
                                                            </tr> -->
                                                          </table></td>
                                                      </tr>
                                                    </table>
                        `                         </div>
                                                  
                                                  <!--[if (gte mso 9)|(IE)]>
                              </td>
                              </tr>
                              </table>
                              <![endif]--></td>
                                              </tr>
                                              <tr>
                                                <td>&nbsp;</td>
                                              </tr>
                                            </table></td>
                                        </tr>
                                      </tbody>
                                    </table>
                  `               </center></td>
                              </tr>
                            </tbody>
                          </table></td>
                      </tr>
                    </table>
                    
                    <!-- ======= end header ======= --> 
                    
                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= --> 
                    
                    <!-- ======= start hero article ======= -->
                    
                    <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; border-top:1px solid #e8e7e5" bgcolor="#FFFFFF">
                      <tr>
                        <td align="left" style="padding:50px 50px 50px 50px"><p style="color:#262626; font-size:24px; text-align:left; font-family: sans-serif"><strong>Dear ${i_name}</strong>,</p>
                          <p style="font-size:16px; text-align:left; font-family: sans-serif; line-height:20px "> 
                          You have successfully completed your payment.<br/> <br/>

                          Invoice ID: ${i_id}
                          Created Date: ${i_date}
                            <br />
                            <br />
                            <strong> Payment Details </strong>
                            <br/>
                            <br/>
                            <strong>Total Amount Rs: </strong> ${t_amount}
                            <br/>
                            <strong>Paid Amount Rs: </strong> ${rec_amount}
                            <br/>
                             <strong>Remaining Amount Rs: </strong> ${rem_amount}
                            <br/>
                             <strong>Due Date: </strong> ${d_date}
                            <br/>
                            <br/>
                            <br/>
                             <strong style="color: red">IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.</strong>
                            <br/>
                            <br/>
                            <br/>
                              <p>NOTE: We kindly request you to clear the remaining amount of Rs: ${rem_amount} before the due date of ${d_date}. Otherwise, your iportal deactivate.</p>
                            <br/>
                            <br/>
                            <strong>Received By: </strong> ${m_name}
                            <br/>
                          </p>
                          <p style="font-size:16px; text-align:left; font-family: sans-serif; line-height:20px ">
                            Regards, <br />
                            EZITECH</p></td>
                      </tr>
                    </table>
                    
                    <!-- ======= end hero article ======= --> 
                    
                    <!-- ======= start footer ======= -->
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td height="30">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;"><!--[if (gte mso 9)|(IE)]>
                              <table width="100%" style="border-spacing:0" >
                              <tr>
                              <td width="60%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                              <![endif]-->
                          
                          <div class="column" style="width:100%;max-width:350px;display:inline-block;vertical-align:top;">
                            <table class="contents" style="border-spacing:0; width:100%">
                              <tr>
                                
                                <td width="100%" align="center" valign="middle" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><p style="color:#787777; font-size:13px; text-align:center; font-family: sans-serif"> ezitech.org &copy; ${year}<br />
                              </tr>
                            </table>
                          </div>
                          </td>
                      <tr>
                        <td height="30">&nbsp;</td>
                      </tr>
                    </table>
                    
                    <!-- ======= end footer ======= --></td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
            </tr>
          </table>
          <![endif]--> 
            </div></td>
        </tr>
      </table>
    </center>
    </body>
    </html>`, // Email Template
  };*/

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}

// Send Mail for Partial Invoice
function SendMailPartialInvoice(
  email,
  i_name,
  i_id,
  i_date,
  t_amount,
  rec_amount,
  rem_amount,
  d_date,
  m_name
) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  let mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email, // List of recipients
    subject: "💵 Payment Invoice 💵", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style type="text/css">
    * {
      -webkit-font-smoothing: antialiased;
    }
    body {
      Margin: 0;
      padding: 0;
      min-width: 100%;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      mso-line-height-rule: exactly;
    }
    table {
      border-spacing: 0;
      color: #333333;
      font-family: Arial, sans-serif;
    }
    img {
      border: 0;
    }
    .wrapper {
      width: 100%;
      table-layout: fixed;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
    .webkit {
      max-width: 600px;
    }
    .outer {
      Margin: 0 auto;
      width: 100%;
      max-width: 600px;
    }
    .full-width-image img {
      width: 100%;
      max-width: 600px;
      height: auto;
    }
    .inner {
      padding: 10px;
    }
    p {
      Margin: 0;
      padding-bottom: 10px;
    }
    .h1 {
      font-size: 21px;
      font-weight: bold;
      Margin-top: 15px;
      Margin-bottom: 5px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .h2 {
      font-size: 18px;
      font-weight: bold;
      Margin-top: 10px;
      Margin-bottom: 5px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .one-column .contents {
      text-align: left;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .one-column p {
      font-size: 14px;
      Margin-bottom: 10px;
      font-family: Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    .two-column {
      text-align: center;
      font-size: 0;
    }
    .two-column .column {
      width: 100%;
      max-width: 300px;
      display: inline-block;
      vertical-align: top;
    }
    .contents {
      width: 100%;
    }
    .two-column .contents {
      font-size: 14px;
      text-align: left;
    }
    .two-column img {
      width: 100%;
      max-width: 280px;
      height: auto;
    }
    .two-column .text {
      padding-top: 10px;
    }
    .three-column {
      text-align: center;
      font-size: 0;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .three-column .column {
      width: 100%;
      max-width: 200px;
      display: inline-block;
      vertical-align: top;
    }
    .three-column .contents {
      font-size: 14px;
      text-align: center;
    }
    .three-column img {
      width: 100%;
      max-width: 180px;
      height: auto;
    }
    .three-column .text {
      padding-top: 10px;
    }
    .img-align-vertical img {
      display: inline-block;
      vertical-align: middle;
    }
    @media only screen and (max-device-width: 480px) {
    table[class=hide], img[class=hide], td[class=hide] {
      display: none !important;
    }
    .contents1 {
      width: 100%;
    }
    .contents1 {
      width: 100%;
    }
    </style>
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        table {border-collapse: collapse !important;}
      </style>
      <![endif]-->
    </head>
    
    <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
    <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
        <tr>
          <td width="100%"><div class="webkit" style="max-width:600px;Margin:0 auto;"> 
              
              <!--[if (gte mso 9)|(IE)]>
    
                <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
                  <tr>
                    <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                    <![endif]--> 
              
              <!-- ======= start main body ======= -->
              <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:600px;">
                <tr>
                  <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><!-- ======= start header ======= -->
                    
                    <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
                      <tr>
                        <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
                            <tbody>
                              <tr>
                                <td align="center"><center>
                                    <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
                                      <tbody>
                                        <tr>
                                          <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->
                                            
                                            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f3f2f0">
                                              <tr>
                                                <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
                              <table width="100%" style="border-spacing:0" >
                              <tr>
                              <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
                              <![endif]-->
                                                  
                                                  <div class="column" style="width:100%;max-width:80px;display:inline-block;vertical-align:top;">
                                                    <table class="contents" style="border-spacing:0; width:100%"  >
                                                     <!--  <tr>
                                                        <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:5px;" align="left"><a href="#" target="_blank"><img src="https://register.ezitech.org/MailLogo/mail.jpg" alt="" width="60" height="60" style="border-width:0; max-width:60px;height:auto; display:block" align="left"/></a></td>
                                                      </tr> -->
                                                    </table>
                                                  </div>
                                                  
                                                  <!--[if (gte mso 9)|(IE)]>
                              </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                              <![endif]-->
                                                  
                                                  <div class="column" style="width:100%;max-width:518px;display:inline-block;vertical-align:top;">
                                                    <table width="100%" style="border-spacing:0" cellpadding="0" cellspacing="0" border="0" >
                                                      <tr>
                                                        <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" cellpadding="0" cellspacing="0" border="0">
                                                            <tr>
                                                              <td align="left" valign="top">&nbsp;</td>
                                                            </tr>
                                                           <!--  <tr>
                                                              <td  align="right" valign="top"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/c01afe22-e370-4df3-b96e-927714713f51.jpg" width="20" height="16" style="border-width:0; max-width:20px;height:auto; max-height:16px; padding-top:0px; padding-left:10px" alt=""/><font style="font-size:11px; text-decoration:none; color:#474b53; font-family: Verdana, Geneva, sans-serif; text-align:left; line-height:16px; padding-bottom:30px"><a href="#" target="_blank" style="color:#474b53; text-decoration:none">View as a web page</a></font></td>
                                                            </tr> -->
                                                          </table></td>
                                                      </tr>
                                                    </table>
                                                  </div>
                                                  
                                                  <!--[if (gte mso 9)|(IE)]>
                              </td>
                              </tr>
                              </table>
                              <![endif]--></td>
                                              </tr>
                                              <tr>
                                                <td>&nbsp;</td>
                                              </tr>
                                            </table></td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </center></td>
                              </tr>
                            </tbody>
                          </table></td>
                      </tr>
                    </table>
                    
                    <!-- ======= end header ======= --> 
                    
                    <!-- ======= start hero image ======= --><!-- ======= end hero image ======= --> 
                    
                    <!-- ======= start hero article ======= -->
                    
                    <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; border-top:1px solid #e8e7e5" bgcolor="#FFFFFF">
                      <tr>
                        <td align="left" style="padding:50px 50px 50px 50px"><p style="color:#262626; font-size:24px; text-align:left; font-family: sans-serif"><strong>Dear ${i_name}</strong>,</p>
                          <p style="font-size:16px; text-align:left; font-family: sans-serif; line-height:20px "> 
                          You have successfully completed your payment.<br/> <br/>

                          Invoice ID: ${i_id}
                          Created Date: ${i_date}
                            <br />
                            <br />
                            <strong> Payment Details </strong>
                            <br/>
                            <br/>
                            <strong>Total Amount Rs: </strong> ${t_amount}
                            <br/>
                            <strong>Paid Amount Rs: </strong> ${rec_amount}
                            <br/>
                             <strong>Remaining Amount Rs: </strong> ${rem_amount}
                            <br/>
                            <br/>
                             <strong style="color: red">IMPORTANT: THIS FEE WILL NOT BE REFUNDABLE AFTER 24 HOURS.</strong>
                            <br/>
                            <br/>
                            <strong>Received By: </strong> ${m_name}
                            <br/>
                          </p>
                          <p style="font-size:16px; text-align:left; font-family: sans-serif; line-height:20px ">
                            Regards, <br />
                            EZITECH</p></td>
                      </tr>
                    </table>
                    
                    <!-- ======= end hero article ======= --> 
                    
                    <!-- ======= start footer ======= -->
                    
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td height="30">&nbsp;</td>
                      </tr>
                      <tr>
                        <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;"><!--[if (gte mso 9)|(IE)]>
                              <table width="100%" style="border-spacing:0" >
                              <tr>
                              <td width="60%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
                              <![endif]-->
                          
                          <div class="column" style="width:100%;max-width:350px;display:inline-block;vertical-align:top;">
                            <table class="contents" style="border-spacing:0; width:100%">
                              <tr>
                                
                                <td width="100%" align="center" valign="middle" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><p style="color:#787777; font-size:13px; text-align:center; font-family: sans-serif"> ezitech.org &copy; ${year}<br />
                              </tr>
                            </table>
                          </div>
                          </td>
                      <tr>
                        <td height="30">&nbsp;</td>
                      </tr>
                    </table>
                    
                    <!-- ======= end footer ======= --></td>
                </tr>
              </table>
              <!--[if (gte mso 9)|(IE)]>
              </td>
            </tr>
          </table>
          <![endif]--> 
            </div></td>
        </tr>
      </table>
    </center>
    </body>
    </html>`, // Email Template
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}

function SendMailVerifyCode(email, link) {
  let year = new Date().getFullYear();
  let transporter = nodeMailer.createTransport({
    host: process.env.MAILHOST, // Your SMTP server host
    port: process.env.MAILPORT, // Your SMTP server port (default is usually 587)
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.REGMAIL, // Your email address
      pass: process.env.MAILPASS, // Your email password or application-specific password
    },
  });

  let mailOptions = {
    from: process.env.REGMAIL, // Sender email address
    to: email, // List of recipients
    subject: "Email Verification - Ezitech Internship Portal", // Subject line
    // Plain text body
    // You can also use `html` property to send HTML formatted email
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verification</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #e9f0f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #3275db;
      color: white;
      padding: 20px;
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .body {
      padding: 20px;
      color: #333;
      line-height: 1.6;
    }
    .cta-button {
      display: inline-block;
      background-color: #3275db;
      color: white;
      text-decoration: none;
      padding: 12px 25px;
      border-radius: 5px;
      font-size: 16px;
      margin-top: 20px;
      transition: background-color 0.3s ease;
    }
    .footer {
      background-color: #f6f6f6;
      text-align: center;
      padding: 15px;
      color: #777;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    .footer a {
      color: #3275db;
      text-decoration: none;
    }
    .bold-text {
      font-weight: bold;
    }
    .verification-code {
      font-size: 18px;
      font-weight: bold;
      color: #3275db;
      text-align: center;
      padding: 15px;
      margin: 20px 0;
      border: 2px dashed #3275db;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Email Verification - Ezitech Internship Portal
    </div>
    <div class="body">
      <p>We need to verify that you are a valid user. Please use the click link below to confirm your identity and continue with the process.</p>
      
      <p><span class="bold-text">Your Verification Link:</span></p>
      <div class="verification-code">
        <a href="${link}" type="button" target="_blank"> Click to Verify </a>
      </div>

      <p>If you didn’t request this change or suspect any unauthorized activity, please contact us immediately.</p>
    </div>
    <div class="footer">
      <p>If you need assistance, reach out to us at <a href="mailto:help@ezitech.org">help@ezitech.org</a>.</p>
      <p>Best Regards,<br>Ezitech Institute - Internship Management Team</p>
    </div>
  </div>
</body>
</html>`, // Email Template
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Email Sent");
    }
  });
}


//Send Mail to Specific Students through Admin Dashboard
function SendBulkMail(req, res) {
  const { subject, message, filters } = req.body;

  let where = [];
  let params = [];

  if (filters.technology) {
    where.push("technology = ?");
    params.push(filters.technology);
  }
  if (filters.category) {
    where.push("intern_type = ?");
    params.push(filters.category);
  }
  if (filters.location === "Pakistan") {
    where.push("country = ?");
    params.push("Pakistan");
  }
  if (filters.location === "International") {
    where.push("country != ?");
    params.push("Pakistan");
  }

  const whereClause = where.length ? "WHERE " + where.join(" AND ") : "";
  const sql = `SELECT name, email FROM intern_table ${whereClause}`;

  db.query(sql, params, (err, students) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!students.length) {
      return res.json({ success: true, sent: 0 });
    }

    let transporter = nodeMailer.createTransport({
      host: process.env.MAILHOST,
      port: process.env.MAILPORT,
      secure: process.env.MAILPORT,
      auth: {
        user: process.env.REGMAIL,
        pass: process.env.MAILPASS,
      },
    });

    //send mail to each student
    let sentCount = 0;
    let failedCount = 0;

    students.forEach((student) => {
      const mailOptions = {
        from: process.env.REGMAIL,
        to: student.email,
        subject,
        html: `<p>Dear ${student.name},</p><p>${message}</p>`,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error(`Failed to send to ${student.email}:`, err.message);
          failedCount++;
        } else {
          sentCount++;
        }

        if (sentCount + failedCount === students.length) {
          res.json({
            success: true,
            attempted: students.length,
            sent: sentCount,
            failed: failedCount,
          });
        }
      });
    });
  });
}


module.exports = {
  SendMailRegister,
  SendMailUniAccount,
  SendMailAssignPortal,
  SendMailInitialInvoice,
  SendMailPartialInvoice,
  SendMailVerifyCode,
  SendMailCertificate,
  SendBulkMail
};

// function SendMailRemote(name, email, date, time) {
//   let year = new Date().getFullYear();
//   let transporter = nodeMailer.createTransport({
//     host: process.env.MAILREMOTEHOST, // Your SMTP server host
//     port: process.env.MAILREMOTEPORT, // Your SMTP server port (default is usually 587)
//     secure: true, // true for 465, false for other ports
//     auth: {
//       user: process.env.REMOTEMAIL, // Your email address
//       pass: process.env.REMOTEPASS, // Your email password or application-specific password
//     },
//   });

//   let mailOptions = {
//     from: process.env.REMOTEMAIL, // Sender email address
//     to: email, // List of recipients
//     subject: "Ezitech Remote Internship", // Subject line
//     // Plain text body
//     // You can also use `html` property to send HTML formatted email
//     html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
//     <html xmlns="http://www.w3.org/1999/xhtml">
//     <head>
//     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
//     <!--[if !mso]><!-->
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <!--<![endif]-->
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title></title>
//     <style type="text/css">
//     * {
//       -webkit-font-smoothing: antialiased;
//     }
//     body {
//       Margin: 0;
//       padding: 0;
//       min-width: 100%;
//       font-family: Arial, sans-serif;
//       -webkit-font-smoothing: antialiased;
//       mso-line-height-rule: exactly;
//     }
//     table {
//       border-spacing: 0;
//       color: #333333;
//       font-family: Arial, sans-serif;
//     }
//     img {
//       border: 0;
//     }
//     .wrapper {
//       width: 100%;
//       table-layout: fixed;
//       -webkit-text-size-adjust: 100%;
//       -ms-text-size-adjust: 100%;
//     }
//     .webkit {
//       max-width: 600px;
//     }
//     .outer {
//       Margin: 0 auto;
//       width: 100%;
//       max-width: 600px;
//     }
//     .full-width-image img {
//       width: 100%;
//       max-width: 600px;
//       height: auto;
//     }
//     .inner {
//       padding: 10px;
//     }
//     p {
//       Margin: 0;
//       padding-bottom: 10px;
//     }
//     .h1 {
//       font-size: 21px;
//       font-weight: bold;
//       Margin-top: 15px;
//       Margin-bottom: 5px;
//       font-family: Arial, sans-serif;
//       -webkit-font-smoothing: antialiased;
//     }
//     .h2 {
//       font-size: 18px;
//       font-weight: bold;
//       Margin-top: 10px;
//       Margin-bottom: 5px;
//       font-family: Arial, sans-serif;
//       -webkit-font-smoothing: antialiased;
//     }
//     .one-column .contents {
//       text-align: left;
//       font-family: Arial, sans-serif;
//       -webkit-font-smoothing: antialiased;
//     }
//     .one-column p {
//       font-size: 14px;
//       Margin-bottom: 10px;
//       font-family: Arial, sans-serif;
//       -webkit-font-smoothing: antialiased;
//     }
//     .two-column {
//       text-align: center;
//       font-size: 0;
//     }
//     .two-column .column {
//       width: 100%;
//       max-width: 300px;
//       display: inline-block;
//       vertical-align: top;
//     }
//     .contents {
//       width: 100%;
//     }
//     .two-column .contents {
//       font-size: 14px;
//       text-align: left;
//     }
//     .two-column img {
//       width: 100%;
//       max-width: 280px;
//       height: auto;
//     }
//     .two-column .text {
//       padding-top: 10px;
//     }
//     .three-column {
//       text-align: center;
//       font-size: 0;
//       padding-top: 10px;
//       padding-bottom: 10px;
//     }
//     .three-column .column {
//       width: 100%;
//       max-width: 200px;
//       display: inline-block;
//       vertical-align: top;
//     }
//     .three-column .contents {
//       font-size: 14px;
//       text-align: center;
//     }
//     .three-column img {
//       width: 100%;
//       max-width: 180px;
//       height: auto;
//     }
//     .three-column .text {
//       padding-top: 10px;
//     }
//     .img-align-vertical img {
//       display: inline-block;
//       vertical-align: middle;
//     }
//     @media only screen and (max-device-width: 480px) {
//     table[class=hide], img[class=hide], td[class=hide] {
//       display: none !important;
//     }
//     .contents1 {
//       width: 100%;
//     }
//     .contents1 {
//       width: 100%;
//     }
//     </style>
//     <!--[if (gte mso 9)|(IE)]>
//       <style type="text/css">
//         table {border-collapse: collapse !important;}
//       </style>
//       <![endif]-->
//     </head>

//     <body style="Margin:0;padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;min-width:100%;background-color:#f3f2f0;">
//     <center class="wrapper" style="width:100%;table-layout:fixed;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;background-color:#f3f2f0;">
//       <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f3f2f0;" bgcolor="#f3f2f0;">
//         <tr>
//           <td width="100%"><div class="webkit" style="max-width:600px;Margin:0 auto;">

//               <!--[if (gte mso 9)|(IE)]>

//                 <table width="600" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0" >
//                   <tr>
//                     <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
//                     <![endif]-->

//               <!-- ======= start main body ======= -->
//               <table class="outer" align="center" cellpadding="0" cellspacing="0" border="0" style="border-spacing:0;Margin:0 auto;width:100%;max-width:600px;">
//                 <tr>
//                   <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><!-- ======= start header ======= -->

//                     <table border="0" width="100%" cellpadding="0" cellspacing="0"  >
//                       <tr>
//                         <td><table style="width:100%;" cellpadding="0" cellspacing="0" border="0">
//                             <tbody>
//                               <tr>
//                                 <td align="center"><center>
//                                     <table border="0" align="center" width="100%" cellpadding="0" cellspacing="0" style="Margin: 0 auto;">
//                                       <tbody>
//                                         <tr>
//                                           <td class="one-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" bgcolor="#FFFFFF"><!-- ======= start header ======= -->

//                                             <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#f3f2f0">
//                                               <tr>
//                                                 <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:left;font-size:0;" ><!--[if (gte mso 9)|(IE)]>
//                               <table width="100%" style="border-spacing:0" >
//                               <tr>
//                               <td width="20%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:30px;" >
//                               <![endif]-->

//                                                   <div class="column" style="width:100%;max-width:80px;display:inline-block;vertical-align:top;">
//                                                     <table class="contents" style="border-spacing:0; width:100%"  >
//                                                      <!--  <tr>
//                                                         <td style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:5px;" align="left"><a href="#" target="_blank"><img src="https://register.ezitech.org/MailLogo/mail.jpg" alt="" width="60" height="60" style="border-width:0; max-width:60px;height:auto; display:block" align="left"/></a></td>
//                                                       </tr> -->
//                                                     </table>
//                                                   </div>

//                                                   <!--[if (gte mso 9)|(IE)]>
//                               </td><td width="80%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
//                               <![endif]-->

//                                                   <div class="column" style="width:100%;max-width:518px;display:inline-block;vertical-align:top;">
//                                                     <table width="100%" style="border-spacing:0" cellpadding="0" cellspacing="0" border="0" >
//                                                       <tr>
//                                                         <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%" cellpadding="0" cellspacing="0" border="0">
//                                                             <tr>
//                                                               <td align="left" valign="top">&nbsp;</td>
//                                                             </tr>
//                                                            <!--  <tr>
//                                                               <td  align="right" valign="top"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/c01afe22-e370-4df3-b96e-927714713f51.jpg" width="20" height="16" style="border-width:0; max-width:20px;height:auto; max-height:16px; padding-top:0px; padding-left:10px" alt=""/><font style="font-size:11px; text-decoration:none; color:#474b53; font-family: Verdana, Geneva, sans-serif; text-align:left; line-height:16px; padding-bottom:30px"><a href="#" target="_blank" style="color:#474b53; text-decoration:none">View as a web page</a></font></td>
//                                                             </tr> -->
//                                                           </table></td>
//                                                       </tr>
//                                                     </table>
//                                                   </div>

//                                                   <!--[if (gte mso 9)|(IE)]>
//                               </td>
//                               </tr>
//                               </table>
//                               <![endif]--></td>
//                                               </tr>
//                                               <tr>
//                                                 <td>&nbsp;</td>
//                                               </tr>
//                                             </table></td>
//                                         </tr>
//                                       </tbody>
//                                     </table>
//                                   </center></td>
//                               </tr>
//                             </tbody>
//                           </table></td>
//                       </tr>
//                     </table>

//                     <!-- ======= end header ======= -->

//                     <!-- ======= start hero image ======= --><!-- ======= end hero image ======= -->

//                     <!-- ======= start hero article ======= -->

//                     <table class="one-column" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0; border-left:1px solid #e8e7e5; border-right:1px solid #e8e7e5; border-bottom:1px solid #e8e7e5; border-top:1px solid #e8e7e5" bgcolor="#FFFFFF">
//                       <tr>
//                         <td align="left" style="padding:50px 50px 50px 50px"><p style="color:#262626; font-size:24px; text-align:left; font-family: Verdana, Geneva, sans-serif"><strong>Dear ${name}</strong>,</p>
//                           <p style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px "> We are delighted to inform you that your registration was successful. Welcome to Ezitech's platform/community! 🎉 <br />
//                             <br />
//                             <br />
//                             <strong>Interview Process Details </strong>
//                             <br/>
//                             <br/>
//                             <strong> Remote Interview: </strong>
//                             <br/>
//                             <strong> Date: </strong> ${date}
//                             <br/>
//                             <strong> Time: </strong> ${time}
//                             <br/>
//                             <strong> Platform: </strong> Google Meet
//                             </br>
//                             <br/>
//                             <br/>
//                             <br/>
//                             <strong> Contact with our Remote Department to Process Your Interview </strong>
//                             <br/>
//                             <br/>
//                           </p>
//                           <table border="0" align="left" cellpadding="0" cellspacing="0" style="Margin:0 auto;">
//                             <tbody>
//                               <tr>
//                                 <td align="center"><table border="0" cellpadding="0" cellspacing="0" style="Margin:0 auto;">
//                                     <tr>
//                                       <td width="250" height="60" align="center" bgcolor="#1f3ca6" style="-moz-border-radius: 30px; -webkit-border-radius: 30px; border-radius: 30px;"><a href="https://wa.me/923377777860?text=Hello%20Interview%20Process%20Details%20to%20Process%20Interview%20%3F." style="width:250; display:block; text-decoration:none; border:0; text-align:center; font-weight:bold;font-size:18px; font-family: Arial, sans-serif; color: #ffffff" class="button_link" target="_blank">Message on WhatsApp<img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/582dc751-b0fc-4769-ad74-35932c7594dd.png" width="32" height="17" style="padding-top:5px" alt="" border="0"/></a></td>
//                                     </tr>
//                                   </table></td>
//                               </tr>
//                             </tbody>
//                           </table>
//                           <p style="color:#000000; font-size:16px; text-align:left; font-family: Verdana, Geneva, sans-serif; line-height:22px "><br />
//                             <br />
//                             <br />
//                             <br />
//                             <br />
//                             Best Regards, <br />
//                             EZITECH</p></td>
//                       </tr>
//                     </table>

//                     <!-- ======= end hero article ======= -->

//                     <!-- ======= start footer ======= -->

//                     <table cellpadding="0" cellspacing="0" border="0" width="100%">
//                       <tr>
//                         <td height="30">&nbsp;</td>
//                       </tr>
//                       <tr>
//                         <td class="two-column" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;text-align:center;font-size:0;"><!--[if (gte mso 9)|(IE)]>
//                               <table width="100%" style="border-spacing:0" >
//                               <tr>
//                               <td width="60%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" >
//                               <![endif]-->

//                           <div class="column" style="width:100%;max-width:350px;display:inline-block;vertical-align:top;">
//                             <table class="contents" style="border-spacing:0; width:100%">
//                               <tr>
//                                 <td width="39%" align="right" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><a href="#" target="_blank"><img src="https://register.ezitech.org/MailLogo/mail.jpg" alt="" width="59" height="59" style="border-width:0; max-width:59px;height:auto; display:block; padding-right:20px" /></a></td>
//                                 <td width="61%" align="left" valign="middle" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;"><p style="color:#787777; font-size:13px; text-align:left; font-family: Verdana, Geneva, sans-serif"> Ezitech.org &copy; ${year}<br />
//                               </tr>
//                             </table>
//                           </div>

//                           <!--[if (gte mso 9)|(IE)]>
//                               </td><td width="40%" valign="top" style="padding-top:0;padding-bottom:0;padding-right:0;padding-left:0;" > 								<![endif]-->

//                           <div class="column" style="width:100%;max-width:248px;display:inline-block;vertical-align:top;">
//                             <table width="100%" style="border-spacing:0">
//                               <tr>
//                                 <td class="inner" style="padding-top:0px;padding-bottom:10px; padding-right:10px;padding-left:10px;"><table class="contents" style="border-spacing:0; width:100%">
//                                     <tr>
//                                       <td width="32%" align="center" valign="top" style="padding-top:10px"><table width="150" border="0" cellspacing="0" cellpadding="0">
//                                           <tr>
//                                             <td width="33" align="center"><a href="#" target="_blank"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/1f9161ee-46b5-4bdf-86db-9e32d4b98336.jpg" alt="facebook" width="36" height="36" border="0" style="border-width:0; max-width:36px;height:auto; display:block; max-height:36px"/></a></td>
//                                             <td width="34" align="center"><a href="#" target="_blank"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/4e449140-ec71-4978-97bf-8e0f15b5ff23.jpg" alt="twitter" width="36" height="36" border="0" style="border-width:0; max-width:36px;height:auto; display:block; max-height:36px"/></a></td>
//                                             <td width="33" align="center"><a href="#" target="_blank"><img src="https://gallery.mailchimp.com/fdcaf86ecc5056741eb5cbc18/images/d21cca91-335e-4fa4-9313-b0ea37e0452b.jpg" alt="linkedin" width="36" height="36" border="0" style="border-width:0; max-width:36px;height:auto; display:block; max-height:36px"/></a></td>
//                                           </tr>
//                                         </table></td>
//                                     </tr>
//                                   </table></td>
//                               </tr>
//                             </table>
//                           </div>

//                           <!--[if (gte mso 9)|(IE)]> 	</td> 											</tr> </table> 									<![endif]--></td>
//                       </tr>
//                       <tr>
//                         <td height="30">&nbsp;</td>
//                       </tr>
//                     </table>

//                     <!-- ======= end footer ======= --></td>
//                 </tr>
//               </table>
//               <!--[if (gte mso 9)|(IE)]>
//               </td>
//             </tr>
//           </table>
//           <![endif]-->
//             </div></td>
//         </tr>
//       </table>
//     </center>
//     </body>
//     </html>`, // Email Template
//   };

//   transporter.sendMail(mailOptions, (err, info) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("Email Sent");
//     }
//   });
// }
