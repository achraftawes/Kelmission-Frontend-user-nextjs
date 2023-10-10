
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import countries from "countries";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const Cv = () => {

    const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [facebookLink, setFacebookLink] = useState(""); // Separate state for Facebook link
  const [twitterLink, setTwitterLink] = useState(""); // Separate state for Twitter link
  const [linkedinLink, setLinkedinLink] = useState(""); // Separate state for LinkedIn link
  const [instagramLink, setInstagramLink] = useState(""); // Separate state for Instagram link

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("token");
    
    const nom = event.target[0].value;
    const prenom = event.target[1].value;
    const localisation = event.target[2].value;
    const profession = event.target[3].value;
    // Convert workExperiencesArray and workExperienceDurationsArray to comma-separated strings
    const work_experience = workExperiences
      .map((exp) => exp.experience)
      .join(", ");
    const work_experience_duree = workExperiences
      .map((exp) => exp.duration)
      .join(", ");

    // Get the values of education and education_duree inputs directly
    const education = educations.map((edu) => edu.name).join(", ");
    const education_duree = educations.map((edu) => edu.duration).join(", ");

    const skillsString = skills.join(", ");
  const languagesString = languages.join(", ");
  const certificationsString = certifications.join(", ");
  
    try {
      // Make the API request to save the CV data
      const response = await axios.post(
        "http://localhost:3001/api/cv/create_cv",
        {
          nom,
          prenom,
          localisation,
          profession,
          work_experience,
          work_experience_duree,
          education,
          education_duree,
          skills: skillsString, // Use the skillsString variable here
          languages: languagesString,
          certifications_and_licenses: certificationsString,
          
          facebook: facebookLink,
          twitter: twitterLink,
          linkedin: linkedinLink,
          instagram: instagramLink,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Success create CV"); // Set the success message
        setError(null); // Clear any previous error
        setTimeout(() => {
          router.push("/profile");
           
        }, 1000);
        //router.push("/shop");
      }
    } catch (error) {
      setSuccess(null); // Clear any previous success message
      setError(
        "Something went wrong during create CV, check your profile if you have already CV OR try again"
      ); // Set the error message
    }
  };

  const [workExperiences, setWorkExperiences] = useState([
    { experience: "", duration: "" }, // Initial empty entry
  ]);

  const handleExperienceChange = (index, experience) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index].experience = experience;
    setWorkExperiences(updatedExperiences);
  };

  const handleDurationChange = (index, duration) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences[index].duration = duration;
    setWorkExperiences(updatedExperiences);
  };

  const handleAddExperience = () => {
    setWorkExperiences((prevExperiences) => [
      ...prevExperiences,
      { experience: "", duration: "" },
    ]);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...workExperiences];
    updatedExperiences.splice(index, 1);
    setWorkExperiences(updatedExperiences);
  };

  const [educations, setEducations] = useState([{ name: "", duration: "" }]);

  const handleEducationChange = (index, name) => {
    const updatedEducations = [...educations];
    updatedEducations[index].name = name;
    setEducations(updatedEducations);
  };

  const handleEducationDurationChange = (index, duration) => {
    const updatedEducations = [...educations];
    updatedEducations[index].duration = duration;
    setEducations(updatedEducations);
  };

  const handleAddEducation = () => {
    setEducations((prevEducations) => [
      ...prevEducations,
      { name: "", duration: "" },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const [skills, setSkills] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [certifications, setCertifications] = useState([""]);
  //const [links, setLinks] = useState([""]);
  const [profession, setProfession] = useState([""]);
  
  // Initialize the links state as an object with platform keys
  const [links, setLinks] = useState({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  });
  

  
  // Update the handleLinkChange function to accept a platform argument
  const handleLinkChange = (platform, link) => {
    setLinks((prevLinks) => ({
      ...prevLinks,
      [platform]: link,
    }));
  };
  


  /////
  const handleSkillChange = (index, skill) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = skill;
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, ""]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = [...skills];
    updatedSkills.splice(index, 1);
    setSkills(updatedSkills);
  };

  const handleLanguageChange = (index, language) => {
    const updatedLanguages = [...languages];
    updatedLanguages[index] = language;
    setLanguages(updatedLanguages);
  };

  const handleAddLanguage = () => {
    setLanguages((prevLanguages) => [...prevLanguages, ""]);
  };

  const handleRemoveLanguage = (index) => {
    const updatedLanguages = [...languages];
    updatedLanguages.splice(index, 1);
    setLanguages(updatedLanguages);
  };

  const handleCertificationChange = (index, certification) => {
    const updatedCertifications = [...certifications];
    updatedCertifications[index] = certification;
    setCertifications(updatedCertifications);
  };

  const handleAddCertification = () => {
    setCertifications((prevCertifications) => [...prevCertifications, ""]);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...certifications];
    updatedCertifications.splice(index, 1);
    setCertifications(updatedCertifications);
  };

 // const handleLinkChange = (index, link) => {
    //const updatedLinks = [...links];
   // updatedLinks[index] = link;
    //setLinks(updatedLinks);
 // };

  const handleAddLink = () => {
    setLinks((prevLinks) => [...prevLinks, ""]);
  };

  const handleRemoveLink = (index) => {
    const updatedLinks = [...links];
    updatedLinks.splice(index, 1);
    setLinks(updatedLinks);
  };

  return (
    <>
      <Navbar />
      <PageBanner pageTitle="Crriculum vitae (CV)" />
      <div className="checkout-area ptb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="user-actions">
                <Icon.Edit />
                <span>You have to create a cv  </span>
              </div>
            </div>
          </div>
          
            <div className="row">
              <div className="col-lg-6 col-md-12">
                <div className="billing-details">
                  <h3 className="title">Cv Details</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Last Name <span className="required">*</span></label>
                          <input type="text" className="form-control" required/>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>First Name <span className="required">*</span></label>
                          <input type="text" className="form-control" required />
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12">
                        <div className="form-group">
                          <label>Country <span className="required">*</span></label>
                          <div className="select-box">
                            <select className="form-select" required>
                              <option value="United Arab Emirates">United Arab Emirates</option>
                              <option value="China">China</option>
                              <option value="United Kingdom">United Kingdom</option>
                              <option value="Germany">Germany</option>
                              <option value="France">France</option>
                              <option value="Japan">Japan</option>
                              <option value="Tunisia">Tunisia</option>
                              <option value="India">India</option>
                              <option value="Russia">Russia</option>
                              <option value="Algerie">Algerie</option>
                              <option value="Maroc">Maroc</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="form-group">
                          <label>Profession <span className="required">*</span></label>
                          <input type="text" className="form-control" required/>
                        </div>
                      </div>


                      {workExperiences.map((exp, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Work Experience <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                value={exp.experience}
                                onChange={(e) => handleExperienceChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Work Experience Duration <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                value={exp.duration}
                                onChange={(e) => handleDurationChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="removeButton"
                                  onClick={() => handleRemoveExperience(index)}
                                >
                                  -
                                </button>
                              )}
                              <button
                                type="button"
                                className="addButton"
                                onClick={handleAddExperience}
                              >
                                +
                              </button>

                            </div>
   
                      ))}

                      {educations.map((edu, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Education <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                value={edu.name}
                                onChange={(e) => handleEducationChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Education Duration <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                value={edu.duration}
                                onChange={(e) => handleEducationDurationChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="removeButton"
                                  onClick={() => handleRemoveEducation(index)}
                                >
                                  -
                                </button>
                              )}
                              <button
                                type="button"
                                className="addButton"
                                onClick={handleAddEducation}
                              >
                                +
                              </button>

                            </div>
   
                      ))}


                      {skills.map((skill, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Skills <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                
                                
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          
                          
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="removeButton"
                                  onClick={() => handleRemoveSkill(index)}
                                >
                                  -
                                </button>
                              )}
                              <button
                                type="button"
                                className="addButton"
                                onClick={handleAddSkill}
                              >
                                +
                              </button>

                            </div>
   
                      ))}         


                      {languages.map((language, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Languages <span className="required">*</span></label>
                              <input
                                type="text"
                                className="form-control"
                                required
                                value={language}
                                onChange={(e) => handleLanguageChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          
                          
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="removeButton"
                                  onClick={() => handleRemoveLanguage(index)}
                                >
                                  -
                                </button>
                              )}
                              <button
                                type="button"
                                className="addButton"
                                onClick={handleAddLanguage}
                              >
                                +
                              </button>

                            </div>
   
                      ))}       


                      {certifications.map((certification, index) => (
                        <div key={index} className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <label>Certifications and Licenses</label>
                              <input
                                type="text"
                                className="form-control"
                                
                                value={certification}
                                onChange={(e) => handleCertificationChange(index, e.target.value)}
                              />
                            </div>
                          </div>
                          
                          
                              {index > 0 && (
                                <button
                                  type="button"
                                  className="removeButton"
                                  onClick={() => handleRemoveCertification(index)}
                                >
                                  -
                                </button>
                              )}
                              <button
                                type="button"
                                className="addButton"
                                onClick={handleAddCertification}
                              >
                                +
                              </button>

                            </div>
   
                        ))}      


                              
<div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Facebook Link</label>
                        <input
                          type="text"
                          className="form-control"
                          value={facebookLink}
                          onChange={(e) => setFacebookLink(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Twitter Link</label>
                        <input
                          type="text"
                          className="form-control"
                          value={twitterLink}
                          onChange={(e) => setTwitterLink(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>LinkedIn Link</label>
                        <input
                          type="text"
                          className="form-control"
                          value={linkedinLink}
                          onChange={(e) => setLinkedinLink(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Instagram Link</label>
                        <input
                          type="text"
                          className="form-control"
                          value={instagramLink}
                          onChange={(e) => setInstagramLink(e.target.value)}
                        />
                      </div>
                    </div>
                    </div>
                      </div>
                    <>
                    <button type="submit" className="btn btn-primary" >
                                    Create CV
                    </button>    
                    </>
                    <div>
                    {error && <p className="text-danger">{error}</p>} {/* Display the error message */}
                {success && <p className="text-success">{success}</p>} {/* Display the success message */}
     
                     </div>        
                  </form>
                </div>
              </div>
            </div>
          
        </div>
      </div>
      <Footer />
    </>
  );
  
}

export default Cv;