import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, JetBrains_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientChatWidget from '@/components/ClientChatWidget';
import SessionTimeoutManager from '@/components/SessionTimeoutManager';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'StackUp — All-in-One Interview Preparation Platform',
  description:
    'Structured notes and quizzes across Aptitude, Core CS Subjects, and DSA, plus an ATS resume checker and AI assistant chatbot — built for real scale.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="cosmic"
      className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var raw = localStorage.getItem('stackup-theme');
                  var saved = (raw === 'cosmic' || raw === 'lavender' || raw === 'obsidian') ? raw : 'cosmic';
                  document.documentElement.setAttribute('data-theme', saved);
                  if (saved === 'lavender') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="font-sans min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#044E62] selection:text-white transition-colors duration-150">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ClientChatWidget />
        <SessionTimeoutManager />
      </body>
    </html>
  );
}
