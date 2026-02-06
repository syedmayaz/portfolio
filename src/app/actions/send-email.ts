'use server';

import * as z from 'zod';
import nodemailer from 'nodemailer';

const contactFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

export async function sendContactEmail(formData: z.infer<typeof contactFormSchema>) {
  const parsedData = contactFormSchema.safeParse(formData);

  if (!parsedData.success) {
    return { success: false, message: 'Invalid form data.' };
  }

  const { name, email, phone, message } = parsedData.data;

  const {
    EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD,
    EMAIL_TO,
  } = process.env;

  if (!EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD || !EMAIL_TO) {
    console.error('Missing email environment variables');
    return { success: false, message: 'Server configuration error.' };
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: EMAIL_SERVER_USER,
      pass: EMAIL_SERVER_PASSWORD,
    },
  });

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <p>You have received a new message from your website's contact form.</p>
      <hr>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
      <h3 style="margin-top: 20px; color: #555;">Message:</h3>
      <p style="background-color: #f9f9f9; border: 1px solid #ddd; padding: 10px; border-radius: 5px;">
        ${message.replace(/\n/g, '<br>')}
      </p>
    </div>
  `;

  const emailText = `
    New Contact Form Submission
    ---------------------------
    Name: ${name}
    Email: ${email}
    ${phone ? `Phone: ${phone}` : ''}
    Message:
    ${message}
  `;

  try {
    await transporter.sendMail({
      from: `"Syed Ayaz Website" <${EMAIL_SERVER_USER}>`,
      to: EMAIL_TO,
      subject: `New Message from ${name}`,
      text: emailText,
      html: emailHtml,
    });
    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, message: 'Failed to send message. Please try again later.' };
  }
}
