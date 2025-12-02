import { createContext, useContext, useState } from "react";
import { getCourse } from "../controllers/Course";

export const CourseContext = createContext();

export const useCourse = () => {
    const context = useContext(CourseContext);
    if (!context) {
        throw new Error("useCourse must be used inside a CourseContextProvider");
    }
    return context;
};

const CourseContextProvider = ({ children }) => {
    const [course, setCourse] = useState(
        JSON.parse(localStorage.getItem("courses")) || []
    );
    const fetchAllCourses = async () => {
        try {
            const res = await getCourse();
            localStorage.setItem("courses", JSON.stringify(res));
            setCourse(res);

        } catch (error) {
            console.error("Failed to fetch courses:", error.message);
        }
    };

    return (
        <CourseContext.Provider value={{ course, setCourse, fetchAllCourses }}>
            {children}
        </CourseContext.Provider>
    );
};

export default CourseContextProvider;
