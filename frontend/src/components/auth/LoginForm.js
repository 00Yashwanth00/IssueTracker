import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, error: authError, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!email || !password) {
      setFormError('Please fill in all fields');
      return;
    }

    try {
      await login({ email, password });
      navigate('/dashboard');
    } catch (err) {
      // Error is already handled by AuthContext
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      
      {(formError || authError) && (
        <div className="alert error">
          {formError || authError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="primary-button">
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <div className="auth-footer">
        <p>Don't have an account? <a href="/register">Register</a></p>
        <p><a href="/forgot-password">Forgot password?</a></p>
      </div>
    </div>
  );
}

export default LoginForm;