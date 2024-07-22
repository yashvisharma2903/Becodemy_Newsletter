'use server'

import Subscriber from "@/models/subscribers.model";
import {connectDb} from "@/shared/libs/db"


export const subscribe = async ({
    email,
    username,
    user_id
  }: {
    email: string;
    username: string;
    user_id:string;  
}) => {
    try{
        await connectDb();

        // Check if subscriber already exists
        const isSubscriberExist = await Subscriber.findOne({
            email,
            newsLetterOwnerId: user_id,
        });
        
        if (isSubscriberExist) {
            return { error: "Email already exists!" };
        }
        
        // Create new subscriber
        const subscriber = await Subscriber.create({
            email,
            newsLetterOwnerId: user_id,
            
        });
        
        return subscriber;
    } catch (error) {
      console.error(error);
      return { error: "An error occurred while subscribing." };
    }
  };