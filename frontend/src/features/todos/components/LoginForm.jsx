import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button} from '../components/common/Button'

export const LoginForm = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formLogin = e.target;
    const username = formLogin.elements.username.value;
    const password = formLogin.elements.password.value;
    try {
      const response = await axios.post('/v1/auth/login', {username, password});
      const accessToken = response.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('current_id', response.data.data.user.id);
      navigate('/listpost/0');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log(error);
      }
    }
  };

  return(
    <main>
      <div className='flex bg-emerald-100 p-2 gap-5'>
        <form className='flex flex-col p-2 border' onSubmit={handleLogin}>
          <input type="text" name='username' placeholder='Tên đăng nhập'/>
          <input type="password" name='password' placeholder='Mật khẩu'/>
          <Button type='submit'>
            Đăng nhập
          </Button>
        </form>
      </div>
    </main>
  );
};