import { createCommentReply } from "../services/postService";
import { useState } from "react";

export const useCreateCommentReply = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleCreateCommentReply = async(params) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await createCommentReply(params);
            
            return response.data;
        } catch (error) {
            setError(error.response || 'Tạo bài viết thất bại');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return {
        handleCreateCommentReply, loading, error
    }
}