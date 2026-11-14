import { PostForm } from "../features/todos/components/ContentPostForm";

export const PostPage = () => {
    return (
        <div className="flex bg flex-col">
            <main className="flex-1">
                <PostForm />
            </main>
            <footer className=''>
                <p>Trang web được tạo với mục đính thử nghiệm và học tập. Vui lòng không nhập thông tin nhạy cảm</p>
            </footer>
        </div>
    );
}