import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { hash, compare } from "bcrypt";
import { Users } from "../../../../utils/schema";
import { db } from "../../../../utils/db";

export async function POST(req: NextRequest) {
    try {
        const { oldPassword, newPassword } = await req.json();
        console.log("Old Password:", oldPassword, "New Password:", newPassword);

        const email = req.headers.get("X-User-Email");

        if (!email) {
            return NextResponse.json(
                { error: "Email not provided" },
                { status: 400 }
            );
        }

        const user = await db
            .select()
            .from(Users)
            .where(eq(Users.email, email))
            .limit(1);

        if (user.length === 0) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const storedHashedPassword = user[0].password;

        if (oldPassword) {
            const isOldPasswordValid = await compare(oldPassword, storedHashedPassword!);
            if (!isOldPasswordValid) {
                return NextResponse.json(
                    { error: "Invalid old password" },
                    { status: 400 }
                );
            }
        } 

        const hashedNewPassword = await hash(newPassword, 10);

        await db
            .update(Users)
            .set({
                password: hashedNewPassword,
                updatedAt: new Date(),
            })
            .where(eq(Users.email, email));

        return NextResponse.json({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
