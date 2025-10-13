import NoCourseFound from '../assets/NoImageFound.png';

export const Card = ({
    id,
    title = "Title Not Found",
    desc = "No Description",
    src = NoCourseFound,
    price = "0",
    creatorName = "No User",
}) => {
    return (
        <div
            key={id}
            className="relative card bg-base-100 w-full sm:w-80 md:w-96 shadow-sm hover:shadow-lg transition-shadow rounded-2xl overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-blue-500 to-orange-500"></div>
            <figure>
                <img
                    src={src}
                    alt={title}
                    className="w-full h-48 sm:h-52 md:h-54 object-cover rounded-t-lg"
                    onError={(e) => e.target.src = NoCourseFound}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title flex justify-between items-center text-sm sm:text-base md:text-lg">
                    {title}
                    <span className="badge bg-orange-400 text-white">{`₹${price}`}</span>
                </h2>
                <p className="text-sm sm:text-base">
                    <span className="font-bold">Creator: </span>
                    {creatorName}
                </p>
                <p className="text-sm sm:text-base">{desc}</p>
                <div className="card-actions justify-end mt-2">
                    <button className="btn bg-blue-500 hover:bg-primary-focus transition text-sm sm:text-base w-full sm:w-auto text-white rounded-xl">
                        Know More
                    </button>
                </div>
            </div>
        </div>
    );
};
