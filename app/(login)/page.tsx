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
import {setEmail } from '../libs/myeail';

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
      router.replace('/Admin/dashboard/upload');
    }
    if (session?.user?.email) {
      if (session.user.email === 'ots123@gmail.com') {
        router.replace('/Admin/dashboard/upload');
      }
    }
    if (session?.user?.email === 'romanets@gmail.com') {
      router.replace('/Assistant/Dashboard');
    }
    if (session?.user?.email === 'farazets@gmail.com') {
      router.replace('/Assistant/Dashboard');
    }
    if (session?.user?.email === 'aliets@ets.com') {
      router.replace('/Assistant/Dashboard');
    }
    if (session?.user?.email) {
      if (session.user.email === 'applicant123@gmail.com') {
        router.replace('/applicants/home');
      }
    }
    if (session?.user?.email) {
      if (session.user.email === 'admin123@gmail.com') {
        router.replace('/superadmin/dashboard/statistics');
      }
    }
  }, [session, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false, // Handle redirection manually
    })
      .then(async (callback) => {
        if (callback?.error) {
          const errorMessage =
            callback.error === 'Please verify your email first'
              ? 'Please verify your email first'
              : 'Invalid username or password';
          toast.error(errorMessage);
          setLoading(false);
         
          
        } else if (callback?.ok && !callback.error) {
          // Wait for a short duration to allow the session to update
          await new Promise((resolve) => setTimeout(resolve, 1000));
          setEmail(data.email);
          await getSession();
          router.replace('/applicants/home');
        }
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='text-center mt-7'>
        <div className='flex justify-center items-center'>
          <Image src={'/images/ETS.png'} width={150} height={150} alt='pic' />
        </div>
        <h1 className='text-3xl font-semibold mt-9'>
          WELCOME TO E-PORTAL
        </h1>
      </div>
      <div className="flex items-center mt-[-120px] justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <Label htmlFor="email" value="Email" />
            <TextInput
              {...register('email', { required: 'Email is required' })}
              type="email"
              id="email"
              shadow
              icon={HiOutlineUserCircle}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password" value="Password" />
            <TextInput
              {...register('password', { required: 'Password is required' })}
              type="password"
              id="password"
              icon={HiOutlineLockOpen}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            {loading ? (
              <Button
                className="w-full bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
                isProcessing
                processingSpinner={
                  <AiOutlineLoading className="h-6 w-6 animate-spin" />
                }
              >
                Please wait.....
              </Button>
            ) : (
              <button
                type="submit"
                className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
              >
                Login
              </button>
            )}
          </div>
          <div className="flex justify-between mt-10">
            <Link href={'/Forgetpassword'}>
              <p className="text-sm cursor-pointer text-sky-400">Forgot password?</p>
            </Link>
            <p className="text-sm">
              Not a member yet?{' '}
              <span className="font-bold text-sm cursor-pointer text-sky-400">
                <Link href={'/signup'}>Sign up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginScreen;
