import LeaveCard from "@/components/custom/LeaveCard";
import { LoginContext } from "@/contexts/login.context";
import useRequests from "@/hooks/useRequests";
import { CalendarPlus } from "lucide-react";
import { useContext } from "react";

const Dashboard = () => {

    const { requestsCount } = useRequests();
    const { loginState } = useContext(LoginContext);

    const cards = [
        {
            title: "Leaves requests",
            details: "View all leave requests from employees",
            stat: requestsCount,
            url: '/requests',
            canView: 'admin'
        },
        {
            title: "Apply for a leave →",
            details: "Apply for a leave in Pesewa",
            icon: <CalendarPlus />,
            url: '/apply',
            canView: 'employee'
        },
    ];


    return (
        <div className="p-5">
            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5">
                { 
                    cards.map(
                        (c, i) => (
                            (loginState.role === c.canView) &&
                            <LeaveCard 
                                key={i} 
                                title={c.title} 
                                details={c.details} 
                                icon={c.icon} 
                                stat={c.stat} 
                                url={c.url}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard;