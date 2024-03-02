'use client';
import { useState } from 'react';
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

const LoginForm = () => {
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

  return (
    <>
      <Haeding title="Login" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
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
