import { db } from "@/../utils/db";
import { Users } from "@/../utils/schema";
import { eq, and } from "drizzle-orm"; // Importing 'and' for combining conditions
import { NextRequest, NextResponse } from "next/server";

// POST /api/verify
export async function POST(req: NextRequest) {
  try {
    const { code, email } = await req.json();

    // Validate both code and email
    if (!code || !email) {
      return NextResponse.json(
        { message: "Email and verification code are required" },
        { status: 400 }
      );
    }

    // Check if a user with the provided email and verification code exists
    const user = await db
      .select()
      .from(Users)
      .where(and(eq(Users.email, email), eq(Users.verifyCode, code))) // Check for both email and code
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json({ message: "Invalid email or verification code" }, { status: 400 });
    }

    // Update the user's `isVerified` status
    await db.update(Users).set({ isVerified: true }).where(eq(Users.id, user[0].id));

    return NextResponse.json({ message: "Code verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying code:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
