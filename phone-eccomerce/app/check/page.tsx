import Containers from '../components/Containers';
import FormWrap from '../components/FormWrap';
import FormControl from './FormControl';

const Form = () => {
  return (
    <div className=" p-8">
      <Containers>
        <FormWrap>
          <FromControl />
        </FormWrap>
      </Containers>
    </div>
  );
};

export default Form;
