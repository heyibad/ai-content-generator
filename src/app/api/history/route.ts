
import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../utils/db";
import { Content } from "../../../../utils/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const email = body.email;

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const contentData = await db
            .select()
            .from(Content)
            .where(eq(Content.createdBy, email));

        return NextResponse.json({ data: contentData });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json(
            { error: (error as Error)?.message || "Error during fetch in history page" },
            { status: 500 }
        );
    }
}