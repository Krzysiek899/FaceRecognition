import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import "./CameraCapture.css";
import { ClipLoader } from "react-spinners";
import { loadFaceApiModels } from "../../utils/faceApiLoader";

interface CameraProps {
  onSendImage: (imageUrl: string) => void;
}

const CameraCapture : React.FC <CameraProps> = ({onSendImage}) => {

  //variables
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  //references
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number | null>(null);
  const detectionIdRef = useRef<number | null>(null);


  //model loading
  useEffect(() => {
    loadFaceApiModels().then(() => {
      startCamera();
      setLoading(false);
    });
  }, []);

  //camera
  const startCamera = () => {
    console.log("Starting camera");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        detectFace();
      })
      .catch((error) => {
        console.error("Camera error:", error);
        setError(true);
      });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rysujemy szary półprzezroczysty overlay na cały obszar
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Parametry okręgu (środek i promień)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radiusX = canvas.width * 0.25; // promień poziomy (szerokość)
      const radiusY = canvas.height * 0.4; // promień pionowy (wysokość)

      // Tworzymy maskę: wycinamy koło ze szarego tła (przezroczysty okrąg)
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
      ctx.fill();

      // Przywracamy normalny tryb rysowania
      ctx.globalCompositeOperation = "source-over";

      animationIdRef.current = requestAnimationFrame(draw);
    };

    if (video.readyState >= 2) {
      draw();
    } else {
      video.onloadeddata = () => draw();
    }

    return () => {
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (video) video.onloadeddata = null;
    };

  }, [loading]);

  //detection
  const detectFace = async () => {
    if (
      !videoRef.current ||
      videoRef.current.readyState !== 4 ||
      !canvasRef.current
    ) {
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
      height: video.videoHeight,
    });

    // Pętla detekcji
    const runDetection = async () => {
      if (
        !videoRef.current ||
        videoRef.current.paused ||
        videoRef.current.ended
      )
        return;

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
      //console.log("Running detection...");
      const detections = await faceapi.detectSingleFace(video, options);
      //.withFaceLandmarks();
      //console.log("Detections:", detections);
      if (detections) {
        setStatus("Face detected! Checking liveness...");
        const landmarksResult = await faceapi.detectFaceLandmarks(video);
        // Handle both array and single object cases
        const landmarks = Array.isArray(landmarksResult)
          ? landmarksResult[0]
          : landmarksResult;
        if (landmarks) {

          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          function euclideanDistance(p1: faceapi.Point, p2: faceapi.Point) {
            return Math.hypot(p1.x - p2.x, p1.y - p2.y);
          }
          function getEAR(eye: faceapi.Point[]) {
            const a = euclideanDistance(eye[1], eye[5]);
            const b = euclideanDistance(eye[2], eye[4]);
            const c = euclideanDistance(eye[0], eye[3]);
            return (a + b) / (2.0 * c);
          }

          const leftEAR = getEAR(leftEye);
          const rightEAR = getEAR(rightEye);
          const ear = (leftEAR + rightEAR) / 2;
          console.log(ear);

          if (ear < 0.35) {
            setStatus("Liveness check passed! You can proceed.");
            const imageUrl = getSnapshot(videoRef.current);
            onSendImage(imageUrl);
            setStatus("Face scan finished! Recognizing.")
            stopVideoProcessing();
          } else {
            setStatus("Liveness check failed. Please blink your eyes.");
          }
        } else {
          setStatus("Face detected, but no landmarks found.");
        }
      } else {
        setStatus(
          "No face detected. Please position your face in front of the camera."
        );
      }

      detectionIdRef.current = requestAnimationFrame(runDetection);
    };

    runDetection();
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

  const stopVideoProcessing = () => {
    if (animationIdRef.current !== null) {
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
    if (detectionIdRef.current !== null) {
      cancelAnimationFrame(detectionIdRef.current);
      detectionIdRef.current = null;
    }

    // Zatrzymaj kamerę
    const stream = videoRef.current?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current!.srcObject = null;
    }

    console.log("Video and processing stopped.");
  };



  return (
    <div className="camera-container">
      {loading ? (
        <div className="loading-wrapper">
          <ClipLoader color="#36d7b7" size={50} />
        </div>
      ) : error ? (
        <div>Error</div>
      ) : (
        <>
          <div className="video-wrapper">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="face-capture-video"
            />
            <canvas ref={canvasRef} className="face-capture-canvas" />
          </div>
          <div className="face-capture-status">{status}</div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
