import * as faceapi from 'face-api.js';

let loaded = false;

export const loadFaceApiModels = async () => {
  if (loaded) return;
  const MODEL_URL = '/models';
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL + '/tiny_face_detector'),
    //faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + '/face_landmark_68'),
  ]);
  loaded = true;
};
