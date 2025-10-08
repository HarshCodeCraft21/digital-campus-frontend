import { useState } from "react";
import { UserContext } from "./UserContext";

const UserContextProvider = ({ children }) => {
    const [uservalue, setUserValue] = useState();
    return (
        <UserContext.Provider value={{ uservalue, setUserValue }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContextProvider;