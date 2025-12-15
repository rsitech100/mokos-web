import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/common/ScrollToTop';
import { ChatWidget } from '@/components';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <ScrollToTop />
      <Header />
      <main className="pt-4">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
