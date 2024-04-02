import { createContext, useState } from "react";

interface ILogin {
    loggedInUser: any;
    role: 'admin' | 'employee' | undefined;
}

export const LoginContext = createContext<ILogin | null>(null);

const LoginProvider = ({ children }) => {

    const [loginState, setLoginState] = useState<ILogin | null>(null)

    return (
        <LoginContext.Provider value={{ loginState, setLoginState }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginProvider;