import { createPostComment } from "../services/postService";
import { useState } from "react";

export const useCreatePostComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreatePostComment = async(params) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await createPostComment(params);
            
            return response.data;
        } catch (error) {
            setError(error.response || 'Tạo bài viết thất bại');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return {
        handleCreatePostComment, loading, error
    }
}