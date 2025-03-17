import  { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    
    // Optionally clear user role or other data
    localStorage.removeItem('role');
    
    // Redirect to login page
    navigate('/login');
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h2 className="text-2xl font-bold">Logging out...</h2>
    </div>
  );
};

export default Logout;
