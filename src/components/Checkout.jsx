import React, { useContext, useEffect, useState } from "react";
import { loadRazorpay } from "../utility/loadRazorpay.js";
import { toast } from "react-toastify";
import { useCourse } from "../context/CourseContext.jsx";
import { UserContext } from "../context/UserContext.js";

const Checkout = ({ courseId }) => {

  const { course, fetchAllCourses } = useCourse();
  const { userValue } = useContext(UserContext);

  const [isEnroll, setIsEnroll] = useState(false);
  const [loading, setLoading] = useState(false); 

  const findCourse = course.find(crs => courseId === crs._id);

  useEffect(() => {
    if (
      findCourse &&
      findCourse.enrollments &&
      userValue?._id &&
      findCourse.enrollments.includes(userValue._id)
    ) {
      setIsEnroll(true);
    } else {
      setIsEnroll(false);
    }
  }, [findCourse, userValue]);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const res = await loadRazorpay();
      if (!res) {
        toast.error("Failed to load payment gateway!");
        setLoading(false);
        return;
      }

      const orderRes = await fetch(
        "https://digital-campus-backend-oce3.onrender.com/api/enrollment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("JwtToken"),
          },
          body: JSON.stringify({ courseId }),
        }
      );

      const data = await orderRes.json();
      if (!data.success) {
        toast.error("Failed to create order");
        setLoading(false);
        return;
      }

      const { order, key, course } = data;

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Digital Campus",
        description: course.title || "Course Purchase",
        image: "/logo.png",
        order_id: order.id,

        handler: async (response) => {
          const verifyRes = await fetch(
            "https://digital-campus-backend-oce3.onrender.com/api/enrollment/verify-payment",
            {
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
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            toast.success("You successfully enrolled!");
            fetchAllCourses();
          } else {
            toast.error("Payment verification failed!");
          }
          setLoading(false);
        },

        theme: { color: "#0d6efd" },
      };

      new window.Razorpay(options).open();

    } catch (error) {
      toast.error("Payment failed!");
      console.error(error);
      setLoading(false);
    }
  };

  // ✔ Conditions
  const isTeacher = userValue?.role === "teacher";
  const disabled = isEnroll || isTeacher || loading;

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "gray" : "#0d6efd",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.7 : 1,
        alignItems: "center",
        gap: "8px",
      }}
    >
      {loading ? (
        <>
          <span className="spinner"></span> Processing...
        </>
      ) : isTeacher ? (
        "Admin Not Allowed"
      ) : isEnroll ? (
        "Thanks for Joining"
      ) : (
        "Enroll Now"
      )}
    </button>
  );
};

export default Checkout;
