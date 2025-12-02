import { useNavigate } from 'react-router-dom';
import { useCourse } from '../context/CourseContext'
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'
export const Card = () => {
    const { course } = useCourse();
    const { userValue } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <>
            {
                course ? (
                    course.map(crs => (
                        <div
                            key={crs._id}
                            className="relative card bg-base-100 w-full sm:w-80 md:w-96 shadow-sm hover:shadow-lg transition-shadow rounded-2xl overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 to-orange-500"></div>
                            <figure>
                                <img
                                    src={crs.thumbnail}
                                    alt={crs.title}
                                    className="w-full h-48 sm:h-52 md:h-54 object-cover rounded-t-lg"
                                    onError={(e) => e.target.src = NoCourseFound}
                                />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title flex justify-between items-center text-sm sm:text-base md:text-lg">
                                    {crs.title}
                                    <span className="badge bg-orange-400 text-white">{`₹${crs.price}`}</span>
                                </h2>
                                <p className="text-sm sm:text-base">
                                    <span className="font-bold">Creator: {userValue.fullName}</span>
                                </p>
                                <p className="text-sm sm:text-base">{crs.description}</p>
                                <div className="card-actions justify-end mt-2">
                                    <button className="btn bg-blue-500 hover:bg-primary-focus transition text-sm sm:text-base w-full sm:w-auto text-white rounded-xl" onClick={() => navigate(`/course/${crs._id}`)}>
                                        Know More
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No Course Available</p>
                )
            }
        </>
    );
};