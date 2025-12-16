import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest) {
  try {
    const { oldPassword, newPassword } = await request.json();
    if (!oldPassword || !newPassword) {
      return NextResponse.json({ success: false, message: 'Invalid payload' }, { status: 400 });
    }

    const cookieStore = await cookies();
    const encrypted = cookieStore.get('auth_token')?.value;
    if (!encrypted) {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    let token: string;
    try {
      token = Buffer.from(encrypted, 'base64').toString('utf-8');
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid token' }, { status: 401 });
    }

    const upstream = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ oldPassword, newPassword }),
      cache: 'no-store',
    });

    const data = await upstream.json().catch(() => ({ success: false }));

    if (!upstream.ok || data.success === false) {
      return NextResponse.json(data, { status: upstream.status || 400 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error('Error in change-password:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}
