"use server";

import { checkAuth } from "@/lib/server-utils";
import { redirect } from "next/navigation";

//instantiate stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function createCheckoutSession() {
  //authentication check
  const session = await checkAuth();

  const checkoutSesssion = await stripe.checkout.sessions.create({
    customer_email: session.user.email,

    line_items: [
      {
        price: "price_1Pxy9HADpKMvbznrwONFkv4a",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.BASE_URL}/payment?success=true`,
    cancel_url: `${process.env.BASE_URL}/payment?cancelled=true`,
  });
  redirect(checkoutSesssion.url);
}
