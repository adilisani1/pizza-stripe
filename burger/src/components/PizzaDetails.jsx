import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchApi } from '../constant/fetchApi';

const PizzaDetails = ({cartItems, setCartItems}) => {
    const [pizzaDetails, setPizzaDetails] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const { name, image, description, price } = pizzaDetails || {};

    useEffect(() => {
        const fetchPizzaDetails = async () => {
            try {
                const pizzaData = await fetchApi(`pizzas/${id}`);
                setPizzaDetails(pizzaData);
            } catch (error) {
                console.log('Error fetching data: ' + error.message);
            }
        };
        fetchPizzaDetails();
    }, [id]);

    const handleCart = () => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            alert('You need to log in first');
            navigate('/login'); 
            return;
        }
        const existingItem = cartItems.find(item => item._id === id);

        let updatedCartItems;

        if (existingItem) {
            updatedCartItems = cartItems.map(item =>
                item._id === id ? { ...item, quantity: item.quantity + 1 } : item
            );
        }

        else {
            updatedCartItems = [
                ...cartItems,
                { _id: id, name, image, price, quantity: 1 }
            ];
        }

        setCartItems(updatedCartItems);
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    };

    if (!pizzaDetails) return <p>Loading...</p>; 

    return (
        <div className='screen-max-width py-20'>
            <div className='md:flex  gap-5 items-center'>
                <img className='w-96' src={`http://localhost:8080${image}`} alt={name} />
                <div>
                    <h2 className='leading-8 pb-2.5 text-3xl font-bold tracking-tight hover:text-red-500'>{name}</h2>
                    <p className='pb-2.5 text-gray-600 leading-10'>{description}</p>
                    <button
                        className='bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-10 rounded'
                        onClick={handleCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PizzaDetails;
