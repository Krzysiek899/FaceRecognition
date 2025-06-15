import * as tf from "@tensorflow/tfjs";
import * as faceapi from "face-api.js";

let loaded = false;

export const loadFaceApiModels = async () => {
  if (loaded) return;
  await tf.setBackend("cpu"); // lub "cpu" jeśli webgl nie działa
  await tf.ready();
  const MODEL_URL = "/models";
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(
      MODEL_URL + "/tiny_face_detector"
    ),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL + "/face_landmark_68"),
  ]);
  loaded = true;
};
