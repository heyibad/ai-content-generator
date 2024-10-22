// /app/api/webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "../../../../utils/db";
import { Subscription } from "../../../../utils/schema";
import { eq } from "drizzle-orm";

// Verify the Lemon Squeezy webhook signature
function verifySignature(secret: string, payload: string, signature: string) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(payload, "utf8");
  return hmac.digest("hex") === signature;
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("X-Signature") || "";
    const secret = process.env.LEMON_WEBHOOK_SECRET!;

    if (!verifySignature(secret, rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const { data, event_name } = JSON.parse(rawBody);
    if (!["subscription_created", "subscription_updated"].includes(event_name)) {
      return NextResponse.json({ message: "Event ignored" });
    }

    const subscription = {
      email: data.attributes.customer_email,
      username: data.attributes.customer_name || "Anonymous",
      plan: data.attributes.product_name.toLowerCase(),
      active: data.attributes.status === "active",
      expiryDate: new Date(data.attributes.ends_at),
      createdDate: new Date(),
      paymentId: data.id,
    };

    // Upsert logic using Drizzle ORM
    const existingSub = await db.query.Subscription.findFirst({
      where: (subs) => eq(subs.email, subscription.email),
    });

    if (existingSub) {
      await db.update(Subscription)
        .set(subscription)
        .where(eq(Subscription.email, subscription.email));
    } else {
      await db.insert(Subscription).values(subscription);
    }

    return NextResponse.json({ message: "Subscription processed" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
