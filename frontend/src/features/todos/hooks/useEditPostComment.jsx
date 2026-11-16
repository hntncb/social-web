import { editPostComment } from "../services/postService";
import { useState } from "react";

export const useEditPostComment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleEditPostComment = async(params) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await editPostComment(params);
            
            return response.data;
        } catch (error) {
            setError(error.response || 'Tạo bài viết thất bại');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return {
        handleEditPostComment, loading, error
    }
}