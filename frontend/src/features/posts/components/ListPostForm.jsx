import { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { Button } from "@/shared/components/Button";
import { useGetPost } from "../hooks/useGetPost";
import { CreatePostForm } from "./CreatePostForm";

export const ListPostForm=()=>{
    const navigate = useNavigate();

    const {handleGetPost, loading, error} = useGetPost();

    const [posts, setPosts] = useState([]);
    const [PostCount, setPostCount] = useState(null);
    const [ hasChange, setHasChange] = useState(0);
    const { currentPage } = useParams();

    const page = Number(currentPage) || 0;

    const handleHasChange = () => {
        setHasChange(prev => !prev);
    }

    const getPost = async(limit=10, page=0) => {
        const offset = (10*page)
        const params = {
            limit, offset
        }
        const listPost = await handleGetPost(params);

        if(listPost){
            setPosts(listPost.data.posts);
            setPostCount(listPost.data.count||0);
        }
    }
    useEffect(() => {
        getPost();
    }, [hasChange]);
    useEffect(() => {
        getPost(10, page);
    }, [page]);

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
        <div className="bg-blue-100">
            <main className="flex flex-col items-center min-h-screen ">
                <CreatePostForm onPostCreated={handleHasChange}/> 
                <div className="w-2/3 py-4">
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
                <div className="border flex flex-row items-center justify-center p-2 gap-2">
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