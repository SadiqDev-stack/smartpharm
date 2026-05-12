const { APP_NAME = "Smart Pharm", SENDER_MAIL = "support@smartpharm.com" } = process.env;
import { composeMail } from "../utilities/general.js";
import { FrontendURL, log, serverUrl } from "../middlewares/logger.js";

const templates = {
  confirmation: data => {
    let { title = data.subject, req, description, url, buttonText } = data;

    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      
      body {
        margin: 0;
        padding: 0;
        background-color: #f5f5f5;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      
      .container {
        max-width: 580px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }
      
      .header {
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        padding: 40px 30px;
        text-align: center;
      }
      
      .logo-text {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .brand-name {
        font-size: 24px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 1px;
      }
      
      .content {
        padding: 40px 35px;
        background: #ffffff;
      }
      
      .title {
        color: #1a1a2e;
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .description {
        color: #4a5568;
        font-size: 16px;
        line-height: 1.7;
        text-align: center;
        margin-bottom: 35px;
      }
      
      .button-container {
        text-align: center;
        margin: 35px 0;
      }
      
      .button {
        display: inline-block;
        background: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
        color: #ffffff !important;
        text-decoration: none;
        padding: 14px 36px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 16px;
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        box-shadow: 0 4px 15px rgba(139, 92, 246, 0.3);
      }
      
      .divider {
        height: 1px;
        background: #e2e8f0;
        margin: 30px 0;
      }
      
      .footer {
        background: #f8fafc;
        padding: 25px 35px;
        text-align: center;
        border-top: 1px solid #e2e8f0;
      }
      
      .footer-text {
        color: #64748b;
        font-size: 13px;
        line-height: 1.5;
        margin: 0;
      }
      
      .footer-links {
        margin-top: 12px;
      }
      
      .footer-links a {
        color: #8b5cf6;
        text-decoration: none;
        font-size: 12px;
        margin: 0 10px;
      }
      
      @media only screen and (max-width: 600px) {
        .container {
          margin: 20px;
          border-radius: 16px;
        }
        
        .header {
          padding: 30px 20px;
        }
        
        .content {
          padding: 30px 25px;
        }
        
        .title {
          font-size: 22px;
        }
        
        .button {
          padding: 12px 28px;
          font-size: 15px;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Header -->
      <div class="header">
        <div class="logo-text">🧢</div>
        <div class="brand-name">smart pharm</div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <h1 class="title">${title}</h1>
        
        <p class="description">
          ${description}
        </p>
        
        <!-- Action Button -->
        <div class="button-container">
          <a href="${url}" class="button">
            ${buttonText || 'Confirm Account'}
          </a>
        </div>
        
        <div class="divider"></div>
        
        <p style="color: #718096; font-size: 13px; text-align: center; margin-top: 20px;">
          If you didn't request this, please ignore this email.
        </p>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p class="footer-text">
          &copy; ${new Date().getFullYear()} smart pharm. All rights reserved.
        </p>
        <p class="footer-text" style="margin-top: 8px; font-size: 12px;">
          Your Trusted Online Pharmacy
        </p>
        <div class="footer-links">
          <a href="${FrontendURL}">Home</a>
          <a href="${FrontendURL}/contact">Contact</a>
          <a href="${FrontendURL}/privacy">Privacy</a>
        </div>
      </div>
    </div>
  </body>
</html>
    `;
  },
  
  message: data => {
    const { 
      title = "smart pharm", 
      spinner = false, 
      req, 
      description = "Please wait while we redirect you...", 
      redirectTime = 3000, 
      redirect = "/" 
    } = data;
    
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="${redirectTime}; url=${redirect}">
  <title>${title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    
    .card {
      background: white;
      border-radius: 24px;
      padding: 50px 40px;
      max-width: 500px;
      width: 100%;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
      animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .logo {
      font-size: 64px;
      margin-bottom: 20px;
    }
    
    .title {
      font-size: 28px;
      font-weight: 700;
      color: #1a1a2e;
      margin-bottom: 16px;
    }
    
    .description {
      font-size: 16px;
      color: #4a5568;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    
    .spinner {
      width: 48px;
      height: 48px;
      border: 3px solid #e2e8f0;
      border-top: 3px solid #8b5cf6;
      border-radius: 50%;
      margin: 30px auto;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    .redirect-text {
      font-size: 13px;
      color: #94a3b8;
      margin-top: 20px;
    }
    
    .redirect-link {
      color: #8b5cf6;
      text-decoration: none;
      font-weight: 500;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #94a3b8;
    }
    
    @media (max-width: 480px) {
      .card {
        padding: 35px 25px;
      }
      
      .title {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">🧢</div>
    
    <h1 class="title">${title}</h1>
    
    <div class="description">
      ${description}
    </div>
    
    ${spinner ? '<div class="spinner"></div>' : ''}
    
    <div class="redirect-text">
      Redirecting you in ${redirectTime / 1000} seconds...
      <br>
      <a href="${redirect}" class="redirect-link">Click here if not redirected</a>
    </div>
    
    <div class="footer">
      smart pharm - Premium Quality Headwear
    </div>
  </div>
  
  <script>
    const redirectUrl = '${redirect}';
    const delay = ${redirectTime};
    
    if (redirectUrl && redirectUrl !== 'false') {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, delay);
    }
  </script>
</body>
</html>
    `;
  }
};

const sendMail = async (data = {}, req, cb = () => null) => {
  try {
    data = {
      subject: `Confirm your smart pharm account`,
      template: "confirmation",
      buttonText: "Verify Account",
      description: "Thank you for choosing smart pharm! Please click the button below to verify your email address and complete your registration.",
      req,
      email: SENDER_MAIL,
      mail: data.email || SENDER_MAIL,
      url: `${serverUrl}/api/user/verify?token=${req.token}&type=email`,
      ...data
    };

    console.log(data)
    
    if (typeof data.email !== "string") {
      data = { ...data, bcc: data.email };
    }
    
    const template = templates[data.template](data);
    const sent = await composeMail(req, data.mail, data.subject, template, data);
    cb(sent);
    console.log(sent);
    
  } catch (er) {
    log(er, "bad");
    cb(false);
  }
};

export {
  sendMail,
  templates
};