// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// const OrderStatusPage = () => {
//     const { orderId } = useParams(); 
//     const [status, setStatus] = useState("pending");

//     const fetchOrderStatus = async () => {
//         try {
//             const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//                 },
//             });
//             const data = await response.json();
//             setStatus(data.status);
//         } catch (error) {
//             console.error("Error fetching order status:", error);
//         }
//     };

//     useEffect(() => {
//         const interval = setInterval(fetchOrderStatus, 5000); 
//         fetchOrderStatus(); 
//         return () => clearInterval(interval); 
//     }, [orderId]);

//     return (
//         <div className="flex flex-col items-center justify-center h-screen">
//             <h1 className="text-3xl font-bold mb-5">Order Status</h1>
//             <p className="text-xl">
//                 Order ID: <strong>{orderId}</strong>
//             </p>
//             <p className="text-2xl mt-4">
//                 Status: <strong>{status}</strong>
//             </p>
//         </div>
//     );
// };

// export default OrderStatusPage;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const OrderStatusPage = () => {
    const { orderId } = useParams();
    const [status, setStatus] = useState("pending");

    const steps = ["Pending", "Preparing", "Out for Delivery", "Delivered"];

    const fetchOrderStatus = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            });
            const data = await response.json();
            setStatus(data.status);
        } catch (error) {
            console.error("Error fetching order status:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchOrderStatus, 5000); 
        fetchOrderStatus();
        return () => clearInterval(interval); 
    }, [orderId]);

    const currentStep = steps.indexOf(status.charAt(0).toUpperCase() + status.slice(1));

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold mb-5">Order Status</h1>
            <p className="text-xl mb-5">
                Order ID: <strong>{orderId}</strong>
            </p>
            <div className="flex items-center justify-center w-full max-w-2xl gap-6">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-white ${index === currentStep && step === "Delivered"
                                    ? "bg-green-500"
                                    : index <= currentStep
                                        ? "bg-red-500"
                                        : "bg-gray-300"
                                }`}
                        >
                            {index + 1}
                        </div>

                        <p className={`mt-2 text-sm ${index <= currentStep ? "text-black" : "text-gray-500"}`}>
                            {step}
                        </p>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderStatusPage;
