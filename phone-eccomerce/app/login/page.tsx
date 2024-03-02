import Containers from '../components/Containers';
import FormWrap from '../components/FormWrap';
import LoginForm from './LoginForm';
import { getCurrentUser } from '@/actions/getCurrentUser';

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Containers>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Containers>
  );
};

export default Login;
