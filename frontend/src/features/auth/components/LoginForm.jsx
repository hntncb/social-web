import { useNavigate } from 'react-router-dom';
import { Button } from '@/shared/components/Button';
import { useLogin } from '../hooks/useLogin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';

export const LoginForm = () => {
  const navigate = useNavigate();

  const { handleLogin, loading, error } = useLogin();

  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        toast.error('Sai tên đăng nhập hoặc mật khẩu!');
      } else {
        toast.error('Đã xảy ra lỗi, vui lòng thử lại!');
      }
    }
  }, [error]);

  const onSubmit = async (e) => {
    {
      e.preventDefault();

      const formLogin = e.target;
      const username = formLogin.elements.username.value;
      const password = formLogin.elements.password.value;
      if (!username.trim() || !password.trim()) {
        toast.warning('Tài khoản hoặc mật khẩu không được để trống');
        return;
      }

      const response = await handleLogin({ username, password });

      if (response) {
        navigate('/listpost/0');

        localStorage.setItem('accessToken', response.data.data.accessToken);
        localStorage.setItem('current_id', response.data.data.user.id);
      }
    }
  };

  const navigateRegister = () => {
    navigate('/register');
  };

  return (
    <main>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="flex flex-col gap-5 bg-emerald-100 p-2">
        <form className="flex flex-col border p-2" onSubmit={onSubmit}>
          <input type="text" name="username" placeholder="Tên đăng nhập" />
          <input type="password" name="password" placeholder="Mật khẩu" />
          <Button type="submit" disabled={loading}>
            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
        </form>
        <Button onClick={() => navigateRegister()} className="">
          hoặc Đăng kí
        </Button>
      </div>
    </main>
  );
};
