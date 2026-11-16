import { useState } from "react"
import { getPostContent } from "../services/postService";

export const useGetPostContent = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGetPostContent = async(id) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await getPostContent(id);
            
            return response.data;
        } catch (error) {
            setError(error.response || 'Lấy bài viết thất bại');
            throw error;
        } finally {
            setLoading(false);
        }
    }
    return {
        handleGetPostContent, loading, error
    }
}