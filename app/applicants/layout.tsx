"use client"
import React, { useEffect, useLayoutEffect } from 'react';
import { Metadata } from 'next';
import Navbar from './components/Navbar';
import { SessionProvider, useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import AuthContext from '../context/AuthContext';
import { getEmail } from '../libs/myeail';





interface RootLayoutProps {
  children: React.ReactNode;
}
const RootLayout: React.FC<RootLayoutProps> =  ({ children }) => {
  const router = useRouter(); // Move useRouter inside the component
  const {data:session,status}=useSession()
  useLayoutEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/'); // Redirect to login if not authenticated
    }
  }, [status, router]);
 
  return (
    
<AuthContext>

      <div className="w-full h-full">
        <Navbar />
        <div>{children}</div>
      </div>
      
      </AuthContext>
      
  );
};
const metadata: Metadata = {
  title: 'Applicant',
  description: '',
};
export default RootLayout;
export const fetchCache = 'force-no-store';
