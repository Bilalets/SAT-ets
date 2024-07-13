'use client'
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ToasterContext from '@/app/context/ToasterContext';
import AuthContext from './context/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Use useRouter from 'next/router'

const inter = Inter({ subsets: ['latin'] });

// Define metadata without exporting
const metadata: Metadata = {
  title: 'ETS',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter(); // Move useRouter inside the component
  
  useEffect(() => {
    const userEmail = ''; // Replace with getEmail() logic
    if (userEmail === '') {
      router.replace('/'); // Redirect to '/' if userEmail is empty
    }
  }, [router]);

  return (
    <html lang="en">
      <AuthContext>
        <body className={inter.className}>
          <ToasterContext />
          {children}
        </body>
      </AuthContext>
    </html>
  );
}
