
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import axios from "axios";
import Image from "next/image";


const Home = () => {

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
    return (
        <>
            <div className="main-banner">
                <div className="d-table">
                    <div className="d-table-cell">
                        <div className="container">
                            <div className="row h-100 justify-content-center align-items-center">
                                <div className="col-lg-5">
                                    <div className="hero-content">
                                        <h1>Find out what you like doing best and get someone to pay you for doing it.</h1>
                                        <p>Choose a job you love, and you will never have to work a day in you life.</p>
                                        {token ? ( 
                                        <Link href="/blog-4" className="btn btn-primary">
                                        Search of your job
                                    </Link>
                                        ) : (
                                            <Link href="/sign-up" className="btn btn-primary">
                                            Get Started
                                        </Link>
                                            )} 
                                    </div>
                                </div>

                                <div className="col-lg-6 offset-lg-1">
                                    <div className="banner-image">
                                        <img 
                                            src='/images/banner-image/man.png' 
                                            className="animate__animated animate__fadeInDown animate__delay-0.1s" 
                                            alt="man" 
                                        />
                            
                                        <div 
                                            
                                            className="animate__animated animate__fadeInUp animate__delay-0.1s" 
                                            
                                        />
                                    
                                        <img 
                                            src="/images/banner-image/carpet.png" 
                                            className="animate__animated animate__fadeInLeft animate__delay-0.1s" 
                                            alt="carpet"
                                        />
                                
                                        <img 
                                            src="/images/banner-image/bin.png" 
                                            className="animate__animated animate__zoomIn animate__delay-0.1s" 
                                            alt="bin"
                                        />
                            
                                        <img 
                                            src="/images/banner-image/book.png" 
                                            className="animate__animated animate__bounceIn animate__delay-0.1s" 
                                            alt="book"
                                        />
                            
                                        <img 
                                            src="/images/banner-image/dekstop.png" 
                                            className="animate__animated animate__fadeInDown animate__delay-0.1s" 
                                            alt="dekstop"
                                        />
                        
                                        <img 
                                            src="/images/banner-image/dot.png" 
                                            className="animate__animated animate__zoomIn animate__delay-0.1s" 
                                            alt="dot"
                                        />
                            
                                        <img 
                                            src="/images/banner-image/flower-top-big.png" 
                                            className="animate__animated animate__fadeInUp animate__delay-0.1s" 
                                            alt="flower-top-big"
                                        />
                            
                                        <img 
                                            src="/images/banner-image/flower-top.png" 
                                            className="animate__animated animate__rotateIn animate__delay-0.1s" 
                                            alt="flower-top"
                                        />
                        
                                        <img 
                                            src="/images/banner-image/keyboard.png" 
                                            className="animate__animated animate__fadeInUp animate__delay-0.1s" 
                                            alt="keyboard"
                                        />
                                
                                        <img 
                                            src="/images/banner-image/pen.png" 
                                            className="animate__animated animate__zoomIn animate__delay-0.1s" 
                                            alt="pen"
                                        />
                                    
                                        <img 
                                            src="/images/banner-image/table.png" 
                                            className="animate__animated animate__zoomIn animate__delay-0.1s" 
                                            alt="table"
                                        />
                        
                                        <img 
                                            src="/images/banner-image/tea-cup.png" 
                                            className="animate__animated animate__fadeInLeft animate__delay-0.1s" 
                                            alt="tea-cup"
                                        />
                            
                                        <img 
                                            src="/images/banner-image/headphone.png" 
                                            className="animate__animated animate__rollIn animate__delay-0.1" 
                                            alt="headphone"
                                        />
                                
                                        <img 
                                            src="/images/banner-image/main-pic.png" 
                                            className="animate__animated animate__fadeInUp animate__delay-0.1" 
                                            alt="main-pic"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            </div>
        </>
    )
}

export default Home