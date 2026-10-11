import nodemailer from 'nodemailer';
let transport;
function getTransport(){if(!process.env.SMTP_HOST||!process.env.SMTP_USER||!process.env.SMTP_PASS||!process.env.NOTIFY_EMAIL)return null;if(!transport){transport=nodemailer.createTransport({host:process.env.SMTP_HOST,port:Number(process.env.SMTP_PORT)||587,secure:String(process.env.SMTP_SECURE||'false')==='true',auth:{user:process.env.SMTP_USER,pass:process.env.SMTP_PASS}})}return transport}
export async function notifyAdmin({subject,text}){const mailer=getTransport();if(!mailer)return;try{await mailer.sendMail({from:process.env.MAIL_FROM||process.env.SMTP_USER,to:process.env.NOTIFY_EMAIL,subject,text})}catch(error){console.error('[email-notification-failed]',error.message)}}
