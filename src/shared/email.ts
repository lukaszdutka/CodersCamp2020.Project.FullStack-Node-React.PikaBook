import '../pre-start';
import nodemailer, { TransportOptions } from 'nodemailer';
import { google } from 'googleapis';


const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URL
);
oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

export async function sendMail(userEmail: string) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'mangosteamcc@gmail.com',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
      },
      tls: {
        rejectUnauthorized: false
      }
    } as TransportOptions);

    const mailOptions = {
      from: 'Pikabook <mangosteamcc@gmail.com>',
      to: userEmail,
      subject: 'Welcome to Pikabook',
      text: 'You have just successfully created an account on Pikabook API!',
      html: '<h2>You have just successfully created an account on Pikabook API!</h2>',
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}
