import { createContext, useState } from "react";

export const RequestsContext = createContext<any>(null);

const RequestsProvider = ({ children }) => {

    const [requestsCount, setRequestsCount] = useState<number>(0)
    const [lessThan3DaysCount, setLessThan3DaysCount] = useState<number>(0)

    return (
        <RequestsContext.Provider value={{ 
            requestsCount, 
            setRequestsCount, 
            lessThan3DaysCount, 
            setLessThan3DaysCount 
        }}>
            {children}
        </RequestsContext.Provider>
    )
}

export default RequestsProvider;