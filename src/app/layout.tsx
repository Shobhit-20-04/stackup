import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientChatWidget from '@/components/ClientChatWidget';
import SessionTimeoutManager from '@/components/SessionTimeoutManager';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('stackup-theme') || 'cosmic';
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
      <body className="font-sans min-h-full flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[#004182] selection:text-white transition-colors duration-150">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ClientChatWidget />
        <SessionTimeoutManager />
      </body>
    </html>
  );
}
