export const Spinner = ({ size = "md", color = "primary" }) => {
    const sizeClass = size === "sm" ? "w-6 h-6" : size === "lg" ? "w-12 h-12" : "w-8 h-8";
    return (
        <div className="flex items-center justify-center">
            <div
                className={`animate-spin rounded-full border-4 border-t-${color}-500 border-b-${color}-500 border-gray-200 ${sizeClass}`}
            ></div>
        </div>
    );
}
