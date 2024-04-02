import SideBar from "@/components/custom/Sidebar";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { LoginContext } from "./contexts/login.context";
import Header from "./components/custom/Header";
import RequestsProvider from "./contexts/requests.context";


const Layout = ({ children }) => {
    const nav = useNavigate();

    const { loginState } = useContext(LoginContext);

    useEffect(() => {
        if ( !loginState ) nav('/login')
    }, [loginState]);

    return (
        (loginState) && (
            <RequestsProvider>
                <div className="grid md:grid-cols-[300px_1fr] h-svh">
                    <div className="border-r">
                        <SideBar />
                    </div>
                    <div className="py-5">
                        <Header />
                        <hr className="my-5" />
                        {children}
                    </div>
                </div>
            </RequestsProvider>
        )
    )
}

export default Layout;