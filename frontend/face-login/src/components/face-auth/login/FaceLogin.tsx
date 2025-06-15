import React, { useState } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import CameraCapture from '../CameraCapture';
import '../authPanels.css';
import type { AuthPayload, LoginResponse } from '../../../models/models';
import { FaceAuthService } from '../../../services/FaceAuthService';
import AuthForm from '../AuthForm';

const FaceLogin: React.FC = () => {

  const [message, setMessage] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [formCompleted, setFormCompleted] = useState<boolean>(false); 

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get('clientId') || '';
  //const userName = queryParams.get('userName') || '';
  const callbackUrl = queryParams.get('callbackUrl') || '';

  const handleReceiveImage = async (imageUrl: string) => {

    const faceImage = await (await fetch(imageUrl)).blob();

    const payload : AuthPayload = {
      client_id: clientId,
      user_name: userName,
      image: faceImage
    }

    FaceAuthService.loginWithImage(payload).then((response: LoginResponse) => {
        setMessage("Login successful!");

        const code = response.code;
        const redirectUrl = new URL(callbackUrl);
        redirectUrl.searchParams.set('code', code);
        redirectUrl.searchParams.set('status', "success");
        
        setTimeout(() => {
            window.location.href = redirectUrl.toString();
        }, 2000);
      
    }).catch((error) => {
        setMessage("Error: " + error.message);
        const redirectUrl = new URL(callbackUrl);
        redirectUrl.searchParams.set('status', "fail");
        setTimeout(() => {   
            window.location.href = redirectUrl.toString();
        }, 2000);
       
    })
  }

  const handleFormCompletion = (data: { name: string; email: string }) => {
    setUserName(data.name);
    setFormCompleted(true);
  }


  return (
    <div className='window-container'>
      <div className="content">
        <h1 className='title'>Face Login: {userName}</h1>
        {!formCompleted ? (
          <AuthForm onComplete={handleFormCompletion}  />
        ) : (
        <div className='camera'>
          <CameraCapture onSendImage={handleReceiveImage}></CameraCapture>
        </div>
        )}
        <div className='success-message'>{message}</div>
      </div>
    </div>
  );
};

export default FaceLogin;
