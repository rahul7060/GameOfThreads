import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const UserDashboard = () => {

    const user = useLoaderData();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return (
        <>
            <Navbar
                user={user}
            />
            <div className="container mx-auto p-4 mt-4">
                <Outlet />
            </div>
        </>
    )
}

export default UserDashboard;