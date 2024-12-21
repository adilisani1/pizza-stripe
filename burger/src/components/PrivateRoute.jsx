import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const currentUser = localStorage.getItem('access_token'); 

    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
