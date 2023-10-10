import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import ContactInfo from '@/components/Contact/ContactInfo';
import GoogleMap from '@/components/Contact/GoogleMap';
import ContactForm from '@/components/Contact/ContactForm';
import axios from 'axios';

const Contact = () => {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const phone_number = e.target.elements.phone_number.value;
        const subject = e.target.elements.subject.value;
        const message_text = e.target.elements.message_text.value;
        
        
        try {
            const formData = new FormData();
        formData.append("name", e.target.elements.name.value);
        formData.append("email", e.target.elements.email.value);
        formData.append("phone_number", e.target.elements.phone_number.value);
        formData.append("subject", e.target.elements.subject.value);
        formData.append("message_text", e.target.elements.message_text.value);
          // Send the form data to the server
          const response = await axios.post("http://localhost:3001/api/job/save_message", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
      
          console.log("Message saved successfully:", response.data);
          alert("Message saved successfully!");
        } catch (error) {
          console.error("Error saving message:", error);
          alert("An error occurred while saving the message.");
        }
    };
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Contact Us" />

            <ContactInfo />

            

            <ContactForm />
           
            <Footer />
        </>
    )
}

export default Contact;