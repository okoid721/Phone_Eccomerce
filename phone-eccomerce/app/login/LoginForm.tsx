'use client';
import { useEffect, useState } from 'react';
import Haeding from '../components/Haeding';
import Input from '../components/inputs/Input';
import { register } from 'module';
import { error } from 'console';
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form';
import Button from '../components/Button';
import Link from 'next/link';
import { AiOutlineGoogle } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { SafeUser } from '@/types';

interface LoginFormProps {
  currentUser: SafeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
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
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        setTimeout(() => {
          router.push('/');
          router.refresh();
          toast.success('Logged In');
        }, 0);
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
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
      <Haeding title="Login" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {
          signIn('google');
        }}
      />
      <hr className=" bg-slate-500 w-full h-px" />
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
        label={isLoading ? 'Loading' : 'Login'}
        onClick={handleSubmit(onsubmit)}
      />
      <p className=" text-sm">
        Do Not Have An Account?{' '}
        <Link className=" underline" href={'/register'}>
          Sign Up
        </Link>
      </p>
    </>
  );
};

export default LoginForm;
