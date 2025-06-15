import React, { useEffect, useRef } from 'react';
import '../styles/login/login.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useNavigate } from 'react-router-dom';





const Login: React.FC = () => {
    const clientId = "c2472f78-4b55-41c0-a948-141c4e1a767e";
    const callbackUrl = "http://localhost:5174/callback/"
    const loginServerUrl = "http://localhost:8000/api/public/authorization/"

    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    useEffect(() => {


        const container = containerRef.current;
        if (!container) return;

        const registerBtn = container.querySelector<HTMLButtonElement>('#register');
        const loginBtn = container.querySelector<HTMLButtonElement>('#login');
        const faceLoginBtn = container.querySelector<HTMLButtonElement>('#face-login-btn');

        registerBtn?.addEventListener('click', () => {
            container.classList.add('active');
        });

        loginBtn?.addEventListener('click', () => {
            container.classList.remove('active');
        });
    }, []);

    const onFaceLogin = () => {
        const redirectUrl = new URL(loginServerUrl + "login/");
        redirectUrl.searchParams.set('clientId', clientId);
        redirectUrl.searchParams.set('callbackUrl', callbackUrl);

        window.location.href = redirectUrl.toString();
    }

    const onFaceRegister = () => {
        const redirectUrl = new URL(loginServerUrl + "register/");
        redirectUrl.searchParams.set('clientId', clientId);
        redirectUrl.searchParams.set('callbackUrl', callbackUrl);

        window.location.href = redirectUrl.toString();
    }

    return (
        <div className="login-page">
            <div className="container" id="container" ref={containerRef}>
                <div className="form-container sign-up">
                    <form>
                        <h1>Create Account</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name"/>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <button type="button">Sign Up</button>

                        {/* 🔽 Przycisk rejestracji twarzą */}
                        <button
                            type="button"
                            className="face-login-btn"
                            onClick={onFaceRegister}
                        >
                            <i className="fas fa-face-smile"></i> Zarejestruj się twarzą
                        </button>

                        {/* 🔽 Przycisk powrotu do strony głównej */}
                        <button
                            type="button"
                            className="back-button"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-arrow-left"></i> Powrót do Strony Głównej
                        </button>
                    </form>
                </div>


                <div className="form-container sign-in">
                    <form>
                        <h1>Sign In</h1>
                        <div className="social-icons">
                            <a href="#" className="icon"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#" className="icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="icon"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="icon"><i className="fab fa-github"></i></a>
                        </div>
                        <span>or use your email and password</span>
                        <input type="email" placeholder="Email"/>
                        <input type="password" placeholder="Password"/>
                        <a href="#">Forgot your email or password?</a>

                        {/* 🔽 TU dodane przekierowanie */}
                        <button
                            type="button"
                            onClick={() => navigate('/dashboard')}
                        >
                            Sign In
                        </button>

                        <button
                            type="button"
                            id="face-login-btn"
                            className="face-login-btn"
                            onClick={onFaceLogin}
                        >
                            <i className="fas fa-face-smile"></i> Login with Face
                        </button>


                        <button
                            type="button"
                            id="back-button"
                            className="back-button"
                            onClick={() => navigate('/')}
                        >
                            <i className="fas fa-arrow-left"></i> Powrót do Strony Głównej
                        </button>
                    </form>

                </div>

                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello, User!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;
