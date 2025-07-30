import { BrowserRouter, Routes, Route } from 'react-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { IssueProvider } from './context/IssueContext';
import { CommentProvider } from './context/CommentContext';
import { AttachmentProvider } from './context/AttachmentContext';
import Dashboard from './pages/Dashboard';
import UserProfile from './pages/UserProfile';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <IssueProvider>
        <CommentProvider>
          <AttachmentProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
        </BrowserRouter>
          </AttachmentProvider>
        </CommentProvider>
        </IssueProvider>
    </AuthProvider>
  )
}

export default App;
