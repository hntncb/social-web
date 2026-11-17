import { Outlet } from "react-router-dom";
import { Button } from "../shared/components/Button";
import { useNavigate } from "react-router-dom";

export const NavLayout = () => {
    const navigate = useNavigate();
    const LogOut = () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("current_id");
        navigate('/login');
    }
    const SelfInfomation = () => {
        navigate('/me');
    }
    const HomePage = () => {
        navigate('/listpost/0');
    }
    return (
        <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 flex gap-4 p-5 bg-mist-600 border">
                <Button onClick={()=>{HomePage()}}>Trang chủ</Button>
                {window.location.pathname !== '/me' && (
                    <Button onClick={()=>{SelfInfomation()}}>Tôi</Button>
                )}
                <Button onClick={()=>{LogOut()}}>Đăng xuất</Button>
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}