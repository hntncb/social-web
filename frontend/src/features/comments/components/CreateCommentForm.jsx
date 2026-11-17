import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { useState } from "react"
import { useCreatePostComment } from "../hooks/useCreatePostComment";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

export const CreateCommentForm = ({hasNewItem}) => {
    const [] = useState();
    const { handleCreatePostComment } = useCreatePostComment();

    const { PostId } = useParams();

    const createComment = async(e) => {
        e.preventDefault();
        const post_id = PostId;
        const form = e.currentTarget
        const content = form.elements.namedItem("content").value;
        
        if(content.trim() === ''){
            toast.warning("Hãy nhập nội dung");
            return;
        }
        const response = await handleCreatePostComment({post_id, content});
        
        if(response.status === 201){
            toast.success("Đã bình luận");
            hasNewItem();
            form.reset();
        }
    }

    return (
        <main>
            <ToastContainer position="top-right" autoClose={3000}/>
            <Form className="bg-green-200 flex p-2 gap-3" onSubmit={createComment}> 
                <input className="border" type="text" name="content" placeholder="Bình luận"/>
                <Button type="submit" className="w-20 h-6">Gửi</Button>
            </Form>
        </main>
    )
}