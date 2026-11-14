import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const PostForm = () => {
    const [content, setContent] = useState(null);
    const [comment, setComment] = useState([]);
    const currentUserId = localStorage.getItem("current_id");
    
    const { id } = useParams();
    const getContent = async() =>{
        const response = await axios.get(`/v1/posts/${id}`);
        setContent(response.data.data);
    }
    const getComment = async() =>{
        const response = await axios.get(`/v1/comments/post/${id}`);
        setComment(response.data);
    }

    useEffect(()=>{getContent();getComment();}, [id]);
    const replycomment = new Map()

    for(const a of comment){
        if(a.parent_id!==null){
            if(!replycomment.has(a.parent_id)){
                replycomment.set(a.parent_id, []);
            }
            replycomment.get(a.parent_id).push(a.id);
        }
    }
    
    const createComment=async(e)=>{
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        const post_id = id;
        const content = e.target.elements.content.value;
        try {
            const response = await axios.post(
                `/v1/comments`,
                {
                    post_id,
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            e.target.reset();
            await getComment();
        } catch (error) {
            console.log(error);
        }    
    }
    const createReply=async(e, comment_id)=>{
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        const post_id = id;
        const parent_id = comment_id;
        const content = e.target.elements.replyContent.value;
        try {
            const response = await axios.post(
                `/v1/comments`,
                {
                    post_id,
                    parent_id,
                    content
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            e.target.reset();
            await getComment();
        } catch (error) {
            console.log(error);
        }    
    }
    const [showReply, setShowReply] = useState(null);

    return(
        <div>
            <main>
                <div className="py-5">Nội dung bài viết
                    {content && (
                        <article className="border bg-amber-100">
                            <b>Người đăng: {content.author.username}</b>
                            {content.posts.url &&
                                (<p>Chỉnh sửa lúc:{content.edited_at}</p>)
                            }
                            {content.url &&
                                (<img className="w-auto h-auto border p-5" src={content.posts.url}/>)
                            }
                            <p>{content.posts.content}</p>
                        </article>
                    )}
                </div>
                <form className="bg-green-200 flex flex-col p-2 gap-3" onSubmit={createComment}>Bình luận
                    <input type="text" name="content" placeholder="Nội dung"/>
                    <button className="border">Gửi</button>
                </form>
                <div>
                    {comment
                        .filter(item => item.parent_id === null)
                        .map((item, index) => (
                            <article key={item.id || index} className="border p-3">
                                <b>{item.user_name}</b>
                                <p>{item.content}</p>
                                <div className="flex gap-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowReply(
                                            showReply === item.id ? null : item.id
                                        )}
                                    >
                                        Phản hồi
                                    </button>
                                    
                                    {currentUserId===item.user_id &&
                                        <button 
                                            type="button"
                                            onClick={() => console.log("click")}
                                        >
                                            Sửa
                                        </button>}
                                </div>

                                {comment 
                                    .filter(reply => reply.parent_id === item.id)
                                    .map(reply => (
                                        <article
                                            key={reply.id}
                                            className="ml-8 border-l-2 p-2"
                                        >
                                            <b>{reply.user_name}</b>
                                            <p>{reply.content}</p>
                                            <div className="flex gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowReply(
                                                        showReply === item.id ? null : item.id
                                                    )}
                                                >
                                                    Phản hồi
                                                </button>
                                                
                                                {currentUserId===item.user_id &&
                                                    <button 
                                                        type="button"
                                                        onClick={console.log(item.id)}
                                                    >
                                                        Sửa
                                                    </button>}
                                            </div>
                                        </article>
                                    ))
                                }
                                
                                {showReply === item.id && (
                                    <form onSubmit={(e) => createReply(e, item.id)}>
                                        <input
                                            type="text"
                                            name="replyContent"
                                            placeholder="Nội dung"
                                            required
                                        />
                                        <button type="submit" className="border">
                                            Gửi
                                        </button>
                                    </form>
                                )}
                            </article>
                        ))
                    }
                </div>
                
            </main>
        </div>
    );
}