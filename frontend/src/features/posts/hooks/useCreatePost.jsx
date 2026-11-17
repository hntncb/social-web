import { createPost } from "../services/postService";
import { useState } from "react";

export const userCreatePost = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreatePost = async(params) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await createPost(params);
            
            return response.data;
        } catch (error) {
            setError(error.response || 'Tạo bài viết thất bại');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return {
        handleCreatePost, loading, error
    }
}