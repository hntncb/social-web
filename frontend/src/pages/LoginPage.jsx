import { LoginForm } from '../features/auth/components/LoginForm';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-emerald-50">
      <header>
        <h1 className="text-center">Đăng nhập</h1>
      </header>
      <main className="flex flex-1 justify-center">
        <LoginForm />
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
