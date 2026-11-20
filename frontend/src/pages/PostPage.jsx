import { DetailsPostForm } from '@/features/posts/components/DetailsPostForm';

export const PostPage = () => {
  return (
    <div className="bg flex flex-col">
      <main className="flex-1">
        <DetailsPostForm />
      </main>
      <footer>
        <p>
          Trang web được tạo với mục đính thử nghiệm và học tập. Vui lòng không nhập thông tin nhạy
          cảm
        </p>
      </footer>
    </div>
  );
};
