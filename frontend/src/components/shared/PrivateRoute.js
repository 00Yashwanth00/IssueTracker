import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function PrivateRoute({ children, roles=[] }) {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
      return <div className="loading-screen">Loading...</div>;
    }

    if(!user) {
        <Navigate to="/login" state={{ from: location }} replace />
    }

    if(roles.length > 0 && roles.includes(user.role)) {
        <Navigate to="/" replace/>
    }

    return children;
};

export default PrivateRoute;