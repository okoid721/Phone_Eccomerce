import Containers from '../components/Containers';
import CartClient from './CartClient';

const Cart = () => {
  return (
    <div className=" pt-8">
      <Containers>
        <CartClient />
      </Containers>
    </div>
  );
};
export default Cart;
