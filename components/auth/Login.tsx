import React from 'react';
import Link from 'next/link';
import { LoginForm } from '@/components/forms/LoginForm';

export function Login() {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 px-4 py-8">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <Link href="/" className="inline-block mb-4">
            <div className="flex items-center gap-2 justify-center">
              <svg
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" />
                <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" />
                <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" />
                <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" />
              </svg>
              <span className="text-2xl font-bold text-white">Mokos</span>
            </div>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-1">
            Selamat Datang Kembali
          </h1>
          <p className="text-blue-100 text-xs">
            Masuk untuk melanjutkan pencarian kos Anda
          </p>
        </div>
        <LoginForm />
        <p className="text-center text-xs text-blue-100 mt-6">
          Dengan masuk, Anda menyetujui{' '}
          <Link href="/terms" className="text-white hover:underline">
            Syarat & Ketentuan
          </Link>{' '}
          dan{' '}
          <Link href="/privacy" className="text-white hover:underline">
            Kebijakan Privasi
          </Link>
        </p>
      </div>
    </div>
  );
}
