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
  const token = localStorage.getItem("JwtToken");
  if (!token) {
    console.log("token is missing...")
  }
  try {
    const res = await axios.put(updateProfile, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
      withCredentials: true,
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