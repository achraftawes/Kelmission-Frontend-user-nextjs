import React, { useState } from 'react'
import Link from 'next/link';
import Navbar from '@/components/_App/Navbar';
import PageBanner from '@/components/Common/PageBanner';
import axios from 'axios';


const Addpost = () => {
    const [formData, setFormData] = useState({
      mail: '',
      num: '',
      speciality: '',
      description: '',
      titles: '',
      company_name: '',
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
        const response = await axios.post("http://localhost:3001/api/job/add_job", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json", // Change content type to JSON
          },
        });
  
        if (response.status === 201) { // Check the response status
          // Job added successfully, you can redirect or show a success message
          console.log('Job added successfully');
        } else {
          // Handle errors if the job couldn't be added
          console.error('Error adding job');
        }
      } catch (error) {
        console.error('Error adding job:', error);
      }
    };
  
    return (
      <>
        <Navbar />
  
        <PageBanner pageTitle="Post if you are hiring" />
  
        <div className="contact-area ptb-80">
          <div className="container">
            <div className="section-title">
              <div className="bar"></div>
            </div>
  
            <div className="row align-items-center">
                <div className="col-lg-6 col-md-12">
                    <img src="/images/hiring.png" alt="image" />
                </div>
  
              <div className="col-lg-6 col-md-12">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="mail"
                          placeholder="Email"
                          className="form-control"
                          value={formData.mail}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="num"
                          placeholder="Number"
                          className="form-control"
                          value={formData.num}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="speciality"
                          placeholder="Speciality"
                          className="form-control"
                          value={formData.speciality}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="description"
                          placeholder="Description"
                          className="form-control"
                          value={formData.description}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="titles"
                          placeholder="Titles"
                          className="form-control"
                          value={formData.titles}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <input
                          type="text"
                          name="company_name"
                          placeholder="Company Name"
                          className="form-control"
                          value={formData.company_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
  
                    <div className="col-lg-12 col-md-12">
                      <button type="submit" className="btn btn-primary">
                        Add Job
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Addpost;