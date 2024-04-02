import UserProfile from "./UserProfile";
import { useLocation } from "react-router-dom";
import NotificationsHub from "./NotificationsHub";
import { useContext } from "react";
import { LoginContext } from "@/contexts/login.context";

const Header = () => {

    const { pathname } = useLocation();
    const { loginState } = useContext(LoginContext);

    return (
        <div className="flex justify-between">
            <h3 className="text-3xl font-bold px-5 capitalize"> 
                { pathname?.replace('/', '') || "Dashboard" } 
            </h3>

            <div className="flex items-center gap-x-5">
                <UserProfile />

                {(loginState.role === 'admin') && <NotificationsHub />}
            </div>
        </div>
    )
}

export default Header;