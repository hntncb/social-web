import { ListPostForm } from '../features/posts/components/ListPostForm';

export const ListPostPage = () => {
  return (
      <div className="">
        <header>
          Danh sách bài viết
        </header>
        <main className="flex-1 py-2">
          <ListPostForm />
        </main>
        <footer className=''>
            <p>Trang web được tạo với mục đính thử nghiệm và học tập. Vui lòng không nhập thông tin nhạy cảm</p>
        </footer>
      </div>
  );
};