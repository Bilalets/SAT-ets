"use client"
import React, { useEffect } from 'react';
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
  
  useEffect(() => {
    const userEmail = getEmail();
    console.log(userEmail) 
    if (userEmail === '' || userEmail=== "undefined") {
      router.replace('/'); 
    }
  }, [router]);
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
