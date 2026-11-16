import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./common/Button";
import { Form } from "./common/Form";
import { useGetPostContent } from "../hooks/useGetPostContent";

export const PostForm = () => {
    const [postContent, setPostContent] = useState(null);
    const [comment, setComment] = useState([]);
    const [isOpen, setOpen] = useState(null);
    const {handleGetPostContent, loading, error} = useGetPostContent();

    const currentUserId = localStorage.getItem("current_id");
    
    const { id } = useParams();
    const getPostContent = async() =>{
        const response = await handleGetPostContent(id);
        if(response){
            console.log(response);
            setPostContent(response.data);
        }
    }
    const getComment = async() =>{
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
            const updateData = {};
            if(title && title.trim()!== ""){
                updateData.title = title.trim();
            }
            if(content && content.trim()!== ""){
                updateData.content = content.trim();
            }
            if(url && url.trim()!== ""){
                updateData.url = url.trim();
            }
            
            e.target.reset();
            await getPostContent();
        } catch (error) {
            console.log(error);
        }    
    }
    const createComment=async(e)=>{
        e.preventDefault();
        
        const post_id = id;
        const content = e.target.elements.content.value;
        try {
            
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
            
            e.target.reset();
            await getComment();
        } catch (error) {
            console.log(error);
        }    
    }

    const [showReply, setShowReply] = useState(null);
    const [showeditReply, setShowEditReply] = useState(null);

    return(
        <main className="bg-indigo-200 flex flex-col items-center min-h-screen">
            <div className="flex flex-col items-center px-20 w-fit py-5 gap-4">Nội dung bài viết
                {postContent && (
                    <article className="border bg-amber-100 flex flex-col p-5 gap-4">
                        {currentUserId === String(postContent.author.id) && (
                            <Button
                                type="button"
                                onClick={() => (setOpen(!isOpen))}
                                className="w-30 h-5"
                            >
                                Sửa bài viết
                            </Button>
                        )}

                        <b className="text-3xl">{postContent.posts.title}</b>
                        <p>Người đăng: {postContent.author.username}</p>
                        <p>{postContent.posts.content}</p>

                        {postContent.posts.edited_at &&
                            (<p>Chỉnh sửa lúc: {postContent.posts.edited_at}</p>)
                        }
                        
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
            
            <div className="flex flex-col items-center w-full gap-3">
                <form className="bg-green-200 flex flex-col p-2 gap-3 " onSubmit={createComment}>Bình luận 
                    <input className="border" type="text" name="content" placeholder="Nội dung"/>
                    <Button className="w-20 h-6">Gửi</Button>
                </form>
                
                {comment
                    .filter(item => item.parent_id === null)
                    .map((item, index) => (
                        <article key={item.id || index} className="border border-b-black bg-red-100 rounded-md p-4 w-full max-w-xl flex flex-col gap-2">
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
                                                        showeditReply === reply.id ? null : reply.id
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
                                    <Button type="submit">
                                        Gửi
                                    </Button>
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
                                    <Button type="submit">
                                        Gửi
                                    </Button>
                                </form>
                            )}
                        </article>
                    ))
                }
            </div>
        </main>
    );
}