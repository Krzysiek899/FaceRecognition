import React, { use, useEffect, useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ClipLoader } from "react-spinners";
import "./AuthCallback.css";
import { FiCheckCircle } from 'react-icons/fi';

const AuthCallbackHandler: React.FC = () => {

  const clientId = "c2472f78-4b55-41c0-a948-141c4e1a767e";
  const secret = "drNeoJBl6XTY47ZI_Ep03InY5GOqFSoCVNi5UJucIXM";
  const loginServerUrl = "http://localhost:8000/api/public/authorization/";

  const [status, setStatus] = useState<string>('Processing...');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const status = urlParams.get('status');

    if (status === "fail"){
        setStatus("Something went wrong! Try again.");
        setTimeout(() => {
            navigate('/login');
        }, 2000);
        return;
    }

    if (!code) {
      setStatus('Registration completed');
      setIsLoading(false);
      setTimeout(() => {
            navigate('/login');
        }, 2000);
      return;
    }

    const exchangeCodeForToken = async () => {
      try {
        const response = await axios.post(loginServerUrl + "get-token/", {
          code,
          clientId: clientId,
          clientSecret: secret,
        });

        const { access_token, user_name } = response.data;

        localStorage.setItem('access_token', access_token);
        setIsLoading(false);
        setStatus('You were logged in as ' + user_name);
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
      } catch (error) {
        console.error('Token exchange failed:', error);
        setStatus('Token exchange failed.');
      }
    };

    exchangeCodeForToken();
  }, [navigate]);

  return (
    <div className='loading-wrapper'>
      {isLoading ? (
        <ClipLoader color="#ffffff" size={100} />
      ) : (
        <FiCheckCircle color="#2cfc03" className="success-icon" size={100}/>
      )}
      <p>{status}</p>
    </div>
  );
};

export default AuthCallbackHandler;
