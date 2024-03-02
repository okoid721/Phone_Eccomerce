import Containers from '../components/Containers';
import FormWrap from '../components/FormWrap';
import RegisterFrom from './RegisterFrom';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Containers>
      <FormWrap>
        <RegisterFrom currentUser={currentUser} />
      </FormWrap>
    </Containers>
  );
};

export default Register;
