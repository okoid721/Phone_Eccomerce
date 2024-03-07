import Containers from '@/app/components/Containers';
import FormWrap from '@/app/components/FormWrap';
import AddProductForm from './AddProductForm';
import { getCurrentUser } from '@/actions/getCurrentUser';
import NullData from '@/app/components/NullData';

const AddProduct = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <NullData title="Opps access not allowed" />;
  }
  return (
    <div className=" p-8">
      <Containers>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Containers>
    </div>
  );
};

export default AddProduct;
