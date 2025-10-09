import axios from "axios";
import { resetPassword, sendOTP, verifyOTP } from "../API/api.js";

export const ForgetPasswordController = async (email) => {
    try {
        const res = await axios.post(sendOTP, { email }, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log("failed to send otp:", error.message);
    }
};

export const verifyOTPController = async (email, otp) => {
    try {
        const res = await axios.post(verifyOTP, { email, otp }, {
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        console.log("failed to verify otp: ", error.message);
    }
};

export const resetPasswordController = async (email, newPassword) => {
    try {
        const res = await axios.post(resetPassword, { email, newPassword }, {
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log("falied to reset password: ", error.message);
    }
}