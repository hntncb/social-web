import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"

export const SelfInfomationForm = () => {

    const [getInfo, setInfomation] = useState([]);

    const token = localStorage.getItem("accessToken");
    
    const getInformation = async(id) => {
        const response = await axios.get(`/v1/users/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        setInfomation(response.data.data);
    }

    try {
        const decoded = jwtDecode(token);
        console.log(decoded);
        const id = decoded.sub;
        useEffect(()=>{getInformation(id)}, [id]);
    } catch (error) {
        console.log(error);
    }

    return (
        <div>
            <b>Username: {getInfo.username}</b>
            
            {getInfo.email &&
                <p>Email: {getInfo.email}</p>
                || <p>Email: chưa có</p>
            }
            
            <p>Ngày tham gia: {getInfo.created_at}</p>
        </div>
    )
}