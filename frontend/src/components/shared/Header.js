import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Header () {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    return (
        <header className="app-header">
            <div className="header-container">
            <Link to="/" className="logo">
                <h1>Issue Tracker</h1>
            </Link>

            <nav className="main-nav">
                <ul>
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/issues">All Issues</Link></li>
                    <li><Link to="/issues/new">Create Issue</Link></li>
                </ul>
            </nav>

            <div className='user-actions'>
                {user ? ( 
                    <div className="user-dropdown">
                        <span className="user-greeting">
                            Hi {user.username} ({user.role})
                        </span>
                        <button onClick={handleLogout} className='logout-button'>Logout</button>
                    </div>
                ) : (
                    <Link to="/login" className="login-button">Login</Link>
                )}
            </div>
            </div>
        </header>
    );
};

export default Header;