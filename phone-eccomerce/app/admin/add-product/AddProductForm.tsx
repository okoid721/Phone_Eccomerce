'use client';
import Button from '@/app/components/Button';
import Haeding from '@/app/components/Haeding';
import CategoryInput from '@/app/components/inputs/CategoryInput';
import CustomCheckBox from '@/app/components/inputs/CustomCheckBox';
import Input from '@/app/components/inputs/Input';
import SelectColor from '@/app/components/inputs/SelectColor';
import TextArea from '@/app/components/inputs/TextArea';
import { categories } from '@/utils/Categorise';
import { colors } from '@/utils/Colors';
import React, { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};
export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const AddProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);

  const [isProductCreated, setIsProductCreated] = useState(false);

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

  useEffect(() => {
    setCustomValue('images', images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated]);

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('Product Data', data);

    // upload images to firebase
    //save procuct to mongodb
    setIsLoading(true);
    let uploadedImages: UploadedImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      return toast.error('Category is not selected');
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      return toast.error('No image was selected');
    }
  };
  const category = watch('category');

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }

      return [...prev, value];
    });
  }, []);

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );

        return filteredImages;
      }
      return prev;
    });
  }, []);

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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto ">
          {categories.map((item) => {
            if (item.label === 'ALL') {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue('category', category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="font-bold">
            Select The Available colors and upload their images
          </div>
          <div>
            You Must upload an Image for each of the color selected otherwise
            your color selection will be ignored
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 ">
          {colors.map((item, index) => {
            return (
              <>
                <SelectColor
                  key={index}
                  item={item}
                  addImageToState={addImageToState}
                  removeImageFromState={removeImageFromState}
                  isProductCreated={isProductCreated}
                />
              </>
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? 'Loading...' : 'Add Products'}
        onClick={handleSubmit(onsubmit)}
      />
    </>
  );
};

export default AddProductForm;
