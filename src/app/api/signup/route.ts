import { hash } from "bcrypt";
import { db } from "@/../utils/db"; // Assuming you have a db connection file for Drizzle
import { Users } from "@/../utils/schema"; // Import your Users schema
import { eq, or } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { emailHelper } from "@/helpers/sender";
import { randomInt } from "crypto";

// The Signup API handler
export async function POST(req: NextRequest) {
    try {
        // Extract and parse the JSON body
        const { email, username, password } = await req.json();
        console.log(email, username, password);

        // Validate that all required fields are present
        if (!email || !username || !password) {
            return NextResponse.json(
                { message: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check if the email or username already exists in the database
        const existingUser = await db
            .select()
            .from(Users)
            .where(or(eq(Users.email, email), eq(Users.username, username)))
            .limit(1);

        if (existingUser.length > 0) {
            return NextResponse.json(
                { message: "Email or Username already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await hash(password, 10);

        // Insert the new user into the database
        const verificationCode = randomInt(100000, 1000000);
        const newUser = await db
            .insert(Users)
            .values({
                email,
                username,
                password: hashedPassword, // Save the hashed password
                isVerified: false, // Default to unverified
                verifyCode: String(verificationCode),
            })
            .returning();

        if (newUser.length === 0 || newUser != undefined) {
            const emailDone = await emailHelper(
                username,
                email,
                String(verificationCode),
                process.env.NEXT_PUBLIC_DOMAIN!
            );
            if (!emailDone.success) {
                return NextResponse.json(
                    { status: false, message: "Error while email sending" },
                    { status: 502 }
                );
            }
        }
        return NextResponse.json(
            {
                message: "User created successfully",
                status: true,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error during signup:", error.message);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
