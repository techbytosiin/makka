import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from '../ui/WhatsAppButton';
import AIChat from '../ui/AIChat';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && (
        <>
          <WhatsAppButton />
          <AIChat />
        </>
      )}
    </div>
  );
}
