import React, { useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/router';
 
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { resetToken } = router.query;

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      if (resetToken) {
        // Reset password with token
        const response = await axios.post(`http://localhost:3001/api/auth/reset-password/${resetToken}`, {
          newPassword,
        });

        if (response.status === 200) {
          setMessage('Password reset successful');
        }
      } else {
        // Request password reset
        const response = await axios.post('http://localhost:3001/api/auth/request-password-reset', {
          email,
        });

        if (response.status === 200) {
          setMessage('Password reset instructions sent to your email.');
        }
      }
    } catch (error) {
      setMessage('Error: Unable to reset the password.');
    }
  };

  return (
    <>
      <Navbar />
      <PageBanner pageTitle="Password Reset" />
      <div className="container">
        <form onSubmit={handleResetPassword}>
          {resetToken ? (
            // Display password reset form if resetToken is available
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
          ) : (
            // Display email input if resetToken is not available
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            {resetToken ? 'Reset Password' : 'Request Reset'}
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default ForgotPassword;