import { Button } from "@/shared/components/Button"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCreatePostComment } from "../hooks/useCreatePostComment";
import { useEditPostComment } from "../hooks/useEditPostComment";

export const CommentItem = ({item, hasNewItem }) => {
    const [ onShow, setOnShow ]  = useState(null);
    const { handleCreatePostComment, loading, error } = useCreatePostComment();
    const { handleEditPostComment } = useEditPostComment();
    
    const { PostId } = useParams();

    const Reply = (e, id) => {
        e.preventDefault();
        const parent_id = id;
        const content = e.currentTarget.elements.namedItem("reply").value;
        const post_id = PostId;

        const response = handleCreatePostComment({post_id, parent_id, content});
        console.log("hasNewItem:", hasNewItem);
        console.log("Type:", typeof hasNewItem);
        if(response){
            hasNewItem();
            e.currentTarget.reset();
        }
    }

    const EditComment = (e, id) => {
        e.preventDefault();
        const content = e.currentTarget.elements.namedItem("edit").value;

        const response = handleEditPostComment({id, content});
        if(response){
            hasNewItem();
            e.currentTarget.reset();
        }
    }

    return (
        <div className="gap-2">
            <div className="grid grid-cols-2 border border-b-black p-2">
                <b>{item.user_name}</b>
                <p className="flex justify-end">{item.created_at}</p>
                <p>{item.content}</p>
            </div>
            <div className="flex gap-3 p2">
                <Button className="bg-auto" onClick={()=>setOnShow("reply")}>Phản hồi</Button>
                { localStorage.getItem("current_id") === item.user_id && 
                    <Button className="bg-auto" onClick={()=>setOnShow("edit")}>Sửa</Button>
                }
            </div>
            
            {onShow !== null && (
                <form onSubmit={(e)=>{
                    if(onShow === "reply"){
                        Reply(e, item.id)
                    }
                    if(onShow === "edit"){
                        EditComment(e, item.id)
                    }
                    }}>
                    <input className="bg-amber-50" type="text" name={onShow} placeholder={onShow==="reply"?"Nội dung phản hồi":"Nội dung chỉnh sửa"} />
                    <Button type="submit" disabled={loading}>Gửi</Button>
                </form>
            )}
        </div>
    )
}