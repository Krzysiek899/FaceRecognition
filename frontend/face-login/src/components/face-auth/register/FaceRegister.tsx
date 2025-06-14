import React, { useState } from 'react';
import { redirect, useLocation } from 'react-router-dom';
import CameraCapture from '../CameraCapture';
import '../authPanels.css';
import type { AuthPayload, RegisterResponse } from '../../../models/models';
import { FaceAuthService } from '../../../services/FaceAuthService';

const FaceRegister: React.FC = () => {

  const [message, setMessage] = useState<string>('');

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get('clientId') || '';
  const userId = queryParams.get('userId') || '';
  const callbackUrl = queryParams.get('callback_url') || '';

  const handleReceiveImage = (faceImage: Blob) => {

    const payload : AuthPayload = {
      client_id: clientId,
      user_id: userId,
      image: faceImage
    }

    FaceAuthService.registerWithImage(payload).then((response: RegisterResponse) => {
      if (response.status == "registered") {
        setMessage("Registration successful!");
        redirect(callbackUrl);
      } else {
        setMessage("Registration unsuccessfull. Try again.")
      }
    })
  }


  return (
    <div className='window-container'>
      <div className="content">
        <h1 className='title'>Face Registration</h1>
        <div className='camera'>
          <CameraCapture onSendImage={handleReceiveImage} ></CameraCapture>
        </div>
        <div className='success-message'>{message}</div>
      </div>
    </div>
  );
};

export default FaceRegister;
