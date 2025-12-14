'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import type { User } from '@/types/auth.types';

interface ProfileFormProps {
  user: User;
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    firstName: user.userDetail?.firstName || '',
    lastName: user.userDetail?.lastName || '',
    email: user.email || '',
    phone: user.userDetail?.phone || '',
    address: user.userDetail?.address || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setFieldErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.firstName) {
      errors.firstName = 'Nama depan wajib diisi';
    } else if (formData.firstName.length < 2) {
      errors.firstName = 'Nama depan minimal 2 karakter';
    }
    
    if (!formData.lastName) {
      errors.lastName = 'Nama belakang wajib diisi';
    } else if (formData.lastName.length < 2) {
      errors.lastName = 'Nama belakang minimal 2 karakter';
    }
    
    if (!formData.email) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!formData.phone) {
      errors.phone = 'Nomor telepon wajib diisi';
    } else if (!/^08[0-9]{8,11}$/.test(formData.phone)) {
      errors.phone = 'Format nomor telepon tidak valid (contoh: 08123456789)';
    }
    
    if (!formData.address) {
      errors.address = 'Alamat wajib diisi';
    } else if (formData.address.length < 10) {
      errors.address = 'Alamat minimal 10 karakter';
    }
    
    if (formData.newPassword || formData.confirmNewPassword || formData.currentPassword) {
      if (!formData.currentPassword) {
        errors.currentPassword = 'Password saat ini wajib diisi untuk mengubah password';
      }
      
      if (formData.newPassword) {
        if (formData.newPassword.length < 8) {
          errors.newPassword = 'Password baru minimal 8 karakter';
        } else if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(formData.newPassword)) {
          errors.newPassword = 'Password harus mengandung huruf dan angka';
        }
      }
      
      if (formData.newPassword !== formData.confirmNewPassword) {
        errors.confirmNewPassword = 'Konfirmasi password tidak cocok';
      }
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showToast('Profil berhasil diperbarui!', 'success');
      
      const updatedUser = {
        ...user,
        email: formData.email,
        userDetail: {
          ...user?.userDetail,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
          address: formData.address,
        },
      };
      
      const encrypted = btoa(JSON.stringify(updatedUser));
      document.cookie = `user_data=${encodeURIComponent(encrypted)}; path=/; max-age=${7 * 24 * 60 * 60}`;
      
      setTimeout(() => {
        router.push('/');
        router.refresh();
      }, 1000);
    } catch (error) {
      showToast('Terjadi kesalahan. Silakan coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            Informasi Pribadi
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput
              label="Nama Depan"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              error={fieldErrors.firstName}
              required
              disabled={loading}
            />
            <FormInput
              label="Nama Belakang"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              error={fieldErrors.lastName}
              required
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            Informasi Kontak
          </h2>
          
          <div className="space-y-6">
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={fieldErrors.email}
              required
              disabled={loading}
            />
            <FormInput
              label="Nomor Telepon"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              error={fieldErrors.phone}
              helperText="Format: 08xxxxxxxxxx"
              required
              disabled={loading}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Alamat <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className={`w-full px-4 py-3 border ${
                  fieldErrors.address ? 'border-red-300' : 'border-gray-300'
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                disabled={loading}
              />
              {fieldErrors.address && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            Ubah Password
            <span className="text-sm font-normal text-gray-500">(Opsional)</span>
          </h2>
          
          <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
            <FormInput
              label="Password Saat Ini"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              error={fieldErrors.currentPassword}
              disabled={loading}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Password Baru"
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                error={fieldErrors.newPassword}
                helperText="Minimal 8 karakter, huruf dan angka"
                disabled={loading}
              />
              <FormInput
                label="Konfirmasi Password Baru"
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
                error={fieldErrors.confirmNewPassword}
                disabled={loading}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="flex-1"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Menyimpan...</span>
              </div>
            ) : (
              'Simpan Perubahan'
            )}
          </Button>
          <Link href="/" className="flex-1">
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full"
              disabled={loading}
            >
              Batal
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
}
