"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: env_1.ENV.GMAIL_USER,
        pass: env_1.ENV.GMAIL_PASS
    }
});
const SendMail = async (to, subject, html) => {
    const mailOption = {
        from: `"Play With Kwara Youth" <${env_1.ENV.GMAIL_USER}>`,
        to,
        subject,
        html
    };
    try {
        const info = await transporter.sendMail(mailOption);
        console.log("email sent successfully", info.response);
    }
    catch (error) {
        console.log(error);
    }
};
exports.SendMail = SendMail;
