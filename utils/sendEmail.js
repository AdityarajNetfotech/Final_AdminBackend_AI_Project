// // utils/sendEmail.js
// import nodemailer from 'nodemailer';
// import { config } from '../config/index.js';

// const transporter = nodemailer.createTransport({
//   host: config.email.host,
//   port: Number(config.email.port) || 587,
//   secure: Number(process.env.EMAIL_SECURE_PORT || 0) === 465, // true for 465
//   auth: {
//     user: config.email.user,
//     pass: config.email.pass,
//   },
//   // For development, you can add `tls: { rejectUnauthorized: false }` if using self-signed
// });

// /**
//  * sendEmail({ to, subject, text, html })
//  * Returns info object or throws error.
//  */
// const sendEmail = async ({ to, subject, text, html }) => {
//   const msg = {
//     from: config.email.from,
//     to,
//     subject,
//     text,
//     html,
//   };

//   // Basic retry for transient errors
//   for (let attempt = 1; attempt <= 2; attempt++) {
//     try {
//       const info = await transporter.sendMail(msg);
//       return info;
//     } catch (err) {
//       if (attempt === 2) throw err;
//       // small delay before retry
//       await new Promise((r) => setTimeout(r, 500));
//     }
//   }
// };

// export default sendEmail;
// utils/sendEmail.js
import SibApiV3Sdk from 'sib-api-v3-sdk';

// Validate API key
if (!process.env.BREVO_API_KEY) {
  console.error('ERROR: BREVO_API_KEY is not set in environment variables');
  throw new Error('BREVO_API_KEY is required');
}

// Configure Brevo client
const client = SibApiV3Sdk.ApiClient.instance;
client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

const emailApi = new SibApiV3Sdk.TransactionalEmailsApi();

/**
 * sendEmail({ to, subject, text, html })
 * Returns info object or throws error.
 */
const sendEmail = async ({ to, subject, text, html }) => {
  try {
    const receivers = Array.isArray(to)
      ? to.map((email) => ({ email }))
      : [{ email: to }];

    // Use verified sender email from environment or default
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@example.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'Recruiter Portal';

    const emailData = {
      sender: {
        email: senderEmail,
        name: senderName,
      },
      to: receivers,
      subject,
      htmlContent: html || `<p>${text}</p>`,
    };

    console.log('[sendEmail] Email Configuration:', {
      senderEmail,
      senderName,
      recipientCount: receivers.length,
      recipients: receivers.map(r => r.email),
      subject,
    });

    // Basic retry for transient errors (same as before)
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await emailApi.sendTransacEmail(emailData);
        console.log('[sendEmail] ✅ Email sent successfully:', {
          messageId: response?.messageId,
          attempt,
          timestamp: new Date().toISOString(),
        });
        return response;
      } catch (err) {
        console.error(`[sendEmail] ❌ Attempt ${attempt} failed:`, {
          status: err.status,
          statusCode: err.statusCode,
          message: err.message,
          errorMsg: err.errorMsg,
          response: err.response?.body || err.response?.text || err.response,
          code: err.code,
        });
        
        if (attempt === 2) {
          throw err;
        }
        await new Promise((r) => setTimeout(r, 500));
      }
    }
  } catch (err) {
    console.error('[sendEmail] Fatal error:', err);
    throw err;
  }
};

export default sendEmail;
