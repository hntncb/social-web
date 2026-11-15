import { RegisterForm } from '../features/todos/components/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className='min-h-screen flex flex-col bg-emerald-50'>
      <header>
        <h1 className="text-center">
          Đăng kí
        </h1>
      </header>
      <main className="flex-1 flex justify-center">
        <RegisterForm />
      </main>
      <footer className=''>
        <p>Trang web được tạo với mục đính thử nghiệm và học tập. Vui lòng không nhập thông tin nhạy cảm</p>
      </footer>
    </div>
  );
};