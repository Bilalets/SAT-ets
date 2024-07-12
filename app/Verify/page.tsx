'use client'
import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || typeof token !== 'string') return;

      try {
        await axios.get(`/api/Verifytoken/${token}`);
        toast.success('Email verified successfully');
        window.location.href = '/';
      } catch (error) {
       
        toast.error('Failed to verify email');
      }
    };

    verifyEmail();
  }, [token]);

  return <div>Verifying...</div>;
};

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmail />
    </Suspense>
  );
};

export default VerifyEmailPage;
