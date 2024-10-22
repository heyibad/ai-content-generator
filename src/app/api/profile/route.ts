import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { Users } from '../../../../utils/schema';
import { db } from '../../../../utils/db';

export async function POST(req: NextRequest) {
  try {
    const { name, username, profileUrl } = await req.json();
    const email = req.headers.get('X-User-Email');

    if (!email) {
      return NextResponse.json({ error: 'Email not provided' }, { status: 400 });
    }

    const updateData: Partial<typeof Users.$inferInsert> = {
      name,
      username,
      profileUrl,
      updatedAt: new Date(),
    };

    await db.update(Users).set(updateData).where(eq(Users.email, email));

    const updatedUser = await db.select().from(Users).where(eq(Users.email, email)).limit(1);
    const { password, verifyCode, ...safeUser } = updatedUser[0];

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}