import Link from 'next/link';
import Containers from '../Containers';
import { Redressed } from 'next/font/google';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import { getCurrentUser } from '@/actions/getCurrentUser';

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] });

const NavBar = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div
      className="
    sticky top-0 w-full bg-[#ffff] z-30 shadow-smooth
     text-[#66666]"
    >
      <div className=" p-4 border-b-[1px] ">
        <Containers>
          <div
            className="
                flex items-center justify-between gap-3 md:gap-0
            "
          >
            <Link
              href="/"
              className={`${redressed.className} font-bold text-2xl `}
            >
              Kings Mobile
            </Link>
            <div className=" hidden md:block">Search</div>
            <div className=" flex items-center gap-8 md:gap-12">
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Containers>
      </div>
    </div>
  );
};

export default NavBar;
