import Link from 'next/link';
import { Container } from '@/components/layout/Container';
import { ProfileForm } from '@/components/forms/ProfileForm';
import { getUserData } from '@/lib/auth/session';
import { redirect } from 'next/navigation';

export async function EditProfile() {
  const user = await getUserData();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="py-12">
        <Container>
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-4 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali ke Beranda
            </Link>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-bold text-2xl shadow-lg ring-4 ring-blue-100">
                {user.userDetail?.firstName?.[0]}{user.userDetail?.lastName?.[0]}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Profil</h1>
                <p className="text-gray-600 mt-1">Perbarui informasi akun Anda</p>
              </div>
            </div>
          </div>

          <ProfileForm user={user} />
        </div>
      </Container>
      </div>
    </div>
  );
}
