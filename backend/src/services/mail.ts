import nodemailer from "nodemailer"
import { ENV } from "../config/env"

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:ENV.GMAIL_USER as string,
        pass:ENV.GMAIL_PASS
    }
})
export const SendMail = async (to:string, subject:string, html:string):Promise<void> =>{
    const mailOption = {
    from:`"Play With Kwara Youth" <${ENV.GMAIL_USER}>`,
    to,
    subject,
    html
    }
  try {
    const info = await transporter.sendMail(mailOption)
    console.log("email sent successfully", info.response)
  } catch (error) {
    console.log(error)
  }
}

 