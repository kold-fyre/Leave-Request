import { BellIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Badge } from "../ui/badge"
import useRequests from "@/hooks/useRequests"
import { Link } from "react-router-dom"
import { Button } from "../ui/button"
import { useContext } from "react"
import { RequestsContext } from "@/contexts/requests.context"

const NotificationsHub = () => {

    const { lessThan3DaysCount } = useContext(RequestsContext);

    const {
        requests,
        checkDaysBefore,
    } = useRequests();
    
    return (
        <div className="me-3">
            <Popover>
                <PopoverTrigger>
                    <div className="flex items-center">
                    <BellIcon className="me-1" />
                        <Badge variant={lessThan3DaysCount ? 'destructive' : 'outline'}> {lessThan3DaysCount } </Badge>
                    </div>
                </PopoverTrigger>

                <PopoverContent className="mt-7 max-h-[350px] overflow-auto">
                <ul className="">
                        <li className="text-sm text-slate-400 mb-2"> ({lessThan3DaysCount}) Urgent Requests </li>
                    { 
                        requests.map((r, i) => 
                            (checkDaysBefore(r.leaveDate) <= 3) && ( !r.isApproved && !r.isRejected ) &&
                                <li className="py-3 border-b last:border-none" key={i}> 
                                    <Link to={"/requests"}>
                                        <div className="">
                                            <b>{r.employee.name}'s</b> leave request has <b className="text-red-500"> 
                                            {Math.floor(checkDaysBefore(r.leaveDate))} days </b> 
                                        </div>
                                    </Link>
                                </li>
                        )
                    }

                    <Link to={'/requests'}>
                        <Button variant={'ghost'} className="w-full mt-4"> View All </Button>
                    </Link>
                </ul>
                </PopoverContent>
            </Popover>
        </div>
  )
}

export default NotificationsHub