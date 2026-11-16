import api from "./api";

export const getPost = async({limit, offset}) =>{
    const list = await api.get(`/v1/posts/pages?limit=${limit}&offset=${offset}`);
    return list;
}

export const createPost = async({title, content, url}) =>{
    const response = await api.post(
        `/v1/posts`,
        {
            title,
            content,
            url
        }
    );
    return response;
}

export const getPostContent = async(id) =>{
    const response = await api.get(`/v1/posts/${id}`);
    return response;
}

export const getPostComment = async(id)=>{
    const response = await api.get(`/v1/comments/post/${id}`);
    return response;
}

export const editPostContent = async(data)=>{
    const response = await api.patch(
        `/v1/posts/${id}`,
        data
    );
    return response;
}

export const createPostComment = async({post_id, content})=>{
    const response = await api.post(
        `/v1/comments`,
        {
            post_id, 
            content
        }
    );
    return response;
}

export const editPostComment = async({comment_id, content})=>{
    const response = await api.patch(
        `/v1/comments/${comment_id}`,
        {
            content
        }
    );
    return response;
}

export const createCommentReply = async({post_id, parent_id, content})=>{
    const response = await api.post(
        `/v1/comments`,
        {
            post_id,
            parent_id,
            content
        }
    );
    return response;
}