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

const RegisterFrom = () => {
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

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);
  };

  return (
    <>
      <Haeding title="Sign Up" />
      <Button
        outline
        label="Sign Up Using Google"
        icon={AiOutlineGoogle}
        onClick={() => {}}
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

export default RegisterFrom;
