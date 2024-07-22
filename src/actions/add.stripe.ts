"use server";

import Membership from "@/models/membership.model";
import { connectDb } from "@/shared/libs/db";

import Stripe from "stripe";

export const addStripe = async (
  id:string,
  email:string,
) => {
  try {
    await connectDb();

    const membership = await Membership.findOne({ userId: id });

    if (membership) {
      return;
    } else {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-06-20",
      });

      await stripe.customers
        .create({
          email: email,
        })
        .then(async (customer) => {
          await Membership.create({
            userId: id,
            stripeCustomerId: customer.id,
            plan: "LAUNCH",
          });
        });
    }
  } catch (error) {
    console.log(error);
  }
};
