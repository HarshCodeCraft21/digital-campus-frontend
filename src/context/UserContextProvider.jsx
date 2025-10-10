import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [userValue, setUserValue] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("JwtToken");
        setIsAuthenticated(!!token);
    }, []);

    return (
        <UserContext.Provider
            value={{ userValue, setUserValue, isAuthenticated, setIsAuthenticated }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
