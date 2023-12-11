import nodemailer from 'nodemailer'

import { dev } from '../config'

import { EmailDataType } from '../types/emailDataType'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: dev.app.stmpUsername,
    pass: dev.app.stmpPassword,
  },
})

export const handleSendEmail = async (emailData: EmailDataType) => {
  try { 
  const mailOptions = {
    from: dev.app.stmpUsername,
    to: emailData.email,
    subject: emailData.subjeect,
    html: emailData.html,
  }
    const info = await transporter.sendMail(mailOptions)
    console.log("message send : "+ info.response)
  } catch  (error){
    console.log("error encountered while sending email", error)
    throw error
}
}
