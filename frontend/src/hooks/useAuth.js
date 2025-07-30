import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slice/authSlice';

export default function useAuth() {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    token,
    logout: handleLogout,
    isAuthenticated: !!token
  };
}