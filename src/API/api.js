// const URL = "https://digital-campus-3nsa.onrender.com";
const URL = "https://digital-campus-backend-oce3.onrender.com";
// const URL = "http://localhost:3000"

export const registerAPI = `${URL}/api/users/register`;
export const loginAPI = `${URL}/api/users/login`;
export const sendOTP = `${URL}/api/users/sendOtpForReset`;
export const verifyOTP = `${URL}/api/users/verifyOtp`;
export const resetPassword = `${URL}/api/users/reset-password`;
export const updateProfile = `${URL}/api/users/userUpdate`;
export const getUserDetails = `${URL}/api/users/user-details`;

export const createCourseAPI = `${URL}/api/course/create-course`;
export const getCourseAPI = `${URL}/api/course/courses`;
export const deleteCourseAPI = `${URL}/api/course/delete-course`;
