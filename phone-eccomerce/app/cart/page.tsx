import Containers from '../components/Containers';
import CartClient from './CartClient';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Cart = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div className="  mt-[30px]  p-4 ">
      <Containers>
        <CartClient currentUser={currentUser} />
      </Containers>
    </div>
  );
};
export default Cart;
