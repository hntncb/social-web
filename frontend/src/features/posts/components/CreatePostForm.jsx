import { useState } from "react";
import { Button } from "@/shared/components/Button";
import { Form } from "@/shared/components/Form";
import { userCreatePost } from "../hooks/useCreatePost";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const CreatePostForm=({onPostCreated})=>{
    const { handleCreatePost } = userCreatePost();
    const [isAddPost, setAddPost] = useState(null);

    const createPost = async(e) =>{
        e.preventDefault();

        const formPost = e.target;
        
        const title = formPost.elements.title.value;
        const content = formPost.elements.content.value;
        const url = formPost.elements.url.value;

        const params = {};

        if(title.trim() === '' || content.trim() === ''){
            toast.warning("Hãy nhập Tiêu đề và Nội dung");
            return;
        }

        if(title && title.trim() !== ''){
            params.title = title;
        }
        if(content && content.trim() === ''){
            params.content = content;
        }
        if(url && url.trim() !== ''){
            try {
                const parsedUrl = new URL(url);
                if(parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"){
                    params.url = url;
                }else{
                    toast.warning("URL thiếu http/https");
                    return;
                }
            } catch (e) {
                toast.warning("URL không hợp lệ hoặc thiếu http/https");
                return;
            }
        }
        
        const response = await handleCreatePost(params);

        if(response.success){
            onPostCreated();
            toast.success("Đăng bài thành công");
            formPost.reset();
        }
    }
    return (
        <main className="bg-amber-200 w-2/3 p-2 gap-2 border">
            <ToastContainer position="top-right" autoClose={3000}/>
            <div > Hãy thêm một bài viết
                <Button onClick={()=>setAddPost(!isAddPost)}>Thêm</Button>
                {isAddPost && (
                    <Form className="flex flex-col p-3 gap-3" onSubmit={createPost}>
                        <input type="text" name="title" placeholder="Tiêu đề"/>
                        <input type="text" name="content" placeholder="Nội dung"/>
                        <input type="text" name="url" placeholder="Link ảnh"/>
                        <Button type="submit" className='self-start py-2 px-5'>Đăng bài</Button>
                    </Form>
                )}
            </div>
        </main>
    )
}