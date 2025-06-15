import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CameraCapture from '../CameraCapture';
import '../authPanels.css';
import type { AuthPayload, RegisterResponse } from '../../../models/models';
import { FaceAuthService } from '../../../services/FaceAuthService';

const FaceRegister: React.FC = () => {

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

    FaceAuthService.registerWithImage(payload).then((response: RegisterResponse) => {
      if (response.status == "registered") {
        setMessage("Registration successful!");
        window.location.href = callbackUrl;
      } else {
        setMessage("Error: " + response.error);
      }
    })
  }


  return (
    <div className='window-container'>
      <div className="content">
        <h1 className='title'>Face Registration: {userName}</h1>
        <div className='camera'>
          <CameraCapture onSendImage={handleReceiveImage} ></CameraCapture>
        </div>
        <div className='success-message'>{message}</div>
      </div>
    </div>
  );
};

export default FaceRegister;
