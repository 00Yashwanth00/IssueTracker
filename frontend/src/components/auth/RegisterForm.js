import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const[formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'developer'
    });
    const[formError, setFormError] = useState('');
    const { register, error: authError, loading } = useAuth();
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError('');
        if(formData.password !== formData.confirmPassword) {
            setFormError('Passwords do not match');
            return;
        }

        try {
            await register({
              username: formData.username,
              email: formData.email,
              password: formData.password,
              role: formData.role
            });
            navigate('/dashboard');
        } catch (err) {
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="auth-form-container">
          <h2>Create Account</h2>
          
          {(formError || authError) && (
            <div className="alert error">
              {formError || authError}
            </div>
          )}
    
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
                required
              />
            </div>
    
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
    
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={loading}
                  required
                />
              </div>
            </div>
    
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="developer">Developer</option>
                <option value="qa">QA</option>
                <option value="admin">Admin</option>
              </select>
            </div>
    
            <button type="submit" disabled={loading} className="primary-button">
              {loading ? 'Registering...' : 'Create Account'}
            </button>
          </form>
    
          <div className="auth-footer">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>
        </div>
      );
}

export default RegisterForm;