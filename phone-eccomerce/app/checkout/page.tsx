import Containers from '../components/Containers';
import FormWrap from '../components/FormWrap';
import CheckoutClient from './CheckoutClient';

const Checkout = () => {
  return (
    <div className=" p-8">
      <Containers>
        <FormWrap>
          <CheckoutClient />
        </FormWrap>
      </Containers>
    </div>
  );
};

export default Checkout;
