
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import * as Icon from 'react-feather';
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios"; // Import axios
import jwt_decode from 'jwt-decode';

const Login = () => {
    const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const params = new URLSearchParams(useRouter().query);
  const router = useRouter();
  const [token, setToken] = useState(null);


  const handleLogin  = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });
      const token = response.data.token;
      const decodedToken = jwt_decode(token);
      const userRole = decodedToken.role;

      console.log('User Role:', userRole);
      if (response.status === 200) {
        setSuccess('Success Login'); // Set the success message
        setError(null);

        if (response.data.token) {
          // Save the token and its expiration time in localStorage
          const expirationTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 hours in milliseconds
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('tokenExpiration', expirationTime);

          setToken(response.data.token);

          setTimeout(() => {
            if (response.data.role === 1) {
              // Redirect admin to the admin page with the correct port
              router.push("http://localhost:3000/admin"); // Update the URL as needed
            } else {
              // Redirect regular users to the home page
              router.push("/"); // Update the URL as needed
            }
  
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }, 1000);
        }
      }
    } catch (error) {
      setSuccess(null); // Clear any previous success message

    if (error.response && error.response.status === 401) {
      setError('Go to mail and verify your account, please.');
    } else if (error.response && error.response.status === 403) {
      setTimeout(() => {
        setError('You are not an admin. You cannot log in to this page.');
      }, 0);
    } else {
      setError('Something went wrong during login. Please try again later.');
    }
    }
  };


    return (
        <>
        <Navbar />
        <PageBanner pageTitle="Login" />

        <div className="ptb-80">
            <div className="container">
            <div className="auth-form">
                <div className="auth-head">
                <Link href="/it-startup">
                    <img src="/images/logo.png" />
                </Link>
                <p>Don't have an account yet? <Link href="/sign-up">Sign Up</Link></p>
                </div>

                <form onSubmit={handleLogin}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" required />
                </div>

                <div className="mb-3">
                    <p><Link href="/forgot-password">Forgot Password</Link></p>
                </div>

                <button type="submit" className="btn btn-primary">Login</button>
                {error && <p className="text-danger">{error}</p>} {/* Display the error message */}
                {success && <p className="text-success">{success}</p>} {/* Display the success message */}
     
                </form>

                <div className="foot">
                <p>or connect with</p>
                <ul>
                    <li>
                    <a href="https://www.mail.com/" target="_blank">
                        <Icon.Mail />
                    </a>
                    </li>
                    <li>
                    <a href="https://www.facebook.com/" target="_blank">
                        <Icon.Facebook />
                    </a>
                    </li>
                    <li>
                    <a href="https://www.twitter.com/" target="_blank">
                        <Icon.Twitter />
                    </a>
                    </li>
                </ul>
                </div>
            </div>
            </div>
        </div>

        <Footer />
        </>
    );
}

export default Login;