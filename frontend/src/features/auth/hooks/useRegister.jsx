import { useState } from "react"
import { register } from "../services/authService";

export const useRegister = () => {
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const handleRegister = async(data) => {
        try {
            setLoading(false);
            setError(null);
            const response = await register(data.username, data.password);
            return response;
        } catch (error) {
            setError(error);
            throw error;
        } finally {
            setLoading(false);
        }
        
    } 
    return {
        handleRegister,
        loading,
        error
    }
}