import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button'
import { useLogin } from '../hooks/useLogin';

export const LoginForm = () => {
  const navigate = useNavigate();

  const { handleLogin, loading, error } = useLogin();

  const onSubmit  = async (e) => {
    e.preventDefault();

    const formLogin = e.target;
    const username = formLogin.elements.username.value;
    const password = formLogin.elements.password.value;
    try {
      const response = await handleLogin({username, password});
      const accessToken = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('current_id', response.data.user.id);
      navigate('/listpost/0');
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.log(error);
      }
    }
  };

  const navigateRegister = () => {
    navigate('/register');
  }

  return(
    <main>
      <div className='flex bg-emerald-100 p-2 gap-5'>
        <form className='flex flex-col p-2 border' onSubmit={onSubmit}>
          <input type="text" name='username' placeholder='Tên đăng nhập'/>
          <input type="password" name='password' placeholder='Mật khẩu'/>
          <Button type='submit' disabled={loading}>
            Đăng nhập
          </Button>
        </form>
        <Button onClick={()=>navigateRegister()}>hoặc Đăng kí</Button>
      </div>
    </main>
  );
};