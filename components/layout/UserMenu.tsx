'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logoutAction } from '@/lib/actions/auth.actions';
import type { User } from '@/types/auth.types';

interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logoutAction();
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 px-2 py-2 rounded-xl hover:bg-blue-50 transition-all duration-200 border border-transparent hover:border-blue-100"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-blue-100">
          {user.userDetail?.firstName?.[0]}{user.userDetail?.lastName?.[0]}
        </div>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-3 w-60 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20 animate-fade-in">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white font-bold text-lg ring-2 ring-white/30">
                  {user.userDetail?.firstName?.[0]}{user.userDetail?.lastName?.[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate text-sm">
                    {user.userDetail?.firstName} {user.userDetail?.lastName}
                  </p>
                  <p className="text-blue-100 text-xs truncate">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="py-2">
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                onClick={() => setShowDropdown(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <span className="font-medium">Dashboard</span>
              </Link>
              <Link
                href="/profile/edit"
                className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors group"
                onClick={() => setShowDropdown(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span className="font-medium">Edit Profil</span>
              </Link>
              <div className="my-1 border-t border-gray-100"></div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors w-full group"
              >
                <div className="w-8 h-8 rounded-lg bg-red-50 group-hover:bg-red-100 flex items-center justify-center transition-colors">
                  <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </div>
                <span className="font-medium">Keluar</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
