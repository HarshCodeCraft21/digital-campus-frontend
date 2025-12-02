import React, { useContext, useEffect, useState } from "react";
import { loadRazorpay } from "../utility/loadRazorpay.js";
import { toast } from "react-toastify";
import { useCourse } from "../context/CourseContext.jsx";
import { UserContext } from "../context/UserContext.js";
const Checkout = ({ courseId }) => {

  const { course, fetchAllCourses } = useCourse();
  const { userValue } = useContext(UserContext);
  const findCourse = course.find(crs => courseId === crs._id);

  const handlePayment = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet!");
      return;
    }
    const orderRes = await fetch("http://localhost:3000/api/enrollment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("JwtToken"),
      },
      body: JSON.stringify({ courseId }),
    });

    const data = await orderRes.json();
    if (!data.success) {
      alert("Failed to create order");
      return;
    }

    const { order, key, course } = data;
    const options = {
      key: key,
      amount: order.amount,
      currency: "INR",
      name: "Digital Campus",
      description: course.title || "Course Purchase",
      image: "/logo.png",
      order_id: order.id,

      handler: async function (response) {
        const verifyRes = await fetch("http://localhost:3000/api/enrollment/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("JwtToken"),
          },
          body: JSON.stringify({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            courseId,
          }),
        });

        const verifyData = await verifyRes.json();

        if (verifyData.success) {
          toast.success("you successfully enroll in")
          fetchAllCourses();
        } else {
          alert("Payment Verification Failed!");
        }
      },

      prefill: {
        name: "User Name",
        email: "user@gmail.com",
      },

      theme: {
        color: "#0d6efd",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  const [isEnroll, setIsEnroll] = useState(false);
  useEffect(() => {
    if (findCourse && findCourse.enrollments && userValue?._id && findCourse.enrollments.includes(userValue._id)) {
      setIsEnroll(true);
    } else {
      setIsEnroll(false);
    }
  }, [findCourse, userValue]);
  return (
    <button
      onClick={handlePayment}
      style={{
        backgroundColor: isEnroll ? "gray" : "#0d6efd",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: isEnroll ? "not-allowed" : "pointer",
        opacity: isEnroll ? 0.7 : 1
      }}
      disabled={isEnroll || userValue.role === "teacher"} // teacher cannot buy
    >
      {
        userValue.role === "teacher"
          ? "Admin Not Allowed"
          : isEnroll
            ? "Thanks for Joining"
            : "Enroll Now"
      }
    </button>

  );
};

export default Checkout;
