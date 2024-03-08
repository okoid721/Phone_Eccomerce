'use client';

import { ImageType } from '@/app/admin/add-product/AddProductForm';

interface SelectedImageProps {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectedImage: React.FC<SelectedImageProps> = ({
  item,
  handleFileChange,
}) => {
  return <div></div>;
};

export default SelectedImage;
