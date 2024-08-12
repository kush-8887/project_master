import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cross from '../../assets/imgs/login/remove.png';
import Tick from '../../assets/imgs/login/accept.png';

/* 
        THIS CODE WORKS , 
        THE SERVER RETURNS 200 BUT 400 IS ALSO RETURNED
        EMAIL GETS VERFIED BUT ERROR PAGE IS RENDERED
*/


export default function Success() {
  const { token } = useParams();
  const [statusCode, setStatusCode] = useState(null);

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(`http://localhost:8000/verify/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.status);
        
        setStatusCode(response.status);
      } catch (error) {
        console.error('Error verifying email:', error);
        setStatusCode(500); // Set to 500 if there's an error
      }
    };

    verify();
  }, [token]); // The effect depends on the `token` parameter

  return (
    <div>
      {statusCode === 200 ? (
        <div className="bg-b-grey h-[100vh] flex flex-col items-center justify-center"> 
          <img src={Tick} alt="" className="h-[200px]" />
          <h1 className="text-white text-2xl mt-7">Email verified successfully!</h1>
          <a href="/login" className="text-white text-md mt-3 font-bold transition-colors hover:text-selected-purple">
            Click here to Login.
          </a>
        </div>
      ) : (
        <div className="bg-b-grey h-[100vh] flex flex-col items-center justify-center"> 
          <img src={Cross} alt="" className="h-[200px]" />
          <h1 className="text-white text-2xl mt-7">Error verifying account.</h1>
          <a href="/register" className="text-white text-md mt-3 font-bold transition-colors hover:text-selected-purple">
            Click here to signup again.
          </a>
        </div>
      )}
    </div>
  );
}
