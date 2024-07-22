'use server'

import Subscriber from "@/models/subscribers.model";
import sendEmail from "@/shared/utils/mail";


export const sendEmailToSubscribers = async (subject: string, html: string) => {
    const subscribers = await Subscriber.find();
    const emails = subscribers.map(subscriber => subscriber.email);
    console.log(subscribers);
    if(emails === undefined|| emails.length === 0){
        return {error: "Email not found!"};
    }
    
  
    await sendEmail(emails, subject, html)
        return {success: "Reset email sent!"};
  };
  
  export default sendEmailToSubscribers;
