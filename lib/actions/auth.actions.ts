'use server';

import { redirect } from 'next/navigation';
import { registerSchema, loginSchema, type RegisterInput, type LoginInput } from '@/lib/validation/auth.schema';
import { setAuthToken, setUserData, clearAuth } from '@/lib/auth/session';
import type { AuthResponse } from '@/types/auth.types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function registerAction(data: RegisterInput) {
  try {
    const validated = registerSchema.parse(data);
    
    const { confirmPassword, ...registerData } = validated;
    
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(registerData),
    });

    const result: AuthResponse = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.message || 'Registrasi gagal',
      };
    }

    await setAuthToken(result.data.token);
    await setUserData(result.data.user);

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    console.error('Register error:', error);
    
    if (error.errors) {
      return {
        success: false,
        errors: error.errors,
      };
    }
    
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan',
    };
  }
}

export async function loginAction(data: LoginInput, rememberMe: boolean = false) {
  try {
    const validated = loginSchema.parse(data);
    
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(validated),
    });

    const result: AuthResponse = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.message || 'Login gagal',
      };
    }

    await setAuthToken(result.data.token, rememberMe);
    await setUserData(result.data.user, rememberMe);

    return {
      success: true,
      message: result.message,
    };
  } catch (error: any) {
    console.error('Login error:', error);
    
    if (error.errors) {
      return {
        success: false,
        errors: error.errors,
      };
    }
    
    return {
      success: false,
      error: error.message || 'Terjadi kesalahan',
    };
  }
}

export async function logoutAction() {
  await clearAuth();
  redirect('/login');
}
