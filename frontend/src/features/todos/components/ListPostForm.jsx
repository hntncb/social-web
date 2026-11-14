import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Button } from "./common/Button";

export const ListPostForm=()=>{
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    const [PostCount, setPostCount] = useState(null);
    const { currentPage } = useParams();

    const page = Number(currentPage) || 0;

    const getPost = async(limit=10, page=0) => {
        try {
            const offset = (10*page)
            const list = await axios.get(`/v1/posts/pages?limit=${limit}&offset=${offset}`);
            
            setPosts(list.data.data.posts);
            setPostCount(list.data.count||0);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPost(10, page);
    }, [page]);

    const post = async(e) =>{
        e.preventDefault();

        const formPost = e.target;
        const title = formPost.elements.title.value;
        const content = formPost.elements.content.value;
        const url = formPost.elements.url.value;
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `/v1/posts`,
                {
                    title,
                    content,
                    url
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            await getPost();
            formPost.reset();
        } catch (error) {
            console.log(error);
        }
    }

    const firstPage = () => {
        navigate("/listpost/0");
    };
    const previousPage=()=>{
        navigate(`/listpost/${page - 1}`);
    }
    const nextPage=()=>{
        navigate(`/listpost/${page + 1}`);
    }
    const lastPage=()=>{
        const numberOfPage = Math.trunc(PostCount/10); 
        navigate(`/listpost/${numberOfPage}`);
    }
    const formatDate = (date) => {
        return new Date(date).toLocaleString("vi-VN", {
            timeZone: "Asia/Ho_Chi_Minh",
            dateStyle: "short",
            timeStyle: "short"
        });
    };
    return(
        <div>
            <main>
                <div className="bg-amber-200 w-1/2"> Hãy thêm một bài viết
                    <form className="flex flex-col border p-2" onSubmit={post}>
                        <input type="text" name="title" placeholder="Tiêu đề"/>
                        <input type="text" name="content" placeholder="Nội dung"/>
                        <input type="text" name="url" placeholder="Link ảnh"/>
                        <button className='border self-start py-2 px-5'>Đăng bài</button>
                    </form>
                </div>
                <div className=" py-4 ">
                    {posts.map((post) => (
                    <article key={post.id} className="bg-amber-100 border p-2">
                        <b className="text-blue-500" onClick={()=>navigate(`/post/${post.id}`)}>{post.title}</b>
                        <h1>Người đăng: {post.username}</h1>
                        <h2>Đăng vào lúc: {formatDate(post.created_at)}</h2>
                    </article>
                ))}
                </div>
            </main>
            <footer>
                <div className="border flex p-1 gap-2">
                    <Button onClick={firstPage}>Trang đầu</Button>
                    {page > 0 && (
                    <Button onClick={previousPage}>Trang trước</Button>
                    )}
                    {PostCount > 10 && (
                    <Button onClick={nextPage}>Trang sau</Button>
                    )}
                    <Button onClick={lastPage}>Trang cuối</Button>
                </div>
            </footer>
        </div>
    );
}