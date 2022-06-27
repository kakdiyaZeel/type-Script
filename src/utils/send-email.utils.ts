import config from "./config";
import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const OAuth2_client = new OAuth2(config.clientId, config.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config.refreshToken });

type parm = {
  to: any;
  subject: string;
  html: any;
  from: any;
};

const send_email = async ({ to, subject, html, from }: parm) => {
  try {
    const accessToken = OAuth2_client.getAccessToken();

    const transporter = nodemailer.createTransport(<any>{
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: config.user,
        clientId: config.clientId,
        clientSecret: config.clientSecret,
        refreshToken: config.refreshToken,
        accessToken: accessToken,
      },
    });

    await transporter.sendMail({ to, subject, html, from });
  } catch (error: any) {
    throw new Error(error);
  }
};

const sendPasswordResetEmail = async (
  email: any,
  resetToken: any,
  origin: any
) => {
  try {
    let message;

    if (origin) {
      const resetUrl = `${origin}/forgotPassword?token=${resetToken} email=${email}`;
      message = `<p>Please click the below link to reset your password, the link will be valid for 1 hour:</p>
               <p><a href="${resetUrl}">${resetUrl}</a></p>`;
    } else {
      message = `<p>Please use the below token to reset your password with the <code>/user/forgot-password</code> api route:</p>
               <p><code>${resetToken}</code></p>`;
    }

    await send_email({
      from: config.user,
      to: email,
      subject: "Reset Password",
      html: `<h4>Reset Password</h4>
               ${message}`,
    });
  } catch (error: any) {
    throw new Error(error);
  }
};

export { sendPasswordResetEmail };
