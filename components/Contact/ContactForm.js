import React, { useState } from "react";
import axios from "axios";



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
          await axios.post("http://localhost:3001/api/job/save_message", formData, {
            headers: {
              
              "Content-Type": "application/json", // Change content type to JSON
            },
          });
    
          alert("Sucess Sending ! ");
        } catch (error) {
          console.error('Error adding Message:', error);
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