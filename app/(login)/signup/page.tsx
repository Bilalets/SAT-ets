'use client';
import { Button, Label, Select, TextInput } from 'flowbite-react';
import {
  HiOutlineUser,
  HiUser,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLockClosed,
  HiOutlineUserCircle,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AiOutlineLoading } from 'react-icons/ai';
import React, { useState } from 'react';
import { cities } from './cities';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { CreditCard } from 'lucide-react';

interface FormValues {
  name: string;
  fatherName: string;
  email: string;
  phoneNumber: string;
  dateofBirth: string;
  password: string;
  city: string;
  role: string; 
  Cnic:string; // Add role to the form values
}

const getPasswordStrength = (password: string): string => {
  const strongRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const mediumRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (strongRegex.test(password)) {
    return 'strong';
  } else if (mediumRegex.test(password)) {
    return 'medium';
  } else {
    return 'weak';
  }
};

const SignUp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();
  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordStrength(getPasswordStrength(password));
  };
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      data.dateofBirth = new Date(data.dateofBirth).toISOString();
      data.phoneNumber = data.phoneNumber.toString();
  
      const response = await axios.post(`/api/register`, data);
  
      if (response.status === 201) {
        toast.success('Account Created Successfully. Please Verify Your Account');
        router.push('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as any;
        if (axiosError.response?.status === 400) {
          toast.error('Email already exists. Please use a different email.');
        } else {
          console.error('Error occurred while submitting the form:', error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
            
            <div className="mt-4">
              <Label htmlFor="full_name" value="Full Name" />
              <TextInput
                {...register('name', { required: 'Full name is required' })}
                type="text"
                id="fullName"
                shadow
                icon={HiOutlineUserCircle}
                placeholder="Full Name"
              />
              {errors.name && (
                <span className=" text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <Label htmlFor="father_name" value="Father's Name" />
              <TextInput
                {...register('fatherName', {
                  required: 'Father name is required',
                })}
                type="text"
                id="fatherName"
                shadow
                icon={HiOutlineUserCircle}
                placeholder="Father Name"
              />
              {errors.fatherName && (
                <span className=" text-sm text-red-500">
                  {errors.fatherName.message}
                </span>
              )}
            </div>
            <div className="mt-4">
              <Label htmlFor="CNIC" value="Enter CNIC" />
              <TextInput
                {...register('Cnic', {
                  required: 'CNIC is Required',
                })}
                type="number"
                id="CNIC"
                shadow
                icon={CreditCard}
                placeholder="Enter CNIC"
              />
            {errors.Cnic && (
  <span className=" text-sm text-red-500">
    {errors.Cnic.message}
  </span>
)}
            </div>
            <div className="mt-4">
              <Label value="Date of Birth" />
              <TextInput
                shadow
                type="date"
                {...register('dateofBirth', {
                  required: 'Date of birth required',
                })}
              />
              {errors.dateofBirth && (
                <span className="text-sm text-red-500">
                  {errors.dateofBirth.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <Label value="City" />
              <Select {...register('city', { required: 'City is required' })}>
                {cities.map(({ city }) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </Select>
              {errors.city && (
                <span className="text-sm text-red-500">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <Label value="Email" />
              <TextInput
                {...register('email', {
                  required: 'Email is required',
                })}
                type="email"
                shadow
                icon={HiOutlineMail}
                placeholder="email@yourdomain.com"
              />
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className="mt-4">
              <Label value="Password" />
              <div className="flex h-full w-full">
                <TextInput
                  className="w-full"
                  shadow
                  type={showPassword ? 'text' : 'password'}
                  icon={HiOutlineLockClosed}
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  onChange={handlePasswordChange}
                  placeholder="*********"
                />
                <button
                  className="-ml-8 z-10 text-gray-500"
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
              {passwordStrength && (
                <div className={`mt-1 text-sm ${
                  passwordStrength === 'weak' ? 'text-red-500' :
                  passwordStrength === 'strong' ? 'text-green-500' :
                  'text-yellow-500'
                }`}>
                  {passwordStrength}
                </div>
              )}
            </div>

            <div className="mt-4">
              <Label value="Phone" />
              <TextInput
               
                {...register('phoneNumber', {
                  required: 'Phone number is required',
                  maxLength: {
                    value: 11,
                    message: 'Phone number must be 11 digits',
                  },
                  pattern: {
                    value: /^\d{11}$/,
                    message: 'Phone number must be exactly 11 digits',
                  },
                })}
                icon={HiOutlinePhone}
                shadow
                placeholder="03xxxxxxxxx"
              />
              {errors.phoneNumber && (
                <span className=" text-sm text-red-500">
                  {errors.phoneNumber.message}
                </span>
              )}
            </div>

      

            <div className="flex justify-end mt-4">
              {loading ? (
                <Button
                  className="w-full bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
                  isProcessing
                  processingSpinner={<AiOutlineLoading className="h-6 w-6 animate-spin" />}
                >
                  Please wait...
                </Button>
              ) : (
                <button
                  type="submit"
                  className="w-full px-6 py-2 bg-black text-white rounded hover:bg-gray-800 focus:outline-none"
                >
                  Sign up
                </button>
              )}
            </div>
            <div className='flex flex-row gap-5 mt-5'>
              <p>Already Have an Account?</p>
              <span className="font-bold text-sm cursor-pointer text-sky-400">
                <Link href={'/'}>Login</Link>
              </span>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default SignUp;
