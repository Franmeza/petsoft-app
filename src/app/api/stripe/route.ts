import prisma from "@/lib/db";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  //verify if the event is from stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    return Response.json(null, { status: 400 });
  }

  //fulfill order
  switch (event.type) {
    case "checkout.session.completed":
      await prisma?.user.update({
        where: {
          email: event.data.object.customer_email,
        },
        data: {
          isSuscribed: true,
        },
      });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  //update user to premium

  return Response.json(null, { status: 200 });
}
