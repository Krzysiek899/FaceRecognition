import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import './CameraCapture.css'
import { ClipLoader } from 'react-spinners';
import { loadFaceApiModels } from '../../utils/faceApiLoader';

const CameraCapture:React.FC = () => {

  //variables
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  //references
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  

  //model loading
  useEffect(() => {
    loadFaceApiModels().then(()=>{
      startCamera();
      setLoading(false);
    }
    );
  }, []);

  //camera
  const startCamera = () => {
    console.log("Starting camera")
    navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        if (videoRef.current) {
        videoRef.current.srcObject = stream;
        }
        detectFace();
    })
    .catch(error => {
        console.error('Camera error:', error);
        setError(true);
    });
  };

  
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rysujemy szary półprzezroczysty overlay na cały obszar
      ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parametry okręgu (środek i promień)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radiusX = canvas.width * 0.25;  // promień poziomy (szerokość)
      const radiusY = canvas.height * 0.40; // promień pionowy (wysokość)

      // Tworzymy maskę: wycinamy koło ze szarego tła (przezroczysty okrąg)
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Przywracamy normalny tryb rysowania
      ctx.globalCompositeOperation = 'source-over';

      requestAnimationFrame(draw);
    };

    if (video.readyState >= 2) {
      draw();
    } else {
      video.onloadeddata = () => draw();
    }

    return () => {
      if (video) video.onloadeddata = null;
    };
  }, [loading]);

  //detection
  const detectFace = async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4 || !canvasRef.current) {
      // jeśli video nie jest gotowe, spróbuj za chwilę
      setTimeout(detectFace, 500);
      return;
    }

    const options = new faceapi.TinyFaceDetectorOptions();

    const canvas = canvasRef.current;
    const video = videoRef.current;

    // Dopasuj rozmiar canvas do video
    faceapi.matchDimensions(canvas, {
      width: video.videoWidth,
      height: video.videoHeight
    });

    // Pętla detekcji
    const runDetection = async () => {
      if (!videoRef.current || videoRef.current.paused || videoRef.current.ended) return;

      // const tempCanvas = document.createElement('canvas');
      // const tempCtx = tempCanvas.getContext('2d');

      // const centerX = canvas.width / 2;
      // const centerY = canvas.height / 2;
      // const radiusX = canvas.width * 0.35;  
      // const radiusY = canvas.height * 0.50;

      // // Ustaw rozmiar tymczasowego canvas zgodnie z obszarem detekcji
      // const width = radiusX * 2;
      // const height = radiusY * 2;
      // tempCanvas.width = width;
      // tempCanvas.height = height;

      // // Wytnij prostokąt z video (obraz wideo, x, y, szerokość, wysokość)
      // tempCtx!.drawImage(
      //   video, 
      //   centerX - radiusX, centerY - radiusY, width, height,  // źródło (z video)
      //   0, 0, width, height                                   // docelowo na tempCanvas
      // );

      const detections = await faceapi.detectSingleFace(video, options);
      //.withFaceLandmarks();

      if (detections) {
        setStatus('Face detected! Checking liveness...');

        // const resizedDetections = faceapi.resizeResults(detections, {
        //   width: video.videoWidth,
        //   height: video.videoHeight
        // });

        // // Wyczyść canvas i narysuj box
        // const ctx = canvas.getContext('2d');
        // ctx!.clearRect(0, 0, canvas.width, canvas.height);
        // faceapi.draw.drawDetections(canvas, resizedDetections);

        // Tu możesz dodać detekcję mrugania i logikę żywotności
        // Na potrzeby przykładu zrobimy prostą symulację:
        //await checkLiveness(video);

      } else {
        setStatus('No face detected. Please position your face in front of the camera.');
      }

      requestAnimationFrame(runDetection);
    };

    runDetection();
  };



  return (
   <div className='camera-container'>
      {loading ? (
        <div className="loading-wrapper">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <div className="video-wrapper">
            <video ref={videoRef} autoPlay muted playsInline className="face-capture-video" />
            <canvas ref={canvasRef} className="face-capture-canvas" />
          </div>
          <div className="face-capture-status">{status}</div>
        </>
      )}  
    </div>

  )
}

export default CameraCapture;