import { useEffect, useState } from "react";
import { useGetPostComment } from "../../comments/hooks/useGetPostComment";
import { useParams } from "react-router-dom";
import { CommentItem } from "./CommentItem";
import { CreateCommentForm } from "./CreateCommentForm";

export const CommentForm = () => {
    const [ comment, setComment ] = useState([]);
    const { handleGetPostComment, loading, error } = useGetPostComment();
    const [ listReply, setlistReply ] = useState({});

    const getComment = async() =>{
        const response = await handleGetPostComment(PostId);
        setComment(response);
        const reply = response.reduce((acc, item)=>{
            if(item?.parent_id){
                if(!acc[item.parent_id]){
                    acc[item.parent_id] = [];
                }
                acc[item.parent_id].push(item);
            }
            
            return acc;
        },{});
        setlistReply(reply);
        console.log(reply);
    }

    const renderComment = (item) => {
        return (
            <div key={item.id} className="ml-6 border-l">
                <CommentItem item={item} />

                {listReply[item.id]?.map(reply => (
                    renderComment(reply)
                ))}
            </div>
        );
    };    

    const {PostId} = useParams();
    
    useEffect(()=>{getComment()}, [PostId]);
    
    return (
        <main>
            <div className="flex flex-col items-center w-full gap-3">
                <CreateCommentForm />
                {comment
                    .filter(item => item.parent_id === null)
                    .map((item, index) => (
                        <article 
                        key={item.id || index} 
                        className="border border-b-black flex flex-col bg-red-100 rounded-md p-4 w-full max-w-xl gap-2"
                        >
                            <CommentItem item={item}/>

                            {listReply[item.id]?.map(reply => (
                                renderComment(reply)
                            ))}
                            
                        </article>
                    ))
                }
            </div>
        </main>
    )
}