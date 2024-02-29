import Link from 'next/link';
import Containers from '../Containers';
import FooterList from './FooterList';
import { MdFacebook } from 'react-icons/md';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-[#232c35] text-[#fff] text-sm mt-16 ">
      <Containers>
        <div className=" flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className=" text-base font-bold mb-2 text-white">
              Shop Categories
            </h3>
            <Link href={'#'}>phones</Link>
            <Link href={'#'}>laptops</Link>
            <Link href={'#'}>Desktop</Link>
            <Link href={'#'}>Watches</Link>
            <Link href={'#'}>TVS</Link>
            <Link href={'#'}>Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className=" text-base font-bold mb-2 text-white ">
              Customer Service
            </h3>
            <Link href={'#'}>contact us</Link>
            <Link href={'#'}>shipping policy</Link>
            <Link href={'#'}>Return & Exchange</Link>
            <Link href={'#'}>FAQs</Link>
          </FooterList>
          <div className=" w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className=" text-base font-bold mb-2 text-white ">About Us</h3>
            <p className=" mb-2 text-white">
              Welcome to our e-commerce page! We offer a wide range of unique
              gadgets, with a focus on user-friendly and transparent content.
              Our team of copywriters and AI tools create high-quality and
              culturally-adapted content, ensuring accuracy and optimization.
              Shop now to increase brand awareness, improve customer loyalty,
              and boost sales.
            </p>
            <p>&copy; {new Date().getFullYear()} King_moblie </p>
          </div>
          <FooterList>
            <h3 className=" text-base font-bold mb-2 text-white">Follow Us</h3>
            <div className=" flex gap-2">
              <Link href={'#'}>
                <MdFacebook size={30} />
              </Link>
              <Link href={'#'}>
                <FaTwitter size={30} />
              </Link>
              <Link href={'#'}>
                <FaInstagram size={30} />
              </Link>
              <Link href={'#'}>
                <FaLinkedin size={30} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Containers>
    </footer>
  );
};

export default Footer;
