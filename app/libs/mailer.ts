// utils/mailer.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'eagletestingservicepvt@gmail.com',
    pass: 'ycofdrdkoebuivkx',
  },
});

export const sendVerificationEmail = async (to: string, token: string) => {
  const verificationUrl = `https://sat.ets.edu.pk/Verify?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify your email',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email this link will expire in 24 hours.</p>`,
  });
};
