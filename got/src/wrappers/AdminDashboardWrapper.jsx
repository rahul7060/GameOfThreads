import { Outlet, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar";

const AdminDashboardWrapper = () => {

    const user = useLoaderData();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
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

export default AdminDashboardWrapper;