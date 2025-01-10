import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true', // Use secure connection (SSL/TLS) if true
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email options
    const mailOptions = {
      from: email, // Sender's email address (from the form)
      to: process.env.EMAIL_TO, // Default recipient email address
      subject: `New Contact Form Submission from ${name}`, // Subject of the email
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Plain text body
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`, // HTML body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: 'Email sent successfully', info });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ message: 'Failed to send email', error: error.message });
  }
}
    