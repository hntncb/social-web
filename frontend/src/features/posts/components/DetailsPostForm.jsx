import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from '@/shared/components/Button';
import { Form } from "@/shared/components/Form";
import { useGetPostContent } from "../hooks/useGetPostContent";
import { useEditPostContent } from "../hooks/useEditPostContent";
import { CommentForm } from "../../comments/components/CommentForm";
import { toast, ToastContainer } from "react-toastify";

export const DetailsPostForm = () => {
    const [isOpen, setOpen] = useState(null);
    const [postContent, setPostContent] = useState(null);
    const {handleGetPostContent} = useGetPostContent();
    const {handleEditPostContent} = useEditPostContent();

    const currentUserId = localStorage.getItem("current_id");
    
    const { PostId } = useParams();

    const getPostContent = async() =>{
        const response = await handleGetPostContent(PostId);
        if(response){ 
            setPostContent(response.data);
        }
    }

    useEffect(()=>{getPostContent()}, [PostId]);

    const editContent=async(e)=>{
        e.preventDefault();

        const id = postContent.posts.id;
        const formPost = e.target;
        const title = formPost.elements.title.value;
        const content = formPost.elements.content.value;
        const url = formPost.elements.url.value;

        const updateData = {};

        if((title.trim() === "" && content.trim() === "" && url.trim() === "")){
            toast.warning("Nhập nội dung cần thay đổi");
            return;
        }

        if(title && title.trim()!== ""){
            updateData.title = title.trim();
        }
        if(content && content.trim()!== ""){
            updateData.content = content.trim();
        }
        if(url && url.trim()!== ""){
            try {
                const parsedUrl = new URL(url);
                if(parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:"){
                    updateData.url = url.trim();
                }else{
                    toast.warning("URL thiếu http/https");
                    return;
                }
            } catch (e) {
                toast.warning("URL không hợp lệ hoặc thiếu http/https");
                return;
            }
        }
        const response = await handleEditPostContent({id, updateData});
        if(response){
            e.target.reset();
            await getPostContent();
        }
    }

    return(
        <div>
            <ToastContainer position="top-right" autoClose={3000}/>
            <main className="bg-indigo-200 flex flex-col items-center min-h-screen">
                <div className="flex flex-col items-center px-20 w-fit py-5 gap-4">Nội dung bài viết
                    {(postContent && currentUserId === String(postContent.author.id)) && (
                        <Button
                            type="button"
                            onClick={() => (setOpen(!isOpen))}
                            className="w-30 h-5"
                        >
                            Sửa bài viết
                        </Button>
                    )}

                    {postContent && (
                        <article className="border bg-amber-100 flex flex-col p-5 gap-4">
                            <b className="text-3xl">{postContent.posts.title}</b>
                            <p>Người đăng: {postContent.author.username}</p>
                            {postContent.posts.edited_at &&
                                (<p className="text-sm">Chỉnh sửa lúc: {postContent.posts.edited_at}</p>)
                            }
                            <p>{postContent.posts.content}</p>
                            
                            {isOpen && (
                                <Form className="border" onSubmit={editContent}>
                                    <input type="text" name="title" placeholder="Tiêu đề"/>
                                    <input type="text" name="content" placeholder="Nội dung"/>
                                    <input type="text" name="url" placeholder="Link ảnh"/>
                                    <Button className='self-start py-2 px-4' type="submit">Sửa</Button>
                                </Form>
                            )}
                            
                            {postContent.posts.url &&
                                (<img className="w-auto h-auto border p-5" src={postContent.posts.url}/>)
                            }
                        </article>
                    )}
                </div>
                <div>
                    <CommentForm/>
                </div>
            </main>
        </div>
    );
}