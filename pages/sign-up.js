import React, { useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import axios from "axios";
import { useRouter } from "next/navigation";


const SignUp = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const router = useRouter();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
      const confirmPassword = e.target.confirmPassword.value; // Get the confirmation password
      const motivation_letter = e.target.motivation_letter.value;
      const photo = e.target.photo.files[0]; // Access the selected file from the file input
  
      // Check if passwords match
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
  
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("motivation_letter", motivation_letter);
        formData.append("photo", photo); // Append the photo to the form data
  
        const response = await axios.post("http://localhost:3001/api/auth/register", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        if (response.status === 201) {
          setSuccess("Account has been created. Go to the login page, please.");
          setError(null);
  
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      } catch (error) {
        console.error(error);
        setSuccess(null);
        setError("Something went wrong during registration.");
      }
    };
  return (
    <>
      <Navbar />
      <PageBanner pageTitle="Sign Up" />

      <div className="ptb-80">
        <div className="container">
          <div className="auth-form">
            <div className="auth-head">
              <Link href="/it-startup">
                <img src="/images/logo.png" />
              </Link>
              <p>Create a new account</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmPassword" required />
                </div>

                <div className="mb-3">
                    <label className="form-label">Motivation Letter</label>
                    <textarea className="form-control" name="motivation_letter" rows="4" required></textarea>
                </div>

                <div className="mb-3">
                    <label className="form-label">Upload Photo</label>
                    <input type="file" name="photo" accept="image/*" required />
                </div>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}

                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>


            <div className="foot">
              <p>Already have an account yet? <Link href="/login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default SignUp;