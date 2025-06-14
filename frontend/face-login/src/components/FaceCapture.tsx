// import React, { useEffect, useRef, useState } from 'react';
// import * as faceapi from 'face-api.js';
// import './FaceCapture.css'; // Import pliku CSS

// const FaceCapture = () => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   const [status, setStatus] = useState('Loading models...');
//   const [userId, setUserId] = useState('');

//   useEffect(() => {
//     const loadModels = async () => {
//       try {
//         const MODEL_URL = '/models/tiny_face_detector';
//         await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//         setStatus('Models loaded. Starting camera...');
//         startCamera();
//       } catch (error) {
//         console.error('Error loading models:', error);
//         setStatus('Error loading models.');
//       }
//     };

//     loadModels();
//   }, []);

//   const startCamera = () => {
//     navigator.mediaDevices.getUserMedia({ video: true })
//       .then(stream => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch(error => {
//         console.error('Camera error:', error);
//         setStatus('Camera error.');
//       });
//   };

//   const handleCapture = async () => {
//     if (!videoRef.current) {
//       alert('Brak dostępu do kamery.');
//       return;
//     }

//     const detection = await faceapi.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions());

//     if (!detection) {
//       alert('Brak twarzy!');
//       return;
//     }

//     if (canvasRef.current && videoRef.current) {
//       const canvas = canvasRef.current;
//       const video = videoRef.current;
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       faceapi.matchDimensions(canvas, { width: canvas.width, height: canvas.height });
//       const resized = faceapi.resizeResults(detection, { width: canvas.width, height: canvas.height });
//       faceapi.draw.drawDetections(canvas, resized);
//     }

//     const imageDataUrl = getSnapshot(videoRef.current);

//     try {
//       const blob = await (await fetch(imageDataUrl)).blob();
//       const formData = new FormData();
//       formData.append('image', blob, 'face.jpg');
//       formData.append('user_id', userId);

//       const response = await fetch('http://127.0.0.1:8000/api/register/', {
//         method: 'POST',
//         body: formData,
//       });

//       if (response.ok) {
//         alert('Zarejestrowano!');
//       } else {
//         const error = await response.json();
//         alert('Błąd: ' + (error.error || 'nieznany'));
//       }
//     } catch (error) {
//       console.error('Błąd wysyłania:', error);
//       alert('Błąd wysyłania danych.');
//     }
//   };

//   const getSnapshot = (video: HTMLVideoElement): string => {
//     const canvas = document.createElement('canvas');
//     canvas.width = video.videoWidth;
//     canvas.height = video.videoHeight;
//     const ctx = canvas.getContext('2d');
//     if (ctx) {
//       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
//     }
//     return canvas.toDataURL('image/jpeg');
//   };

//   return (
//     <div className="face-capture-container">
//       <h2 className="face-capture-title">Rejestracja twarzy</h2>
//       <input
//         type="text"
//         value={userId}
//         onChange={(e) => setUserId(e.target.value)}
//         placeholder="Wprowadź user_id"
//         className="face-capture-input"
//       />
//       <div className="video-wrapper">
//         <video ref={videoRef} autoPlay muted playsInline className="face-capture-video" />
//         <canvas ref={canvasRef} className="face-capture-canvas" />
//       </div>
//       <button onClick={handleCapture} className="face-capture-button">
//         Zarejestruj twarz
//       </button>
//       <p className="face-capture-status">{status}</p>
//     </div>
//   );
// };

// export default FaceCapture;
