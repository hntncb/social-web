import { useState } from "react";
import { Button } from "./common/Button";
import { Form } from "./common/Form";
import { userCreatePost } from "../hooks/useCreatePost";

export const CreatePostForm=({onPostCreated})=>{
    const {handleCreatePost, loading, error} = userCreatePost();
    const [isAddPost, setAddPost] = useState(null);

    const createPost = async(e) =>{
        e.preventDefault();

        const formPost = e.target;
        const title = formPost.elements.title.value;
        const content = formPost.elements.content.value;
        const url = formPost.elements.url.value;
        await handleCreatePost({title, content, url});
        onPostCreated();
        formPost.reset();
    }
    return (
        <div className="bg-amber-200 w-2/3 p-2 gap-2 border"> Hãy thêm một bài viết
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
    )
}