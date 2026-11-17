import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import {Button} from '@/shared/components/Button'
import { Form } from "@/shared/components/Form";

export const SelfInfomationForm = () => {

    const [getInfo, setInfomation] = useState([]);
    const [changeInfo, setChangeInfo] = useState([]);
    const [onClick, setOnClick] = useState(null);

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
        const id = decoded.sub;
        useEffect(()=>{getInformation(id)}, [id]);
    } catch (error) {
        console.log(error);
    }

    const updateInfomation = async(e) => {
        e.preventDefault();

        const editField = e.target;
        const email = editField.elements.email?.value;
        const passworld = editField.elements.passworld?.value;
        const decoded = jwtDecode(token);
        const id = decoded.sub;

        const response = await axios.patch(`/v1/users/${id}`,
            {
                email,
                passworld
            },
            {
                headers: 
                {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );
        getInformation(id);
    }

    return (
        <div className="bg-emerald-200 h-screen">
            <main className="border grid w-1/2 p-20 gap-2">
                <b>Username: {getInfo.username}</b>
            
                {getInfo.email ? (
                    <p>Email: {getInfo.email}</p>
                ) : (<p>Email: chưa có</p>)
                }

                <p>Ngày tham gia: {getInfo.created_at}</p>
            </main>
            <footer>
                <Button onClick={() => setOnClick(!onClick)}>Cập nhật thông tin</Button>

                {onClick &&
                    <Form onSubmit={updateInfomation}>
                        <input type="text" name="email" placeholder="Email"/>
                        <input type="text" name="password" placeholder="Password"/>
                        <Button type="submit">Cập nhật</Button>
                    </Form>
                }
            </footer>
        </div>
    )
}