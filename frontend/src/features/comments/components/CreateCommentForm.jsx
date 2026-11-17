import { Button } from "@/shared/components/Button"
import { Form } from "@/shared/components/Form"
import { useState } from "react"
import { useCreatePostComment } from "../hooks/useCreatePostComment";
import { useParams } from "react-router-dom";

export const CreateCommentForm = () => {
    const [] = useState();
    const { handleCreatePostComment, loading, error } = useCreatePostComment();

    const { PostId } = useParams();

    const createComment = (e) => {
        e.preventDefault();
        const post_id = PostId;
        const content = e.currentTarget.elements.namedItem("content").value;
        console.log({post_id, content});
        handleCreatePostComment({post_id, content});
    }

    return (
        <Form className="bg-green-200 flex p-2 gap-3" onSubmit={createComment}> 
            <input className="border" type="text" name="content" placeholder="Bình luận"/>
            <Button type="submit" className="w-20 h-6">Gửi</Button>
        </Form>
    )
}