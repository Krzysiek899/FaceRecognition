import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CameraCapture from '../CameraCapture';
import '../authPanels.css';

const FaceRegister: React.FC = () => {

  const [message, setMessage] = useState<string>('');

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const clientId = queryParams.get('clientId') || '';
  const userId = queryParams.get('userId') || '';
  const callbackUrl = queryParams.get('callback_url') || '';

  return (
    <div className='window-container'>
      <div className="content">
        <h1 className='title'>Face Registration</h1>
        <div className='camera'>
          <CameraCapture></CameraCapture>
        </div>
        <div className='success-message'>{message}</div>
      </div>
    </div>
  );
};

export default FaceRegister;
