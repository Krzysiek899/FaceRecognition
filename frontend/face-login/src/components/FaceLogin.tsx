import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './FaceCapture.css'; // Można użyć tych samych styli

const FaceLogin = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState('Ładowanie modeli...');
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models/tiny_face_detector';
        await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
        setStatus('Modele załadowane. Uruchamianie kamery...');
        startCamera();
      } catch (error) {
        console.error('Błąd ładowania modeli:', error);
        setStatus('Błąd ładowania modeli.');
      }
    };

    loadModels();
  }, []);

  const startCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => {
        console.error('Błąd kamery:', error);
        setStatus('Błąd kamery.');
      });
  };

  const handleLogin = async () => {
    if (!videoRef.current) {
      alert('Brak dostępu do kamery.');
      return;
    }

    const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions());

    if (!detection) {
      alert('Nie wykryto twarzy!');
      return;
    }

    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      faceapi.matchDimensions(canvas, { width: canvas.width, height: canvas.height });
      const resized = faceapi.resizeResults(detection, { width: canvas.width, height: canvas.height });
      faceapi.draw.drawDetections(canvas, resized);
    }

    const imageDataUrl = getSnapshot(videoRef.current);

    try {
      const blob = await (await fetch(imageDataUrl)).blob();
      const formData = new FormData();
      formData.append('image', blob, 'face.jpg');

      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setLoggedInUser(data.user_id || 'Nieznany użytkownik');
        alert('Zalogowano jako: ' + data.user_id);
      } else {
        const error = await response.json();
        alert('Błąd logowania: ' + (error.error || 'nieznany'));
      }
    } catch (error) {
      console.error('Błąd podczas wysyłania:', error);
      alert('Błąd logowania.');
    }
  };

  const getSnapshot = (video: HTMLVideoElement): string => {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
    return canvas.toDataURL('image/jpeg');
  };

  return (
    <div className="face-capture-container">
      <h2 className="face-capture-title">Logowanie twarzą</h2>
      <div className="video-wrapper">
        <video ref={videoRef} autoPlay muted playsInline className="face-capture-video" />
        <canvas ref={canvasRef} className="face-capture-canvas" />
      </div>
      <button onClick={handleLogin} className="face-capture-button">
        Zaloguj się
      </button>
      <p className="face-capture-status">{status}</p>
      {loggedInUser && (
        <p className="face-capture-status">Zalogowano jako: {loggedInUser}</p>
      )}
    </div>
  );
};

export default FaceLogin;
