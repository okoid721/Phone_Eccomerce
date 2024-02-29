import Containers from '../components/Containers';
import CartClient from './CartClient';

const Cart = () => {
  return (
    <div className=" bg-white  mx-auto mt-[30px] w-[90%] p-4 ">
      <Containers>
        <CartClient />
      </Containers>
    </div>
  );
};
export default Cart;
