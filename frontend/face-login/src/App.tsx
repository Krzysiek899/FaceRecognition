import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Panel from './components/partners-panel/Panel'
import CameraCapture from './components/face-auth/CameraCapture';
import FaceRegister from './components/face-auth/register/FaceRegister';
import FaceLogin from './components/face-auth/login/FaceLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel/>} />
        <Route path="/register" element={<FaceRegister/>} />
        <Route path="/login" element={<FaceLogin />} />
        <Route path='/test' element={<CameraCapture/>} />
      </Routes>
    </Router>
  );
}

export default App;
