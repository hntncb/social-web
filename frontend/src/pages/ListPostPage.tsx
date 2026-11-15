import { ListPostForm } from '../features/todos/components/ListPostForm';

export const ListPostPage = () => {
  return (
      <div className="">
        <header>
          Bài viết
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