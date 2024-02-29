import Containers from '../components/Containers';
import CartClient from './CartClient';

const Cart = () => {
  return (
    <div className="  mt-[30px]  p-4 ">
      <Containers>
        <CartClient />
      </Containers>
    </div>
  );
};
export default Cart;
