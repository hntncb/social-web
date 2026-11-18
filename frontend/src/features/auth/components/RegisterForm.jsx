import { useNavigate } from 'react-router-dom';
import {Button} from '@/shared/components/Button';
import { useRegister } from '../hooks/useRegister';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const {handleRegister, loading, error} = useRegister();

  const onSubmit = async(e)=>{
    e.preventDefault();
    
    const formRegister = e.target;
    const username = formRegister.elements.username.value;
    const password = formRegister.elements.password.value;

    if(!username.trim() || !password.trim()){
      toast.warning("tài khoản hoặc mật khẩu không được để trống");
      return;
    }
    
    try {
      const response = await handleRegister({username, password});
      if(response.status === 201){
        toast.success("Tạo tài khoản thành công, hãy chuyển sang Đăng nhập");
        formRegister.reset();
      }
    } catch (error) {
      if (error.response?.status === 409) {
          toast.error("Tài khoản đã tồn tại");
      } else {
          toast.error("Có lỗi xảy ra");
      } 
    }
  }
  const navigateLogin = () => {
    navigate('/login');
  }
  return(
    <main>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className='flex flex-col bg-emerald-100 p-2 gap-5'>
        <form className='flex flex-col p-2 border' onSubmit={onSubmit} method='POST'>
          <input type="text" name='username' placeholder='Tên đăng nhập'/>
          <input type="password" name='password' placeholder='Mật khẩu'/>
          <Button type='submit' disabled={loading}>
            Đăng kí
          </Button>
        </form>
        <Button onClick={()=>navigateLogin()} className=''>quay lại Đăng nhập</Button>
      </div>
    </main>
  );
};