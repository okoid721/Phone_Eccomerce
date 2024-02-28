import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const images = [
  {
    src: '/download-removebg-preview.png',
    alt: 'Laptop in action 1',
  },
  {
    src: '/download-removebg-preview.png',
    alt: 'Laptop in action 2',
  },
  // Add more image objects as needed
];

const ImageSlider = () => {
  return (
    <Swiper>
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div className=" mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly">
            <div className=" mb-8 md:mb-0 text-center">
              <h1 className=" text-4xl md:text-6xl font-bold text-white mb-4">
                Gaming Laptop
              </h1>
              <p className=" text-lg md:text-xl text-white mb-2">BEST DEALS</p>
              <p className=" text-2xl md:text-5xl text-yellow-500 font-bold">
                GET 50% OFF
              </p>
            </div>
            <div className=" w-1/3 relative aspect-video">
              <Image
                src={image.src}
                fill
                alt={image.alt}
                className=" object-contain"
              />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ImageSlider;
