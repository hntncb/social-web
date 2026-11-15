import { Outlet } from "react-router-dom";
import { Button } from "../features/todos/components/common/Button";
import { useNavigate } from "react-router-dom";

export const LogOutLayOut = () => {
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("current_id");
        navigate('/login');
    }
    const SelfInfomation = () => {
        navigate('/me');
    }
    return (
        <header className="p-5">
            {window.location.pathname !== '/me' && (
                <Button onClick={()=>{SelfInfomation()}}>Tôi</Button>
            )}
            <Button onClick={()=>{LogOut()}}>Đăng xuất</Button>
            <Outlet />
        </header>
    )
}