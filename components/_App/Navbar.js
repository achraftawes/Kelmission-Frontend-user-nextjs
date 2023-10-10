import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";


const Navbar = () => {
  // Add active class
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  // console.log(router.asPath)

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router]);

  const cart = useSelector((state) => state.cart);
  const [menu, setMenu] = React.useState(true);

  const toggleNavbar = () => {
    setMenu(!menu);
  };

  React.useEffect(() => {
    let elementId = document.getElementById("header");
    document.addEventListener("scroll", () => {
      if (window.scrollY > 170) {
        elementId.classList.add("is-sticky");
      } else {
        elementId.classList.remove("is-sticky");
      }
    });
  });

  const [userProfile, setUserProfile] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    await router.push("/");
  };
  
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make the API request to fetch the user profile data
        const response = await axios.get("http://localhost:3001/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const classOne = menu
    ? "collapse navbar-collapse"
    : "collapse navbar-collapse show";
  const classTwo = menu
    ? "navbar-toggler navbar-toggler-right collapsed"
    : "navbar-toggler navbar-toggler-right";

  return (
    <>
      <header id="header" className="headroom">
        <div className="startp-nav">
          <div className="container">
            <nav className="navbar navbar-expand-md navbar-light">
              <Link href="/" className="navbar-brand">
                <img src="/images/logo.png" alt="logo" />
              </Link>

              <button
                onClick={toggleNavbar}
                className={classTwo}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="icon-bar top-bar"></span>
                <span className="icon-bar middle-bar"></span>
                <span className="icon-bar bottom-bar"></span>
              </button>

              <div className={classOne} id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link
                      href="/"
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        currentPath == "/" && "active"
                      }`}
                    >
                      Home 
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/about-1/"
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        currentPath == "/about-1/" && "active"
                      }`}
                    >
                      About 
                    </Link> 
                  </li>

                  
                  {token ? (          
                  <li className="nav-item">
                    <Link
                      href="/profile/"
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        currentPath == "/profile/" && "active"
                      }`}
                    >
                      Profil <Icon.ChevronDown />
                    </Link>
                         
                    <ul className="dropdown-menu">
                      <li className="nav-item">
                        <Link
                          href="/profile/"
                          onClick={toggleNavbar}
                          className={`nav-link ${
                            currentPath == "/profile/" && "active"
                          }`}
                        >
                          Show Profil
                        </Link>
                      </li>

                      
                      
                    </ul>
                  </li>
                  ) : (
                    <>
                    </>
                  )} 
                  <li className="nav-item">
                    <Link
                      href="/blog-4/"
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        currentPath == "/blog-4/" && "active"
                      }`}
                    >
                      Advertisement <Icon.ChevronDown />
                    </Link>

                    <ul className="dropdown-menu">
                      

              
                      <li className="nav-item">
                        <Link
                          href="/blog-4/"
                          onClick={toggleNavbar}
                          className={`nav-link ${
                            currentPath == "/blog-4/" && "active"
                          }`}
                        >
                          Show Advertisement 
                        </Link>
                      </li>
                      {token ? (  
                      <li className="nav-item">
                        <Link
                          href="/addpost/"
                          onClick={toggleNavbar}
                          className={`nav-link ${
                            currentPath == "/addpost/" && "active"
                          }`}
                        >
                          Add Advertisement 
                        </Link>
                      </li>
                      ) : (
                    <>
                    </>
                  )} 
                    </ul>

                    
                      

              
                      

                      
                    
                  </li>

                  <li className="nav-item">
                    <Link
                      href="/contact/"
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        currentPath == "/contact/" && "active"
                      }`}
                    >
                      Contact
                    </Link>

                  </li>
                  {token ? (  
                  <li className="nav-item">
                    <Link
                      href="/favoris/"
                      onClick={toggleNavbar}
                      className={`nav-link ${
                        currentPath == "/favoris/" && "active"
                      }`}
                    >
                      Favoris
                    </Link>

                  </li>
                    ) : (
                    <>
                    </>
                  )} 
                  <li className="nav-item">

                    
                  </li>
                  {token ? (
                    
                    <div className="others-option">
                      
                      <Link href="/" onClick={handleLogout} className="btn btn-light">
                        Logout
                      </Link>

                      <>
                      {userProfile && (
                        <div className="profileImage">
                          {userProfile.photo ? (
                            <Image
                              src={`http://localhost:3001/uploads/${userProfile.photo}`}
                              alt="Profile Image"
                              width={80}
                              height={80}
                              className="image"
                            />
                          ) : (
                            <div>No Profile Image</div>
                          )}
                        </div>
                    )}
                      </>
                      
                    </div>
                    ) : (
                      <>
                      <Link href="/sign-up/" className="btn btn-light">
                        Sign up
                      </Link>

                      <Link href="/login/" className="btn btn-primary">
                        Login
                      </Link>
                      </>
                  )} 


                </ul>
              </div>

              
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
