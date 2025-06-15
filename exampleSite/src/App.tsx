import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import FaceLogin from './pages/FaceLogin';
import FaceRegister from './pages/FaceRegister';
import AuthCallbackHandler from './pages/AuthCallback';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/callback" element={<AuthCallbackHandler/>}/>
        </Routes>
    );
}

export default App;
