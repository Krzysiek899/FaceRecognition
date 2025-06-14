import React, { useState } from 'react';
import { useOrderSystem } from "../hooks/useOrderSystem";



const LandingPage: React.FC = () => {

    const { orderSystem, loading } = useOrderSystem();
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ company: "", email: "", redirect: "" });
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
                <div className="container-fluid px-4">
                    <a className="navbar-brand w-8" href="#">
                        <img
                            src="https://img.freepik.com/premium-vector/facial-recognition-icon-simple-element-illustration-facial-recognition-concept-symbol-design-from-augmented-reality-collection-can-be-used-web-mobile_159242-12246.jpg"
                            width="80" alt="Logo"/>
                    </a>
                    <button
                        className="navbar-toggler shadow-none ms-2"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navigation"
                    >
            <span className="navbar-toggler-icon mt-2">
              <span className="navbar-toggler-bar bar1"></span>
              <span className="navbar-toggler-bar bar2"></span>
              <span className="navbar-toggler-bar bar3"></span>
            </span>
                    </button>
                    <div className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0" id="navigation">
                        <ul className="navbar-nav navbar-nav-hover ms-auto">
                            <li className="nav-item mx-2"><a href="#" className="nav-link ps-2">Home</a></li>
                            <li className="nav-item mx-2"><a href="#" className="nav-link ps-2">Products</a></li>
                            <li className="nav-item mx-2"><a href="#" className="nav-link ps-2">How it works</a></li>
                            <li className="nav-item mx-2"><a href="#" className="nav-link ps-2">Blog</a></li>
                            <li className="nav-item mx-2"><a href="#" className="nav-link ps-2"><i
                                className="fa fa-shopping-bag"></i></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
            {/* ==== HERO – Face Recognition Login ==== */}
            <header>
                <div className="container-fluid px-0">
                    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">

                            {/* SLIDE 1 – produkt */}
                            <div className="carousel-item active">
                                <div
                                    className="page-header min-vh-75"
                                    style={{
                                        backgroundImage:
                                            "url('https://epe.brightspotcdn.com/dims4/default/3440acf/2147483647/strip/true/crop/1695x1150+13+0/resize/840x570!/quality/90/?url=https%3A%2F%2Fepe-brightspot.s3.us-east-1.amazonaws.com%2F53%2Fc9%2F8a96a2eb465e89e9d18fa364a671%2F102023-lead-image-facial-recognition-gt.jpg')",
                                    }}
                                >
                                    <span className="mask bg-gradient-dark opacity-8"></span>
                                    <div className="container-fluid px-4">
                                        <div className="row">
                                            <div className="col-lg-8 mx-auto text-center my-auto">
                                                <h1 className="text-white display-1 fw-bold fadeIn2 fadeInBottom">
                                                    Log in with Your Face
                                                </h1>
                                                <p className="lead text-white opacity-8 fadeIn3 fadeInBottom">
                                                    Zapewniamy bezhasłowe, błyskawiczne uwierzytelnianie
                                                    biometryczne – bezpieczniejsze i prostsze niż tradycyjne loginy.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SLIDE 2 – wsparcie & skalowalność */}
                            <div className="carousel-item">
                                <div
                                    className="page-header min-vh-75"
                                    style={{
                                        backgroundImage:
                                            "url('https://i.pcmag.com/imagery/articles/02kQonNmHFwp8Vszm8CVOoO-1.fit_lim.v1574904321.jpg')",
                                    }}
                                >
                                    <span className="mask bg-gradient-dark opacity-8"></span>
                                    <div className="container-fluid px-4">
                                        <div className="row">
                                            <div className="col-lg-8 mx-auto text-center my-auto">
                                                <h1 className="text-white display-1 fw-bold fadeIn2 fadeInBottom">
                                                    Enterprise-grade Security
                                                </h1>
                                                <p className="lead text-white opacity-8 fadeIn3 fadeInBottom">
                                                    24/7 wsparcie techniczne, szybka integracja z Twoją aplikacją i
                                                    pełne dopasowanie do potrzeb Twojej firmy – bez zbędnych
                                                    komplikacji.
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* NAWIGACJA KARUZELI */}
                        <div className="min-vh-75 position-absolute w-100 top-0">
                            <a
                                className="carousel-control-prev"
                                href="#heroCarousel"
                                role="button"
                                data-bs-slide="prev"
                            >
          <span
              className="carousel-control-prev-icon position-absolute bottom-50 ms-n7"
              aria-hidden="true"
          ></span>
                                <span className="visually-hidden">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#heroCarousel"
                                role="button"
                                data-bs-slide="next"
                            >
          <span
              className="carousel-control-next-icon position-absolute bottom-50 me-n7"
              aria-hidden="true"
          ></span>
                                <span className="visually-hidden">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </header>


            <section>
                <div className="container py-5">
                    <div className="row align-items-center">
                        <div className="col-md-6 mb-md-0 mb-4 pe-5">
                            <h3 className="mb-3">
                                Inteligentny system logowania twarzą
                            </h3>
                            <p className="mb-md-5 mb-4">
                                Ułatwiamy dostęp do aplikacji i systemów dzięki bezpiecznemu, szybkiemu i intuicyjnemu
                                logowaniu za pomocą twarzy. Nasza technologia biometryczna eliminuje hasła i zwiększa
                                komfort użytkowników.
                            </p>
                            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                                Zamów system
                            </button>

                        </div>
                        <div className="col-md-6">
                        <div className="blur-shadow-image text-center">
                            <img
                                    src="https://static.tildacdn.com/tild3732-6431-4664-b037-386230346464/what-is-FR.jpg"
                                    alt="Face recognition demo"
                                    className="img-fluid shadow border-radius-lg max-height-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* DLACZEGO MY – nagłówek */}
            <section className="py-0">
                <div className="container-fluid px-4">
                    <div className="row">
                        <div className="col-6 text-center mx-auto mt-5 mb-4">
                            <h2>Dlaczego warto nas wybrać?</h2>
                            <p>
                                Nasze rozwiązanie do logowania twarzą łączy bezpieczeństwo, wygodę i nowoczesną technologię.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* TRZY KAFELKI */}
            <section>
                <div className="container-fluid px-4">
                    <div className="row pt-5">
                        {[
                            {
                                num: 1,
                                title: "Bezproblemowe wdrożenie",
                                desc: "Nasza technologia pozwala szybko zintegrować logowanie twarzą z Twoją aplikacją – bez potrzeby specjalistycznej wiedzy.",
                            },
                            {
                                num: 2,
                                title: "Wsparcie 24/7",
                                desc: "Nasz zespół techniczny jest dostępny przez całą dobę, gotowy, by Ci pomóc w każdej sytuacji.",
                            },
                            {
                                num: 3,
                                title: "Wysoka dokładność",
                                desc: "Opieramy się na nowoczesnych algorytmach AI, które zapewniają wysoką skuteczność i szybkość działania.",
                            },
                        ].map(({ num, title, desc }) => (
                            <div className="col-md-4" key={num}>
                                <div className="info">
                                    <div className="icon icon-shape bg-gradient-dark p-3 shadow text-center d-flex align-items-center justify-content-center mb-4">
                                        <span className="text-white text-sm font-weight-bolder">{num}</span>
                                    </div>
                                    <h6>{title}</h6>
                                    <p>{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA – zachęta do kontaktu */}
            <section className="py-5 bg-gradient-dark position-relative">
                <div className="container-fluid px-4 position-relative z-index-2">
                    <div className="row">
                        <div className="col-md-7 mx-auto text-center">
                            <h3 className="text-white mb-3">Gotowy na nowy poziom bezpieczeństwa?</h3>
                            <p className="text-white">
                                Wdrożenie logowania twarzą to krok w stronę nowoczesności. Skontaktuj się z nami i zacznij już dziś.
                            </p>
                            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
                                Zamów system
                            </button>


                        </div>
                    </div>
                </div>
            </section>


            {/* FOOTER */}
            <footer className="footer py-5">
                <div className="container-fluid px-4">
                    <div className="row">
                        {/* kolumna logo + social */}
                        <div className="col-lg-3 mb-5 mb-lg-0">
                            <h6 className="text-uppercase mb-2">Soft</h6>
                            <p className="mb-4 pb-2">The next generation of design systems.</p>
                            {["facebook", "twitter", "instagram", "pinterest", "github"].map((net) => (
                                <a key={net} href="#" className="text-secondary me-xl-4 me-3">
                                    <span className={`text-lg fab fa-${net}`} aria-hidden="true"></span>
                                </a>
                            ))}
                        </div>

                        {/* kolumny z linkami */}
                        {[
                            {
                                title: "Company",
                                links: ["About Us", "Careers", "Press", "Blog"],
                            },
                            {
                                title: "Pages",
                                links: ["Login", "Register", "Add list", "Contact"],
                            },
                            {
                                title: "Legal",
                                links: ["Terms", "About Us", "Team", "Privacy"],
                            },
                            {
                                title: "Resources",
                                links: ["Blog", "Service", "Product", "Pricing"],
                            },
                        ].map(({title, links}) => (
                            <div className="col-md-2 col-6 ms-lg-auto mb-md-0 mb-4" key={title}>
                                <h6 className="text-sm">{title}</h6>
                                <ul className="flex-column ms-n3 nav">
                                    {links.map((txt) => (
                                        <li className="nav-item" key={txt}>
                                            <a className="nav-link text-secondary" href="#">
                                                {txt}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* linia + copyright */}
                    <hr className="horizontal dark mt-lg-5 mt-4 mb-sm-4 mb-1"/>
                    <div className="row">
                        <div className="col-8 mx-lg-auto text-lg-center">
                            <p className="text-sm text-secondary">
                                © 2022 Soft &amp; Loopple by Creative Tim.
                            </p>
                        </div>
                    </div>
                </div>
                {showForm && (
                    <div className="modal-backdrop position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75" style={{ zIndex: 1050 }}>
                        <div className="bg-white p-4 rounded shadow" style={{ width: 400 }}>
                            <h5 className="mb-3">Zamów system logowania twarzą</h5>

                            <input
                                className="form-control mb-2"
                                placeholder="Nazwa firmy"
                                value={form.company}
                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                            />
                            <input
                                className="form-control mb-2"
                                placeholder="Adres e-mail"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            <input
                                className="form-control mb-3"
                                placeholder="Redirect URI (opcjonalnie)"
                                value={form.redirect}
                                onChange={(e) => setForm({ ...form, redirect: e.target.value })}
                            />

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-primary" onClick={() => orderSystem(form)} disabled={loading}>
                                    {loading ? "Wysyłanie..." : "Wyślij"}
                                </button>
                                <button className="btn btn-link" onClick={() => setShowForm(false)}>Anuluj</button>
                            </div>
                        </div>
                    </div>
                )}


            </footer>


        </>
    );
};

export default LandingPage;
