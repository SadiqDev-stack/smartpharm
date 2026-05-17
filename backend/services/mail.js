const { APP_NAME = "Smart Pharm", SENDER_MAIL = "support@smartpharm.com" } =
  process.env;
import { composeMail } from "../utilities/general.js";
import { FrontendURL, log, serverUrl } from "../middlewares/logger.js";

const templates = {
  confirmation: (data) => {
    let { title = data.subject, req, description, url, buttonText } = data;

    return `<!DOCTYPE html>
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
        background-color: #F8FAFC;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      }
      
      .container {
        max-width: 580px;
        margin: 40px auto;
        background: #FFFFFF;
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      }
      
      .header {
        background: linear-gradient(135deg, #0F6E8A 0%, #0A4D62 100%);
        padding: 40px 30px;
        text-align: center;
      }
      
      .logo-icon {
        font-size: 48px;
        margin-bottom: 10px;
      }
      
      .brand-name {
        font-size: 28px;
        font-weight: 700;
        color: #FFFFFF;
        letter-spacing: 1px;
      }
      
      .brand-name span {
        color: #48B5C5;
      }
      
      .content {
        padding: 40px 35px;
        background: #FFFFFF;
      }
      
      .title {
        color: #1E293B;
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 20px;
        text-align: center;
      }
      
      .description {
        color: #64748B;
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
        background: #0F6E8A;
        color: #FFFFFF !important;
        text-decoration: none;
        padding: 14px 36px;
        border-radius: 50px;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.2s ease;
        box-shadow: 0 4px 15px rgba(15, 110, 138, 0.3);
      }
      
      .button:hover {
        background: #0A4D62;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(15, 110, 138, 0.4);
      }
      
      .divider {
        height: 1px;
        background: #E2E8F0;
        margin: 30px 0;
      }
      
      .feature-list {
        margin: 25px 0;
        padding: 0;
        list-style: none;
      }
      
      .feature-item {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 15px;
        color: #1E293B;
        font-size: 14px;
      }
      
      .feature-icon {
        width: 20px;
        height: 20px;
        background: #E0F2FE;
        border-radius: 50%;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        color: #0F6E8A;
        font-size: 12px;
      }
      
      .footer {
        background: #F8FAFC;
        padding: 25px 35px;
        text-align: center;
        border-top: 1px solid #E2E8F0;
      }
      
      .footer-text {
        color: #64748B;
        font-size: 13px;
        line-height: 1.5;
        margin: 0;
      }
      
      .footer-links {
        margin-top: 12px;
      }
      
      .footer-links a {
        color: #0F6E8A;
        text-decoration: none;
        font-size: 12px;
        margin: 0 10px;
        transition: color 0.2s;
      }
      
      .footer-links a:hover {
        color: #0A4D62;
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
        <div class="logo-icon">💊</div>
        <div class="brand-name">Smart<span>Pharm</span></div>
      </div>
      
      <!-- Content -->
      <div class="content">
        <h1 class="title">${title}</h1>
        
        <p class="description">
          ${description}
        </p>
        
        <!-- Features for welcome/registration emails -->
        ${
          buttonText === "Verify Email"
            ? `
        <div class="feature-list">
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>Offline-first inventory management</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>Track patients & loans</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>AI-powered medicine recommendations</span>
          </div>
          <div class="feature-item">
            <span class="feature-icon">✓</span>
            <span>Expiry alerts & smart notifications</span>
          </div>
        </div>
        `
            : ""
        }
        
        <!-- Action Button -->
        <div class="button-container">
          <a href="${url}" class="button">
            ${buttonText || "Get Started"}
          </a>
        </div>
        
        <div class="divider"></div>
        
        <p style="color: #94A3B8; font-size: 13px; text-align: center; margin-top: 20px;">
          If you didn't request this, please ignore this email.
        </p>
        
        <p style="color: #94A3B8; font-size: 12px; text-align: center; margin-top: 12px;">
          This link will expire in 24 hours for security reasons.
        </p>
      </div>
      
      <!-- Footer -->
      <div class="footer">
        <p class="footer-text">
          &copy; ${new Date().getFullYear()} SmartPharm. All rights reserved.
        </p>
        <p class="footer-text" style="margin-top: 8px; font-size: 12px;">
          Pharmacy Management System • Offline First • AI Powered
        </p>
        <div class="footer-links">
          <a href="${FrontendURL}">Home</a>
          <a href="${FrontendURL}/contact">Support</a>
          <a href="${FrontendURL}/privacy">Privacy</a>
          <a href="${FrontendURL}/terms">Terms</a>
        </div>
      </div>
    </div>
  </body>
</html>`;
  },

  message: (data) => {
    const {
      title = "smart pharm",
      spinner = false,
      req,
      description = "Please wait while we redirect you...",
      redirectTime = 3000,
      redirect = "/",
    } = data;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="refresh" content="${redirectTime / 1000}; url=${redirect}">
  <title>${title} | SmartPharm</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #0F6E8A 0%, #0A4D62 100%);
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
      color: #1E293B;
      margin-bottom: 16px;
    }
    
    .description {
      font-size: 16px;
      color: #64748B;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    
    .spinner {
      width: 48px;
      height: 48px;
      border: 3px solid #E2E8F0;
      border-top: 3px solid #0F6E8A;
      border-radius: 50%;
      margin: 30px auto;
      animation: spin 0.8s linear infinite;
    }
    
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
    
    .checkmark {
      width: 64px;
      height: 64px;
      margin: 20px auto;
      background: #D1FAE5;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      animation: scaleIn 0.3s ease-out;
    }
    
    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
    
    .checkmark svg {
      width: 32px;
      height: 32px;
      color: #10B981;
    }
    
    .error-icon {
      width: 64px;
      height: 64px;
      margin: 20px auto;
      background: #FEF2F2;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .error-icon svg {
      width: 32px;
      height: 32px;
      color: #EF4444;
    }
    
    .redirect-text {
      font-size: 13px;
      color: #94A3B8;
      margin-top: 20px;
    }
    
    .redirect-link {
      color: #0F6E8A;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.2s;
    }
    
    .redirect-link:hover {
      color: #0A4D62;
    }
    
    .footer {
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px solid #E2E8F0;
      font-size: 12px;
      color: #94A3B8;
    }
    
    .footer-brand {
      color: #0F6E8A;
      font-weight: 600;
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
    <div class="logo">💊</div>
    
    <h1 class="title">${title}</h1>
    
    <div class="description">
      ${description}
    </div>
    
    <!-- Success Icon (shown when title contains success/welcome/verified) -->
    ${
      title.toLowerCase().includes("success") ||
      title.toLowerCase().includes("welcome") ||
      title.toLowerCase().includes("verified")
        ? `
    <div class="checkmark">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    </div>
    `
        : ""
    }
    
    <!-- Error Icon (shown when title contains error/failed) -->
    ${
      title.toLowerCase().includes("error") ||
      title.toLowerCase().includes("failed") ||
      title.toLowerCase().includes("invalid")
        ? `
    <div class="error-icon">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    `
        : ""
    }
    
    ${spinner ? '<div class="spinner"></div>' : ""}
    
    ${
      redirect && redirect !== "false"
        ? `
    <div class="redirect-text">
      Redirecting you in ${redirectTime / 1000} seconds...
      <br>
      <a href="${redirect}" class="redirect-link">Click here if not redirected</a>
    </div>
    `
        : ""
    }
    
    <div class="footer">
      <span class="footer-brand">SmartPharm</span> - Pharmacy Management System
    </div>
  </div>
  
  <script>
    const redirectUrl = '${redirect}';
    const delay = ${redirectTime};
    
    if (redirectUrl && redirectUrl !== 'false' && redirectUrl !== 'null') {
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, delay);
    }
  </script>
</body>
</html> `;
  },
};

const sendMail = async (data = {}, req, cb = () => null) => {
  try {
    data = {
      subject: `Confirm your smart pharm account`,
      template: "confirmation",
      buttonText: "Verify Account",
      description:
        "Thank you for choosing smart pharm! Please click the button below to verify your email address and complete your registration.",
      req,
      email: SENDER_MAIL,
      mail: data.email || SENDER_MAIL,
      url: `${serverUrl}/api/user/verify?token=${req.token}&type=email`,
      ...data,
    };

    console.log(data);

    if (typeof data.email !== "string") {
      data = { ...data, bcc: data.email };
    }

    const template = templates[data.template](data);
    const sent = await composeMail(
      req,
      data.mail,
      data.subject,
      template,
      data,
    );
    cb(sent);
    console.log(sent);
  } catch (er) {
    log(er, "bad");
    cb(false);
  }
};

export { sendMail, templates };
