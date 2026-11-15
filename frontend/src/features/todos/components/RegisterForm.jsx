import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button} from '../components/common/Button'

export const RegisterForm = () => {
  const navigate = useNavigate();

  const handleRegister=async(e)=>{
    e.preventDefault();

    const formRegister = e.target;
    const username = formRegister.elements.username.value;
    const password = formRegister.elements.password.value;
    try {
      await axios.post('/v1/auth/register', {username, password});
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }
  const navigateLogin = () => {
    navigate('/login');
  }
  return(
    <main>
      <div className='flex bg-emerald-100 p-2 gap-5'>
        <form className='flex flex-col p-2 border' onSubmit={handleRegister}>
          <input type="text" name='username' placeholder='Tên đăng nhập'/>
          <input type="password" name='password' placeholder='Mật khẩu'/>
          <Button type='submit'>
            Đăng kí
          </Button>
          <button onClick={()=>navigateLogin()}>quay lại Đăng nhập</button>
        </form>
      </div>
    </main>
  );
};