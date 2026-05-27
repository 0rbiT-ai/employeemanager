import {Navigate} from 'react-router-dom';
import { useAuth } from '../context/Authcontext';

export default function ProtectedRoute({ children,requiredRole }) {
  const { token, role } = useAuth();
  if(!token){
    return <Navigate to="/login" replace />;
  }
  if(requiredRole && role !== requiredRole){
    return <Navigate to={role==="ADMIN"?'/admin':'/employee'} replace />;
  }
  return children;
}