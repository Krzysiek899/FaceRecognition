import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Panel from './components/partners-panel/Panel'
import FaceRegister from './components/face-auth/register/FaceRegister';
import FaceLogin from './components/face-auth/login/FaceLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel/>} />
        <Route path="/face-register" element={<FaceRegister/>} />
        <Route path="/face-login" element={<FaceLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
