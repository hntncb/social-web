import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./common/Button";

export const PostForm = () => {
    const [postContent, setPostContent] = useState(null);
    const [comment, setComment] = useState([]);
    const [isOpen, setOpen] = useState(null);
    const token = localStorage.getItem("accessToken");

    const currentUserId = localStorage.getItem("current_id");
    
    const { id } = useParams();
    const getPostContent = async() =>{
        const response = await axios.get(`/v1/posts/${id}`);
        setPostContent(response.data.data);
    }
    const getComment = async() =>{
        const response = await axios.get(`/v1/comments/post/${id}`);
        setComment(response.data);
    }
    
    useEffect(()=>{getPostContent();getComment();}, [id]);
    const replycomment = new Map()

    for(const a of comment){
        if(a.parent_id!==null){
            if(!replycomment.has(a.parent_id)){
                replycomment.set(a.parent_id, []);
            }
            replycomment.get(a.parent_id).push(a.id);
        }
    }
    const editContent=async(e)=>{
        e.preventDefault();

        const id = postContent.posts.id;
        const formPost = e.target;
        const title = formPost.elements.title.value;
        const content = formPost.elements.content.value;
        const url = formPost.elements.url.value;

        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(
                `/v1/posts/${id}`,
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
            e.target.reset();
            await getComment();
        } catch (error) {
            console.log(error);
        }    
    }
    const createComment=async(e)=>{
        e.preventDefault();
        
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
    const editComment=async(e, comment_id)=>{
        e.preventDefault();
        
        const content = e.target.elements.editContent.value;
        try {
            const response = await axios.patch(
                `/v1/comments/${comment_id}`,
                {
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
    const [showeditReply, setShowEditReply] = useState(null);

    return(
        <div>
            <main>
                <div className="py-5">Nội dung bài viết
                    {postContent && (
                        <article className="border bg-amber-100">
                            <b>Người đăng: {postContent.author.username}</b>
                            {currentUserId === String(postContent.author.id) && (
                                <button
                                    type="button"
                                    onClick={() => (setOpen(!isOpen))}
                                >
                                    Sửa bài viết
                                </button>
                            )}
                            {isOpen && (
                                <form className="flex flex-col border p-2" onSubmit={editContent}>
                                    <input type="text" name="title" placeholder="Tiêu đề"/>
                                    <input type="text" name="content" placeholder="Nội dung"/>
                                    <input type="text" name="url" placeholder="Link ảnh"/>
                                    <button className='border self-start py-2 px-4'>Sửa</button>
                                </form>
                            )}
                            
                            {postContent.posts.edited_at &&
                                (<p>Chỉnh sửa lúc:{postContent.posts.edited_at}</p>)
                            }
                            {postContent.url &&
                                (<img className="w-auto h-auto border p-5" src={postContent.posts.url}/>)
                            }
                            <p>{postContent.posts.content}</p>
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
                                <p>{item.id}</p>
                                <b>{item.user_name}</b>
                                <p>{item.content}</p>
                                <div className="flex gap-1">
                                    <Button
                                        type="button"
                                        onClick={() => setShowReply(
                                            showReply === item.id ? null : item.id
                                        )}
                                    >
                                        Phản hồi
                                    </Button>
                                    
                                    {currentUserId===item.user_id &&
                                        <Button 
                                            type="button"
                                            onClick={() => setShowEditReply(
                                            showeditReply === item.id ? null : item.id
                                            )}
                                        >
                                            Sửa
                                        </Button>}
                                </div>

                                {comment 
                                    .filter(reply => reply.parent_id === item.id)
                                    .map(reply => (
                                        <article
                                            key={reply.id}
                                            className="ml-8 border-l-2 p-2"
                                        >
                                            <b>{reply.id}</b>
                                            <b>{reply.user_name}</b>
                                            <p>{reply.content}</p>
                                            <div className="flex gap-3">
                                                <Button
                                                    type="button"
                                                    onClick={() => setShowReply(
                                                        showReply === item.id ? null : item.id
                                                    )}
                                                >
                                                    Phản hồi
                                                </Button>
                                                
                                                {currentUserId===item.user_id &&
                                                    <Button 
                                                        type="button"
                                                        onClick={() => setShowEditReply(
                                                            showeditReply === item.id ? null : item.id
                                                        )}
                                                    >
                                                        Sửa
                                                    </Button>}
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
                                {showeditReply === item.id && (
                                    <form onSubmit={(e) => editComment(e, item.id)}>
                                        <input
                                            type="text"
                                            name="editContent"
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