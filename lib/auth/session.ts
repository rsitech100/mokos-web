import { cookies } from 'next/headers';
import type { User } from '@/types/auth.types';

const TOKEN_NAME = 'auth_token';
const USER_DATA_NAME = 'user_data';

function encryptData(data: string): string {
  return Buffer.from(data).toString('base64');
}

function decryptData(encrypted: string): string {
  return Buffer.from(encrypted, 'base64').toString('utf-8');
}

export async function setAuthToken(token: string, rememberMe: boolean = false): Promise<void> {
  const cookieStore = await cookies();
  const encrypted = encryptData(token);
  
  // If rememberMe is true, set cookie for 30 days, otherwise 7 days
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  
  cookieStore.set(TOKEN_NAME, encrypted, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });
}

export async function getAuthToken(): Promise<string | null> {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get(TOKEN_NAME)?.value;
  
  if (!encrypted) return null;
  
  try {
    return decryptData(encrypted);
  } catch {
    return null;
  }
}

export async function setUserData(user: User, rememberMe: boolean = false): Promise<void> {
  const cookieStore = await cookies();
  const encrypted = encryptData(JSON.stringify(user));
  
  // If rememberMe is true, set cookie for 30 days, otherwise 7 days
  const maxAge = rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7;
  
  cookieStore.set(USER_DATA_NAME, encrypted, {
    httpOnly: false, 
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge,
    path: '/',
  });
}

export async function getUserData(): Promise<User | null> {
  const cookieStore = await cookies();
  const encrypted = cookieStore.get(USER_DATA_NAME)?.value;
  
  if (!encrypted) return null;
  
  try {
    const decrypted = decryptData(encrypted);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}

export async function clearAuth(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(TOKEN_NAME);
  cookieStore.delete(USER_DATA_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getAuthToken();
  return !!token;
}

// Client-side helper to get user data
export function getUserDataFromCookie(): User | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const userCookie = cookies.find(c => c.trim().startsWith(`${USER_DATA_NAME}=`));
  
  if (!userCookie) return null;
  
  try {
    const encrypted = userCookie.split('=')[1];
    const decrypted = Buffer.from(encrypted, 'base64').toString('utf-8');
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
}
