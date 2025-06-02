import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FaceCapture from './components/FaceCapture';
import FaceLogin from './components/FaceLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<FaceCapture />} />
        <Route path="/login" element={<FaceLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
