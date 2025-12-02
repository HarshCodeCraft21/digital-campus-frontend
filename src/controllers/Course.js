import axios from "axios";
import { createCourseAPI, deleteCourseAPI, getCourseAPI } from "../API/api.js";

export const createCourse = async (
  thumbnail,
  title,
  description,
  price,
  category,
  introURL,
  driveLink
) => {
  try {
    const res = await axios.post(
      createCourseAPI,
      { thumbnail, title, description, price, category, introURL, driveLink },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error(
      "Create course error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getCourse = async () => {
  try {
    const res = await axios.get(getCourseAPI, { withCredentials: true });
    return res.data.courses;
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteCourse = async (id) => {
  try {
    const res = await axios.delete(`${deleteCourseAPI}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("JwtToken")}`,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
  }
};
