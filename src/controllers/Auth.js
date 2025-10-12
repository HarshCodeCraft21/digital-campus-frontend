import axios from "axios";
import { loginAPI, registerAPI } from "../API/api.js";
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