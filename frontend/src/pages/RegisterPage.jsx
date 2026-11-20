import { RegisterForm } from '../features/auth/components/RegisterForm';

export const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      <header>
        <h1 className="text-center">Đăng kí</h1>
      </header>
      <main className="flex flex-1 justify-center">
        <RegisterForm />
      </main>
      <footer className="">
        <p>
          Trang web được tạo với mục đính thử nghiệm và học tập. Vui lòng không nhập thông tin nhạy
          cảm
        </p>
      </footer>
    </div>
  );
};
