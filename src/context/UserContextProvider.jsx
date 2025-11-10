import { useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [userValue, setUserValue] = useState(() => {
        const data = localStorage.getItem("userData");
        return data ? JSON.parse(data) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() =>
        Boolean(localStorage.getItem("JwtToken"))
    );

    return (
        <UserContext.Provider
            value={{ userValue, setUserValue, isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
