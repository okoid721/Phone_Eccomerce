'use client';
import { useState, useEffect } from 'react';
import Haeding from '../components/Haeding';
import Input from '../components/inputs/Input';
import { register } from 'module';
import { error } from 'console';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

interface RegisterFormProps {
  currentUser: SafeUser | null;
}

const RegisterFrom: React.FC<RegisterFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/cart');
      router.refresh;
    }
  }, []);

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post('/api/register', data)
      .then(() => {
        toast.success('Welcome to King-mobile');

        signIn('credentials', {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            setTimeout(() => {
              router.push('/cart');
              router.refresh();
              toast.success('created successfully');
            }, 0);
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => toast.error('Error creating account'))
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (currentUser) {
    return (
      <p className=" text-center font-bold text-3xl">
        {' '}
        Logged In Redirecting....
      </p>
    );
  }

  return (
    <>
      <Haeding title="Sign Up" />
      <Button
        outline
        label="Sign Up Using Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <hr className=" bg-slate-500 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />
      <Button
        label={isLoading ? 'Loading' : 'Sign Up'}
        onClick={handleSubmit(onsubmit)}
      />
      <p className=" text-sm">
        Already Have An Account?{' '}
        <Link className=" underline" href={'/login'}>
          Log in
        </Link>
      </p>
    </>
  );
};

console.log(RegisterFrom);

export default RegisterFrom;
