import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { hash, compare } from 'bcrypt';
import { Users } from '../../../../utils/schema';
import { db } from '../../../../utils/db';

export async function GET(req: NextRequest) {
  try {
    const email = req.headers.get('X-User-Email');
    console.log('email:', email);
    if (!email) {
      return NextResponse.json({ error: 'Email not provided' }, { status: 400 });
    }

    const user = await db.select().from(Users).where(eq(Users.email, email)).limit(1);

    if (user.length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Omit sensitive information like password
    const { password, verifyCode, ...safeUser } = user[0];

    return NextResponse.json(safeUser);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


