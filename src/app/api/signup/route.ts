import { hash } from 'bcrypt';
import { db } from '@/../utils/db'; // Assuming you have a db connection file for Drizzle
import { Users } from '@/../utils/schema'; // Import your Users schema
import { eq, or } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

// The Signup API handler
export async function POST(req: NextRequest) {
  try {
    // Extract and parse the JSON body
    const { email, username, password } = await req.json();
    console.log(email, username, password)
    
    // Validate that all required fields are present
    if (!email || !username || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Check if the email or username already exists in the database
    const existingUser = await db.select().from(Users).where(
      or(eq(Users.email, email), eq(Users.username, username))
    ).limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json({ message: 'Email or Username already exists' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Insert the new user into the database
    const newUser = await db.insert(Users).values({
      email,
      username,
      password: hashedPassword, // Save the hashed password
      isVerified: false, // Default to unverified
    }).returning();

    return NextResponse.json({
      message: 'User created successfully',
      user: newUser,
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error during signup:', error.message);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
