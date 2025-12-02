import React, { memo, useEffect } from "react";
import { Card } from "../components/Card";
import { getCourse } from "../controllers/Course";

const Course = () => {
    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                await getCourse();
            } catch (error) {
                console.error("something went wrong to fetch data", error.message);
            }
        }
        fetchAllCourses();
    }, [])
    return (
        <main className="min-h-screen bg-base-200 flex flex-col">
            {/* ✅ Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-orange-400 py-16 px-4 text-center text-white">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
                    Explore Courses
                </h1>
                <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
                    Discover the perfect course for you
                </p>
            </section>

            {/* ✅ Courses Section */}
            <section className="flex-1 p-4 md:p-8 lg:p-10">
                <div
                    className="
      max-w-7xl mx-auto
      grid gap-6
      sm:grid-cols-2
      lg:grid-cols-3
    "
                >
                    <Card />
                </div>
            </section>

        </main>
    );
};

// ✅ memo() prevents unnecessary re-renders if parent updates
export default memo(Course);
