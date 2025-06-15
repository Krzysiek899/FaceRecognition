import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/home/style.scss'; // zakładam, że masz ten plik i SCSS działa

const Dashboard: React.FC = () => {
    useEffect(() => {
        const ham = document.querySelector('.ham-menu');
        const nav = document.querySelector('.navbar');

        const toggleMenu = () => {
            ham?.classList.toggle('active');
            nav?.classList.toggle('active');
        };

        ham?.addEventListener('click', toggleMenu);

        return () => {
            ham?.removeEventListener('click', toggleMenu);
        };
    }, []);

    return (
        <>
            <div className="home-bg">
                <header className="primary-header">
                    <div className="left-part">
                        <div className="logo">
                            <h1>Krakow</h1>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="navbar">
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#tour">Tours</a></li>
                                <li><a href="#media">Media</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                                <li><Link to="/login">Login</Link></li>
                            </ul>
                            <div className="btn-group">
                                <a href="#" className="btn btn-try">
                                    <span>Book A Tour</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="ham-menu">
                            <div className="line line-1"></div>
                            <div className="line line-2"></div>
                            <div className="line line-3"></div>
                        </div>
                    </div>
                </header>

                <main>

                    <section className="dashboard-welcome">
                        <div className="main-text">
                            <h2>Welcome</h2>
                            <h1>Explore Your Next Adventure</h1>
                            <p>Below you will find our currently available tours. Pick your dream destination and start
                                planning today!</p>
                        </div>
                    </section>


                    <section className="tour" id="tour">
                        <div className="main-text">
                            <h2>Available Now</h2>
                            <h1>Kraków Tours</h1>
                        </div>
                        <div className="main-container">
                            {/* Card 1 — Kraków */}
                            <div className="tour-cards">
                                <div className="image-box">
                                    <img
                                        src="https://images.unsplash.com/photo-1707836995984-d7eb71186d09?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Krakow Old Town"
                                    />
                                    <div className="overlay"></div>
                                    <div className="image-box-text">
                                        <h2>Kraków</h2>
                                        <p>Old Town, Wawel & Kazimierz</p>
                                    </div>
                                </div>
                                <div className="tour-cards-text">
                                    <h1>Kraków City Walking Tour</h1>
                                    <p>
                                        Discover Kraków’s Old Town, historic Wawel Castle and charming Jewish
                                        Quarter Kazimierz in a single guided day tour.
                                    </p>
                                    <a href="#" className="btn-map">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span>View Route Map</span>
                                    </a>
                                    <div className="price">
                                        <p>$69 <span>Per person</span></p>
                                        <h2>1 Day</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Card 2 — Wieliczka */}
                            <div className="tour-cards">
                                <div className="image-box">
                                    <img
                                        src="https://images.unsplash.com/photo-1740156118334-5ffeb7832eab?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Wieliczka Salt Mine"
                                    />
                                    <div className="overlay"></div>
                                    <div className="image-box-text">
                                        <h2>Wieliczka</h2>
                                        <p>Underground Salt Mine</p>
                                    </div>
                                </div>
                                <div className="tour-cards-text">
                                    <h1>Wieliczka Salt Mine Tour</h1>
                                    <p>
                                        Journey underground to discover salt sculptures, chapels and chambers in
                                        one of the world’s oldest salt mines — a UNESCO Heritage Site.
                                    </p>
                                    <a href="#" className="btn-map">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span>View Route Map</span>
                                    </a>
                                    <div className="price">
                                        <p>$89 <span>Per person</span></p>
                                        <h2>Half-Day</h2>
                                    </div>
                                </div>
                            </div>

                            {/* Card 3 — Auschwitz */}
                            <div className="tour-cards">
                                <div className="image-box">
                                    <img
                                        src="https://images.unsplash.com/photo-1669475394197-2862a195f3e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        alt="Auschwitz"
                                    />
                                    <div className="overlay"></div>
                                    <div className="image-box-text">
                                        <h2>Auschwitz-Birkenau</h2>
                                        <p>Memorial & Museum</p>
                                    </div>
                                </div>
                                <div className="tour-cards-text">
                                    <h1>Auschwitz Guided Memorial Tour</h1>
                                    <p>
                                        Visit the former Nazi concentration and extermination camp, now a
                                        powerful memorial and museum with licensed guide.
                                    </p>
                                    <a href="#" className="btn-map">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                        </svg>
                                        <span>View Route Map</span>
                                    </a>
                                    <div className="price">
                                        <p>$109 <span>Per person</span></p>
                                        <h2>1 Day</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>


                    <section className="contact" id="contact">
                        <div className="main-text">
                            <h2>Contact</h2>
                            <h1>Get in touch</h1>
                        </div>
                        <div className="main-container">
                            <form action="#">
                                <div className="name">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter Your name"
                                        id="name"
                                        name="name"
                                    />
                                </div>

                                <div className="phone">
                                    <label htmlFor="phone">Email or Phone</label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter Your Number or phone"
                                    />
                                </div>

                                <div className="message">
                                    <label htmlFor="message">Your message</label>
                                    <textarea
                                        name="message"
                                        id="message"
                                        cols={30}
                                        rows={10}
                                        placeholder="Tell us about your interests, passion, needs and any other details relevant to your trip"
                                    ></textarea>
                                </div>

                                <button className="btn-send" type="submit">
                                    Send
                                </button>
                            </form>
                        </div>
                    </section>


                </main>


                <footer>
                    {/* ...analogiczna konwersja footer */}
                    <div className="footer-image">
                        <div className="overlay1"></div>
                        <div className="overlay2"></div>

                    </div>
                    <div className="main-container">
                        <div className="heading-foo">

                            <h1>Krakow</h1>
                            <p>
                                A city of charm, history, and unforgettable moments.
                            </p>
                        </div>
                        <div className="social-media">
                            <h1>Connect with us</h1>
                            <ul>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         className="fill">
                                        <path
                                            d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         className="fill">
                                        <path
                                            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                    </svg>
                                </li>
                                <li>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         className="fill">
                                        <path
                                            d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                        <div className="main">
                            <h1>Quick Links</h1>
                            <ul>
                                <li><a href="#tour">Tours</a></li>
                            </ul>
                        </div>
                        <div className="contact-info">
                            <h1>Contacts</h1>
                            <div className="contact-info-text">
                                <p>+48 123 456 789</p>
                                <p>krakow@help.com</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Dashboard;
