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

export const ProfileUpdate = async (formData) => {
  try {
    // ✅ Important: don't set Content-Type manually
    const res = await axios.put(updateProfile, formData, {
      withCredentials: true, // include cookies if your API uses auth sessions
    });

    if (!res?.data?.user) {
      throw new Error("Invalid response from server");
    }

    return res.data.user; // return the user object directly
  } catch (error) {
    console.error("Profile Update Failed:", error);
    throw error; // rethrow so React can handle the toast properly
  }
};