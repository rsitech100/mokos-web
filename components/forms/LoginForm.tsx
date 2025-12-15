'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormInput } from '@/components/forms/FormInput';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import { loginAction } from '@/lib/actions/auth.actions';

export function LoginForm() {
  const router = useRouter();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
    setFieldErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.email) {
      errors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      errors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      errors.password = 'Password minimal 8 karakter';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const result = await loginAction(formData, rememberMe);

      if (result.success) {
        showToast('Login berhasil! Selamat datang kembali.', 'success');
        router.push('/');
        router.refresh();
      } else if (result.errors) {
        const errors: Record<string, string> = {};
        result.errors.forEach((err: any) => {
          errors[err.path[0]] = err.message;
        });
        setFieldErrors(errors);
      } else {
        setError(result.error || 'Login gagal');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-6 backdrop-blur-sm bg-white/95">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <svg className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="text-sm font-medium text-red-800">Login Gagal</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="nama@email.com"
          error={fieldErrors.email}
          required
          disabled={loading}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Masukkan password Anda"
          error={fieldErrors.password}
          helperText="Minimal 8 karakter"
          required
          disabled={loading}
        />

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span>Memproses...</span>
            </div>
          ) : (
            'Masuk'
          )}
        </Button>
      </form>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-center text-xs text-gray-600">
          Belum punya akun?{' '}
          <Link
            href="/register"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
          >
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
