import { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import { getUserDetails } from "../API/api.js";
import axios from "axios";

const UserContextProvider = ({ children }) => {
    const [userValue, setUserValue] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("JwtToken");
        setIsAuthenticated(!!token);

        if (!token) return; // early exit if no token

        const fetchUserDetails = async () => {
            try {
                const response = await axios.get(getUserDetails, {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                });
                setUserValue(response.data.userData);
            } catch (error) {
                console.error("Error fetching user details:", error);
                setIsAuthenticated(false);
                setUserValue(null);
            }
        };

        fetchUserDetails();
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
