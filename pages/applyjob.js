
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from "react";


const applyjob = () => {
    const router = useRouter();
    const { job_id } = router.query;

    useEffect(() => {
        // Fetch job details or perform other actions based on job_id
        if (job_id) {
            // Fetch job details using job_id
            axios.get(`http://localhost:3001/api/job/get_job/${job_id}`)
                .then((response) => {
                    // Handle the response data
                    const jobDetails = response.data;
                    console.log("Job details:", jobDetails);
                })
                .catch((error) => {
                    console.error("Error fetching job details:", error);
                });
        }
    }, [job_id]);

    const [cvFile, setCvFile] = useState(null);
  const [description, setDescription] = useState("");
  const [mail, setMail] = useState("");
  const [email, setEmail] = useState("");
  const [jobDetail, setJobDetail] = useState(null);
  
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/job/get_job/${job_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setJobDetail(response.data);
          setMail(response.data.mail); // Set the mail state from the fetched job detail
        } else {
          setJobDetail(null);
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJobDetail(null);
      }
    };

    fetchJobDetail();
  }, [job_id]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCvFile(file);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleMailChange = (e) => {
    setMail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("cvFile", cvFile);
      formData.append("description", description);
      formData.append("mail", mail); // Include the user's email address
      formData.append("email", email); // Include the company email address
  
      const response = await axios.post("http://localhost:3001/api/job/send_mail", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Applied to job successfully:", response.data);
      alert("Applied to job successfully!");
    } catch (error) {
      console.error("Error applying to job:", error);
      alert("An error occurred while applying to the job.");
    }
  };
  

    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Apply To Job " />

            <div className="ptb-80">
                <div className="container">
                    <div className="auth-form">
                        <div className="auth-head">
                            
                            <p>Send mail</p>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Put your mail here</label>
                                <input type="text" value={email} onChange={handleEmailChange} className="form-control"  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Upload CV File</label>
                                <input type="file" onChange={handleFileChange} className="form-control"  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description/Motivation Letter</label>
                                <textarea value={description} onChange={handleDescriptionChange} className="form-control"  />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">This is the company Mail:</label>
                                <input  type="text"
                                        name="mail"
                                        value={mail} // Use the value attribute to set the input value from the mail state
                                        onChange={handleMailChange} // Update the mail state when the input value changes
                                        required
                                        disabled className="form-control" />
                            </div>

                            <button type="submit" className="btn btn-primary">Apply</button>
                        </form>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export default applyjob
