import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Students from './pages/Students';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/students" element={<ProtectedRoute><Students /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to={isAuthenticated ? '/students' : '/login'} replace />} />
    </Routes>
  );
}