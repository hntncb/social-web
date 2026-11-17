import api from "@/shared/services/api";

export const getPostComment = async(id)=>{
    const response = await api.get(`/v1/comments/post/${id}`);
    return response;
}

export const createPostComment = async(params)=>{
    console.log(params);
    const response = await api.post(
        `/v1/comments`,
        params
    );
    return response;
}

export const editPostComment = async({id, content})=>{
    const response = await api.patch(
        `/v1/comments/${id}`,
        {
            content
        }
    );
    return response;
}