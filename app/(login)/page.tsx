'use client';
import React, { useEffect, useState } from 'react';
import { Button, Label, TextInput } from 'flowbite-react';
import { HiOutlineUserCircle, HiOutlineLockOpen } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signIn, getSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { AiOutlineLoading } from 'react-icons/ai';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';
import { setEmail } from '../libs/myeail';

interface FormValues {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if ((session?.user as any)?.role === 'applicant') {
      router.replace('/applicants/home');
    }
    if ((session?.user as any)?.role === 'admin') {
      router.replace('/Admin/dashboard/main');
    }

    if (session?.user?.email) {
      if (session.user.email === 'admin123@gmail.com') {
        router.replace('/superadmin/dashboard/statistics');
      }
    }
  }, [session, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
  
    try {
      const callback = await signIn('credentials', {
        ...data,
        redirect: false,
      });
  
      // Check and log the callback for debugging
    
  
      if (callback?.error) {
        // Use the exact error message from the callback response
        const errorMessage = callback.error || 'An unexpected error occurred. Please try again.';
  
        // Log the error message for debugging
      
  
        // Display the error message using toast
        toast.error(errorMessage);
      } else if (callback?.ok && !callback.error) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setEmail(data.email);
        await getSession();
        router.replace('/applicants/home');
      }
    } catch (error) {
      
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <Image src={'/images/ETS.png'} width={250} height={250} alt="pic" className="mx-auto" />
          <h1 className="text-2xl font-semibold mt-[-50px]">WELCOME TO E-PORTAL</h1>
        </div>
        <h2 className="text-2xl font-semibold  text-center">Login</h2>
        <div className="mb-4">
          <Label htmlFor="email" value="Email" />
          <TextInput
            {...register('email', { required: 'Email is required' })}
            type="email"
            id="email"
            shadow
            icon={HiOutlineUserCircle}
          />
          {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
        </div>
        <div className="mb-4">
          <Label htmlFor="password" value="Password" />
          <TextInput
            {...register('password', { required: 'Password is required' })}
            type="password"
            id="password"
            icon={HiOutlineLockOpen}
          />
          {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
        </div>
        <div className="flex justify-end">
          {loading ? (
            <Button className="w-full bg-black text-white rounded" isProcessing processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}>
              Please wait...
            </Button>
          ) : (
            <button type="submit" className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none">
              Login
            </button>
          )}
        </div>
        <div className="flex justify-between mt-6">
          <Link href="/Forgetpassword">
            <p className="text-sm cursor-pointer text-sky-400">Forgot password?</p>
          </Link>
          <p className="text-sm">
            Not a member yet?{' '}
            <span className="font-bold text-sm cursor-pointer text-sky-400">
              <Link href="/signup">Sign up</Link>
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
