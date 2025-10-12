import axios from "axios";
import { loginAPI, registerAPI, updateProfile } from "../API/api.js";
export const Register = async (user) => {
    try {
        const res = await axios.post(registerAPI, user, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        });
        return res.data;
    } catch (error) {
        console.log('Register Failed: ', error.message);
    }
}

export const LoginController = async (user) => {
    try {
        const res = await axios.post(loginAPI, user, {
            withCredentials: true
        })
        return res.data;
    } catch (error) {
        console.log('Register Failed: ', error.message);
    }
}

export const ProfileUpdate = async (user) => {
    try {
        const res = await axios.put(updateProfile, user, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            withCredentials: true
        });
        return res.data.user;
    } catch (error) {
        console.log('Profile Update Failed: ', error.message);
    }
}