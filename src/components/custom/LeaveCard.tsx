import { ReactNode } from "react";
import { Link } from "react-router-dom";
import './LeaveCard.css';

interface ILeaveCard {
    title: string;
    details: string;
    icon?: ReactNode,
    stat?: number;
    url?: string;
    type?: '' | 'success' | 'danger' | 'info';
}

const LeaveCard = ({ title, details, icon, stat, url, type = '' }: ILeaveCard) => {
    return (
        <Link to={url ?? ''}>
            <div className={`col-span-1 flex justify-between gap-x-5 rounded-lg p-5 border ${type} group hover:bg-black hover:cursor-pointer hover:text-white`}>
                <div className="">
                    <h5 className="text-lg font-bold"> {title} </h5>
                    <p className="text-gray-400"> {details} </p>
                </div>
                <div className="flex items-center me-5 text-2xl font-bold">
                    { icon ?? stat }
                </div>
            </div>
        </Link>
    );
};

export default LeaveCard;