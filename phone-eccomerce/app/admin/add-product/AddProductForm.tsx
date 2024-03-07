'use client';
import Haeding from '@/app/components/Haeding';
import CustomCheckBox from '@/app/components/inputs/CustomCheckBox';
import Input from '@/app/components/inputs/Input';
import TextArea from '@/app/components/inputs/TextArea';
import React, { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      category: '',
      inStock: false,
      images: '',
      price: '',
    },
  });
  return (
    <>
      <Haeding title="Add A Product" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This Product Is In Stock"
      />
      <div className="w-full font-medium ">
        <div className=" mb-2 font-bold "></div>
        <div className="grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto "></div>
      </div>
    </>
  );
};

export default AddProductForm;
