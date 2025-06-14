import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FaceCapture from './components/FaceCapture';
import FaceLogin from './components/FaceLogin';
import Panel from './components/partners-panel/Panel'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Panel/>} />
        <Route path="/register" element={<FaceCapture />} />
        <Route path="/login" element={<FaceLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
