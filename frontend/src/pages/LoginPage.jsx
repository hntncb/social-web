import { LoginForm } from '../features/todos/components/LoginForm';
import { RegisterForm } from '../features/todos/components/RegisterForm';

export const HomePage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-emerald-50'>
      <header>
        <h1 className="text-center">
          Đăng kí/Đăng nhập
        </h1>
      </header>
      <main className="flex-1 flex justify-center">
        <LoginForm />
        <RegisterForm />
      </main>
      <footer className=''>
        <p>Trang web được tạo với mục đính thử nghiệm và học tập. Vui lòng không nhập thông tin nhạy cảm</p>
      </footer>
    </div>
  );
};