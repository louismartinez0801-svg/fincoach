import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "FinCoach Premium",
            description: "Acces illimite au coach financier IA",
          },
          unit_amount: 999,
          recurring: { interval: "month" },
        },
        quantity: 1,
      },
    ],
    success_url: "http://localhost:3000/dashboard?success=true",
    cancel_url: "http://localhost:3000/pricing",
  });

  return NextResponse.json({ url: session.url });
}