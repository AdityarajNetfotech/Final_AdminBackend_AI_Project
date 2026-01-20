


export function bulkJDInviteTemplate(candidateName, jdTitle, companyName, applyUrl) {
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;background:#f9f9f9;border-radius:8px;">
      <h2 style="color:#28a745;">Congratulations! 🎉</h2>
      <p>Dear <strong>${candidateName}</strong>,</p>
      <p>We are thrilled to inform you that you have been <strong>shortlisted</strong> for the position of <strong>${jdTitle}</strong> at <strong>${companyName}</strong>!</p>
      <p>Your profile impressed our recruitment team, and we believe you would be a great fit for this role.</p>
      <h3 style="color:#2b2b2b;margin-top:24px;">Next Steps:</h3>
      <p>${applyUrl || 'Our HR team will be in touch with you soon regarding the next steps of the interview process.'}</p>
      <p style="margin-top:24px;padding:16px;background:#e8f5e9;border-left:4px solid #28a745;border-radius:4px;color:#2b2b2b;">
        <strong>Important:</strong> Please ensure your contact information is up-to-date so we can reach you without any delays.
      </p>
      <p style="margin-top:24px;color:#555;">If you have any questions or concerns, feel free to reach out to us. We wish you the best of luck!</p>
      <hr style="margin:32px 0;">
      <p style="font-size:12px;color:#888;">This is an automated message from our recruitment system. Please do not reply directly.</p>
    </div>
  `;
}
