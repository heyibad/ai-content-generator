import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { eq } from 'drizzle-orm';
import { Users } from '../../../../utils/schema';
import { db } from '../../../../utils/db';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  try {
  
    const email = request.headers.get('X-User-Email');
    if (!email) {
      return NextResponse.json(
        { error: 'User email is required' },
        { status: 400 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('profilePicture') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    
    const result = await cloudinary.uploader.upload(base64String, {
      folder: 'profiles',
      resource_type: 'auto',
    });

   
    try {
      const updatedUser = await db
        .update(Users)
        .set({
          profileUrl: result.secure_url,
          updatedAt: new Date(),
        })
        .where(eq(Users.email, email))
        .returning();

      if (!updatedUser || updatedUser.length === 0) {
        throw new Error('User not found');
      }

      return NextResponse.json({
        success: true,
        profileUrl: result.secure_url,
        public_id: result.public_id,
        user: updatedUser[0],
      });
    } catch (dbError) {
      // If database update fails, we should delete the uploaded image from Cloudinary
      await cloudinary.uploader.destroy(result.public_id);
      throw new Error('Failed to update user profile');
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Error uploading file'
      },
      { status: 500 }
    );
  }
}