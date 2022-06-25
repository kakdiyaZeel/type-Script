"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendPasswordResetEmail = void 0;
const config_1 = __importDefault(require("./config"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const OAuth2 = googleapis_1.google.auth.OAuth2;
const OAuth2_client = new OAuth2(config_1.default.clientId, config_1.default.clientSecret);
OAuth2_client.setCredentials({ refresh_token: config_1.default.refreshToken });
const send_email = ({ to, subject, html, from }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = OAuth2_client.getAccessToken();
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: config_1.default.user,
                clientId: config_1.default.clientId,
                clientSecret: config_1.default.clientSecret,
                refreshToken: config_1.default.refreshToken,
                accessToken: accessToken,
            },
        });
        yield transporter.sendMail({ to, subject, html, from });
    }
    catch (error) {
        throw new Error(error);
    }
});
const sendPasswordResetEmail = (email, resetToken, origin) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let message;
        if (origin) {
            const resetUrl = `${origin}/forgotPassword?token=${resetToken} email=${email}`;
            message = `<p>Please click the below link to reset your password, the link will be valid for 1 hour:</p>
               <p><a href="${resetUrl}">${resetUrl}</a></p>`;
        }
        else {
            message = `<p>Please use the below token to reset your password with the <code>/user/forgot-password</code> api route:</p>
               <p><code>${resetToken}</code></p>`;
        }
        yield send_email({
            from: config_1.default.user,
            to: email,
            subject: "Reset Password",
            html: `<h4>Reset Password</h4>
               ${message}`,
        });
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.sendPasswordResetEmail = sendPasswordResetEmail;
