// /app/api/subscription/route.ts
import { NextRequest, NextResponse } from "next/server";

const CHECKOUT_URLS: { [key in 'gold' | 'platinum']: string } = {
  gold: process.env.GOLD_CHECKOUT_URL!,
  platinum: process.env.PLATINUM_CHECKOUT_URL!,
};

export async function POST(request: NextRequest) {
  try {
    const { plan }:{
      plan: string;
    } = await request.json();

    if (!["gold", "platinum"].includes(plan.toLowerCase())) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const checkoutUrl = CHECKOUT_URLS[plan.toLowerCase() as 'gold' | 'platinum'];
    if (!checkoutUrl) {
      return NextResponse.json({ error: "Checkout URL not found" }, { status: 400 });
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Error during subscription checkout:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
