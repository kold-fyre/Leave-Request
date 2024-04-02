import { RequestsContext } from "@/contexts/requests.context";
import { IRequest } from "@/models/interfaces";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const RQs = 'PESWA_Requests';

const useRequests = () => {
    const [requests, setRequests] = useState<IRequest[]>(JSON.parse(localStorage.getItem(RQs) || '[]'));
    const { requestsCount, setRequestsCount, lessThan3DaysCount, setLessThan3DaysCount } = useContext(RequestsContext);

    useEffect(() => {
        autoApprove();
        if (!requests.length) {
            setRequests(leaveRequests);
            localStorage.setItem(RQs, JSON.stringify(leaveRequests));
        }
    }, [])

    useEffect(() => {
        setRequestsCount(requests.filter((r: IRequest) => (!r.isApproved && !r.isRejected)).length);
        setLessThan3DaysCount(requests.filter((r: IRequest) => (!r.isApproved && !r.isRejected && (checkDaysBefore(r.leaveDate) <= 3))).length)
    }, [requests]);

    const updateRequests = () => {
        setRequests(JSON.parse(localStorage.getItem(RQs)!))
        setRequestsCount(requests.filter((r: IRequest) => (!r.isApproved && !r.isRejected)).length);
    }

    const autoApprove = () => {
        const _requests = [...requests];
        _requests.forEach(r => {
            if ( checkDaysBefore(r.leaveDate) <= 3 ) r.isApproved = true;
        })
        setRequests(_requests);
    }

    const submitRequest = (request: IRequest) => {
        const _requests = localStorage.getItem(RQs);

        // check if leave request exists
        if ( _requests ) {
            const index = JSON.parse(_requests).findIndex((r: IRequest) => r.employee.id === request.employee.id);
            console.log(index)
            if (index >= 0) toast('Error: You have already applied')
            else {
                const data = JSON.parse(_requests)
                data.push(request)
                localStorage.setItem(RQs, JSON.stringify(data))
            }
        }
        else localStorage.setItem(RQs, JSON.stringify([request]))
        
        updateRequests();
    }

    const rejectRequest = (id: number) => {
        const updatedRequests = requests.map((request: IRequest) => {
            if (request.employee.id === id)return { ...request, isRejected: true };
            return request;
        });
        localStorage.setItem(RQs, JSON.stringify(updatedRequests));
        updateRequests();
    }

    const approveRequest = (id: number) => {
        const updatedRequests = requests.map((request: IRequest) => {
            if (request.employee.id === id) return { ...request, isApproved: true };
            return request;
        });
        localStorage.setItem(RQs, JSON.stringify(updatedRequests));
        updateRequests();
    }


    const checkDaysBefore = (expirationDateString: string): number => {
        const givenDate = new Date();
        const expirationDate = new Date(expirationDateString);
        const differenceInMilliseconds = expirationDate.getTime() - givenDate.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24) as number;
        return differenceInDays;
    }

    return {
        requests,
        requestsCount,
        lessThan3DaysCount,
        autoApprove,
        submitRequest,
        rejectRequest,
        approveRequest,
        checkDaysBefore,
    }
}

const leaveRequests: IRequest[] = [
    {   
        employee: {
            id: 0,
            name: "John Doe",
            age: 35,
            gender: "m"
        },
        leaveDate: "2024-04-10",
        returnDate: "2024-04-25",
        reason: "Family vacation",
        isApproved: false,
        isRejected: false,
    },
    {   
        employee: {
            id: 1,
            name: "Jane Smith",
            age: 28,
            gender: "f"
        },
        leaveDate: "2024-04-09",
        returnDate: "2024-04-16",
        reason: "Personal appointment",
        isApproved: false,
        isRejected: false,
    },
    {   
        employee: {
            id: 2,
            name: "Michael Johnson",
            age: 42,
            gender: "m"
        },
        leaveDate: "2024-04-24",
        returnDate: "2024-04-29",
        reason: "Attending a conference",
        isApproved: false,
        isRejected: false,
    },
    {   
        employee: {
            id: 3,
            name: "Emily Brown",
            age: 30,
            gender: "f"
        },
        leaveDate: "2024-04-07",
        returnDate: "2024-04-09",
        reason: "Sick leave",
        isApproved: false,
        isRejected: false,
    },
    {   
        employee: {
            id: 4,
            name: "Robert Wilson",
            age: 45,
            gender: "m"
        },
        leaveDate: "2024-04-09",
        returnDate: "2024-04-16",
        reason: "Visiting family",
        isApproved: false,
        isRejected: false,
    }
];

export default useRequests;