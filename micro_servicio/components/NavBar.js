import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser } from "@auth0/nextjs-auth0/client";

function NavBar() {
    const router = useRouter();
    const [loggedIn, setLoggedIn] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [accesReto, setAccesReto] = useState(false);

    const { user, error, isLoading } = useUser();


    React.useEffect(() => {
        const getProfile = async () => {
            try {


                if (user) {
                    setLoggedIn(true); // cambiar a verdadero para el botón
                }

            } catch (error) {
                //console.log("Ha ocurrido un error");
            }
        };
        getProfile();
    }, []);


    const logout = async () => {
        try {
            await axios.get("/api/auth/logout1");
        } catch (error) {
            console.error(error.message);
        }
        document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setLoggedIn(false);
        router.push("/");
    };

    // Función para obtener el valor de una cookie específica
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <div className="d-flex align-items-center">
                    <Link className="logo" href="/">
                        <Image
                            src="/logo.svg"
                            rel="preload"
                            alt="Logo de BA-CSIRT."
                            height={80}
                            width={280}
                            className="d-inline-block align-text-top"
                            priority
                        />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={menuOpen}
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>

                <div
                    className={`collapse navbar-collapse ${menuOpen ? "show" : ""
                        }`}
                    id="navbarSupportedContent">
                    <ul
                        className={`navbar-nav ms-auto mb-2 mb-lg-0 ${menuOpen ? "mobile-menu" : ""
                            }`}>


                        <li className="nav-item">
                            <Link className="nav-link nav-link" aria-current="page" href="/inicio">
                                <button
                                    className="btn btn-sm btn-outline-secondary"
                                    type="button">
                                    Inicio
                                </button>
                            </Link>
                        </li>
                        {loggedIn ? (
                            <li className="nav-item">
                                <Link className="nav-link" href="/api/auth/logout" onClick={logout}>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        type="button">
                                        Cerrar sesión
                                    </button>
                                </Link>
                            </li>
                        ) : (
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" href="/api/auth/login">
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        type="button">
                                        Iniciar sesión
                                    </button>
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <style jsx>{`
        .navbar-collapse {
            justify-content: flex-end;
          }
          
          .mobile-menu {
            flex-direction: column;
            align-items: flex-end;
          }
          
          @media (max-width: 400px) {
            .logo {
              display: none !important;
            }
          
            
          }
          
        @media (max-width: 991px){
            .navbar-toggler{
                
                position:absolute;
                left:92%;
            }
            .mobile-menu{
                position:relative;
                right:1%
            }
        }
        @media (max-width: 860px){
            .navbar-toggler{
                
                position:absolute;
                left:91%;
            }
            .mobile-menu{
                position:relative;
                right:1%
            }
        }
        @media (max-width: 770px){
            .navbar-toggler{
                
                position:absolute;
                left:91%;
            }
            .mobile-menu{
                position:relative;
                left:0.3%
            }
        }
        @media (max-width: 600px){
            .navbar-toggler{
                
                position:absolute;
                left:89%;
            }
        }
        @media (max-width: 495px){
            .navbar-toggler{
                
                position:absolute;
                left:86.5%;
            }
        }
        @media (max-width: 390px){
            .navbar-toggler{
                
                position:absolute;
                left:82.5%;
            }
        }
       
      `}</style>
        </nav>
    );
}

export default NavBar;
