import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [statusCode , setStatusCode] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch('http://localhost:8000/verify', {
          method: 'GET',
          credentials: 'include',
        });

        setStatusCode(response.status) //for some reason this works because of this lol;
      
        if (response.status === 200) {
          setAuthenticated(true);
        } else {
          throw new Error('Token is not valid');
        }
      } catch (err) {
        navigate('/login'); // Redirect to login page if token is invalid
      }
    };

    verifyToken();
  }, [navigate]);

  return { authenticated  , statusCode};
};

export default useAuth;
