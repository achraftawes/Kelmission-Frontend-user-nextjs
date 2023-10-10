import React, { useState } from "react";
import axios from "axios";
import Link from 'next/link';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Navbar from "@/components/_App/Navbar";
import PageBanner from "@/components/Common/PageBanner";


const ContactForm = () => {

    const [formData, setFormData] = useState({
        names: '',
        email: '',
        phone_number: '',
        subject: '',
        messsage_text: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Send a POST request to your backend API to add the job
        try {
          const response = await axios.post("http://localhost:3001/api/job/save_message", formData, {
            headers: {
              
              "Content-Type": "application/json", // Change content type to JSON
            },
          });
    
          if (response.status === 201) { // Check the response status
            // Job added successfully, you can redirect or show a success message
            console.log('contact added successfully');
          } else {
            // Handle errors if the job couldn't be added
            console.error('Error adding contact');
          }
        } catch (error) {
          console.error('Error adding contact:', error);
        }
      };

    return (
        <>
        
            <div className="contact-area ptb-80">
                <div className="container">
                    <div className="section-title">
                        <h2>Get In Touch With Us</h2>
                        <div className="bar"></div>
                        <p>Anything On your Mind. We’ll Be Glad To Assist You!</p>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <img src="/images/contact-img.png" alt="image" />
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="names" 
                                                placeholder="Your Name" 
                                                className="form-control" 
                                                value={formData.names}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="email" 
                                                placeholder="Your email address" 
                                                className="form-control" 
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="phone_number" 
                                                placeholder="Your phone number" 
                                                className="form-control" 
                                                value={formData.phone_number}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input 
                                                type="text" 
                                                name="subject" 
                                                placeholder="Your Subject" 
                                                className="form-control" 
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <textarea 
                                                name="message_text" 
                                                cols="30" 
                                                rows="5" 
                                                placeholder="Write your message..." 
                                                className="form-control" 
                                                value={formData.message_text}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>

                                        
                                    </div>
                
                                    <div className="col-lg-12 col-sm-12">
                                        <button type="submit" className="btn btn-primary">Send Message</button>
                                    </div>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactForm;  