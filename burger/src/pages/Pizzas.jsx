import React, { useEffect, useState } from "react";
import { fetchApi } from "../constant/fetchApi";
import { useNavigate } from "react-router-dom";

const Pizzas = () => {
    const [pizzas, setPizzas] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchApi("pizzas");
                if (data && data.length > 0) {
                    setPizzas(data);
                } else {
                    setError("No Pizzas found.");
                }
            } catch (error) {
                setError("Error fetching data: " + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, []);

    const handlePizzaClick = (id) => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            alert("You need to log in first to see the pizza details.");
            navigate("/login");
            return;
        }
        navigate(`/${id}`); 
    };

    return (
        <div>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pizzas.map((pizza) => (
                    <div
                        key={pizza._id}
                        className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center cursor-pointer"
                        onClick={() => handlePizzaClick(pizza._id)} // Check login before navigation
                    >
                        <img
                            src={`http://localhost:8080/${pizza.image}`}
                            alt={pizza.name}
                            className="w-40 h-40 object-cover rounded-lg"
                        />
                        <h2 className="text-lg font-bold">{pizza.name}</h2>
                        <p className="text-gray-600">Price: {pizza.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pizzas;
