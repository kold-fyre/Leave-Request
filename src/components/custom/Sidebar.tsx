import { CalendarPlus, Circle, LayoutDashboard, LayoutList, Square } from "lucide-react";
import { ReactNode, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import './Sidebar.css';
import { motion } from "framer-motion";
import { LoginContext } from "@/contexts/login.context";

interface ISidebar {
    url: string; 
    link: string; 
    icon: ReactNode;
    canView: string[];
}

const SideBar = () => {

    const nav = useNavigate();
    const { pathname } = useLocation();
    const { loginState } = useContext(LoginContext);

    const links: ISidebar[] = [
        {
            link: 'Dashboard',
            url: '/',
            icon: <LayoutDashboard />,
            canView: ['admin', 'employee']
        },
        {
            link: 'Apply',
            url: '/apply',
            icon: <CalendarPlus />,
            canView: ['employee']
        },
        {
            link: 'Requests',
            url: '/requests',
            icon: <LayoutList />,
            canView: ['admin']
        },
    ];

    const handleLogout = () => {
        // logout logic
        nav('/login');
    }
    
    return (
        <div className="p-4 h-full flex flex-col justify-between">
            <div className="">
                <h2 className="font-bold flex gap-x-2 items-center px-4"> <Square /> Peswa </h2>

                <div className="flex flex-col gap-y-2 mt-10">
                    {
                        links.map(({link, url, icon, canView}, i) => (
                            (canView.includes(loginState.role)) && (
                                <NavLink className={`relative py-2 px-4 rounded-lg flex items-center gap-x-2 border border-transparent hover:border-black/10 cursor-pointer`} to={url} key={i}>
                                    { 
                                        pathname === url && 
                                        <motion.div 
                                            layoutId="active-nav" 
                                            className="absolute rounded-lg bg-black inset-0 w-full h-full" 
                                        ></motion.div>
                                    }

                                    <span className="relative scale-75">
                                        { icon ?? <Circle /> }
                                    </span>
                                    <span className="relative text-sm"> {link} </span>
                                </NavLink>
                            )
                        ))
                    }
                </div>
            </div>
        </div>
    )
}


export default SideBar;