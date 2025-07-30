import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function ProtectedRoute({ children }) {
    const { user, loading, refreshAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if(!loading && !user) {
            // Store attempted location to redirect after login
            navigate('/login', {
                state: { from: location },
                replace: true
            });
        }
    }, [user, loading, navigate, location]);

    useEffect(() => {
        // Refresh auth state on route change
        refreshAuth();
      }, [location, refreshAuth]);

    if (loading || !user) {
    return <div className="loading-screen">Loading...</div>;
    }

    return children;
};

export default ProtectedRoute;