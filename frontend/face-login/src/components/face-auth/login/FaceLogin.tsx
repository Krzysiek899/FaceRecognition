import React, { useState } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import CameraCapture from '../CameraCapture';
import '../authPanels.css';
import type { AuthPayload, LoginResponse } from '../../../models/models';
import { FaceAuthService } from '../../../services/FaceAuthService';

const FaceLogin: React.FC = () => {

  const [message, setMessage] = useState<string>('');

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get('clientId') || '';
  const userName = queryParams.get('userName') || '';
  const callbackUrl = queryParams.get('callback_url') || '';

  const handleReceiveImage = async (imageUrl: string) => {

    const faceImage = await (await fetch(imageUrl)).blob();

    const payload : AuthPayload = {
      client_id: clientId,
      user_name: userName,
      image: faceImage
    }

    FaceAuthService.loginWithImage(payload).then((response: LoginResponse) => {
      if (response.status == "success") {
        setMessage("Login successful!");

        const code = response.code;
        const redirectUrl = new URL(callbackUrl);
        redirectUrl.searchParams.set('code', code);

        window.location.href = redirectUrl.toString();
      } else {
        setMessage("Login unsuccessfull. Try again.")
      }
    })
  }

  return (
    <div className='window-container'>
      <div className="content">
        <h1 className='title'>Face Login: {userName}</h1>
        <div className='camera'>
          <CameraCapture onSendImage={handleReceiveImage}></CameraCapture>
        </div>
        <div className='success-message'>{message}</div>
      </div>
    </div>
  );
};

export default FaceLogin;
