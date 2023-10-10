
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import countries from "countries";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";


const Updateprofile = () => {
  
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [userProfile, setUserProfile] = useState({
    nom: "",
    prenom: "",
    email: "",
    localisation: "",
    work_experience: "",
    work_experience_duree: "",
    education: "",
    education_duree: "",
    skills: "",
    languages: "",
    certifications_and_licenses: "",
    links: "",
    motivation_letter: "",
    profession: "",
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    photo:"",
  });

  const handlePhotoUpdate = (e) => {
  const newPhoto = e.target.files[0]; // Get the selected file
  setUserProfile({ ...userProfile, photo: newPhoto }); // Update the userProfile state with the new photo
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/auth/profile",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.status === 200) {
          const userProfileData = response.data;
          setUserProfile(userProfileData);
          
          // Check if work experiences exist in the userProfileData
          if (userProfileData.work_experience) {
            const workExperiencesArray = userProfileData.work_experience.split(", ");
            const workDurationsArray = userProfileData.work_experience_duree.split(", ");
            const workExperiencesData = workExperiencesArray.map((experience, index) => ({
              experience: experience,
              duration: workDurationsArray[index] || "",
            }));
            setWorkExperiences(workExperiencesData);
          }

          

          // Check if education exists in the userProfileData
          if (userProfileData.education) {
            const educationsArray = userProfileData.education.split(", ");
            const educationDurationsArray = userProfileData.education_duree.split(", ");
            const educationsData = educationsArray.map((education, index) => ({
              name: education,
              duration: educationDurationsArray[index] || "",
            }));
            setEducations(educationsData);
          }

          // Check if skills exist in the userProfileData
          if (userProfileData.skills) {
            setSkills(userProfileData.skills.split(", "));
          }

          // Check if languages exist in the userProfileData
          if (userProfileData.languages) {
            setLanguages(userProfileData.languages.split(", "));
          }

          // Check if certifications exist in the userProfileData
          if (userProfileData.certifications_and_licenses) {
            setCertifications(userProfileData.certifications_and_licenses.split(", "));
          }

         
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUserProfileChange = (name, value) => {
    setUserProfile({ ...userProfile, [name]: value });
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const authToken = localStorage.getItem("token");
    const formData = new FormData(event.target);
    const nom = event.target[0].value;
    const email = event.target[1].value;
    const localisation = event.target[2].value;
    
    // Convert workExperiencesArray and workExperienceDurationsArray to comma-separated strings
    const work_experience = workExperiences
      .map((exp) => exp.experience)
      .join(", ");
    const work_experience_duree = workExperiences
      .map((exp) => exp.duration)
      .join(", ");

    // Convert educationsArray and educationDurationsArray to comma-separated strings
    const education = educations
      .map((edu) => edu.name)
      .join(", ");
    const education_duree = educations
      .map((edu) => edu.duration)
      .join(", ");

    // Convert skills to a comma-separated string
    const skillsString = skills.join(", ");

    // Convert languages to a comma-separated string
    const languagesString = languages.join(", ");

    // Convert certifications to a comma-separated string
    const certificationsString = certifications.join(", ");

    // Convert links to a comma-separated string
    

    formData.append("work_experience", work_experience);
    formData.append("work_experience_duree", work_experience_duree);
    formData.append("education", education);
    formData.append("education_duree", education_duree);
    formData.append("skills", skillsString);
    formData.append("languages", languagesString);
    formData.append("certifications_and_licenses", certificationsString);
    

    const currentPhoto = userProfile.photo;

    // If no new file is selected, append the current photo value to the formData
    if (!formData.get("photo")) {
      formData.append("photo", currentPhoto);
    }
    try {
      const response = await axios.put(
        "http://localhost:3001/api/auth/profile",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Profile updated successfully");
        setError(null);
        router.push("/profile");
      }
    } catch (error) {
      setSuccess(null);
      setError("Something went wrong during profile update. Please try again.");
    }
  };
  
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const [workExperiences, setWorkExperiences] = useState([
    { experience: "", duration: "" }, // Initial empty entry
  ]);

  const handleExperienceChange = (index, experience) => {
    setWorkExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].experience = experience;
      return updatedExperiences;
    });
  };
  
  const handleDurationChange = (index, duration) => {
    setWorkExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences[index].duration = duration;
      return updatedExperiences;
    });
  };

  const handleAddExperience = () => {
    setWorkExperiences((prevExperiences) => {
      console.log("Previous Experiences:", prevExperiences);
      const updatedExperiences = [...prevExperiences, { experience: "", duration: "" }];
      console.log("Updated Experiences:", updatedExperiences);
      return updatedExperiences;
    });
  };
  
  const handleRemoveExperience = (index) => {
    setWorkExperiences((prevExperiences) => {
      const updatedExperiences = [...prevExperiences];
      updatedExperiences.splice(index, 1);
      return updatedExperiences;
    });
  };

  const [educations, setEducations] = useState([
    { name: "", duration: "" }, // Initial empty entry
  ]);

  const handleEducationChange = (index, name) => {
    setEducations((prevEducations) => {
      const updatedEducations = [...prevEducations];
      updatedEducations[index].name = name;
      return updatedEducations;
    });
  };

  const handleEducationDurationChange = (index, duration) => {
    setEducations((prevEducations) => {
      const updatedEducations = [...prevEducations];
      updatedEducations[index].duration = duration;
      return updatedEducations;
    });
  };

  const handleAddEducation = () => {
    setEducations((prevEducations) => [
      ...prevEducations,
      { name: "", duration: "" },
    ]);
  };

  const handleRemoveEducation = (index) => {
    setEducations((prevEducations) => {
      const updatedEducations = [...prevEducations];
      updatedEducations.splice(index, 1);
      return updatedEducations;
    });
  };

  const [skills, setSkills] = useState([""]);

  const handleSkillChange = (index, skill) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills[index] = skill;
      return updatedSkills;
    });
  };

  const handleAddSkill = () => {
    setSkills((prevSkills) => [...prevSkills, ""]);
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) => {
      const updatedSkills = [...prevSkills];
      updatedSkills.splice(index, 1);
      return updatedSkills;
    });
  };

  const [languages, setLanguages] = useState([""]);

  const handleLanguageChange = (index, language) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[index] = language;
      return updatedLanguages;
    });
  };

  const handleAddLanguage = () => {
    setLanguages((prevLanguages) => [...prevLanguages, ""]);
  };

  const handleRemoveLanguage = (index) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages.splice(index, 1);
      return updatedLanguages;
    });
  };

  const [certifications, setCertifications] = useState([""]);

  const handleCertificationChange = (index, certification) => {
    setCertifications((prevCertifications) => {
      const updatedCertifications = [...prevCertifications];
      updatedCertifications[index] = certification;
      return updatedCertifications;
    });
  };

  const handleAddCertification = () => {
    setCertifications((prevCertifications) => [...prevCertifications, ""]);
  };

  const handleRemoveCertification = (index) => {
    setCertifications((prevCertifications) => {
      const updatedCertifications = [...prevCertifications];
      updatedCertifications.splice(index, 1);
      return updatedCertifications;
    });
  };


  return (
    <>
      <Navbar />
      <PageBanner pageTitle="Curriculum vitae (CV)" />
      <div className="checkout-area ptb-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <div className="user-actions">
                <Icon.Edit />
                <span>You have to create a CV</span>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12">
              <div className="billing-details">
                <h3 className="title">CV Details</h3>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Last Name <span className="required">*</span></label>
                        <input
                              type="text"
                              className="form-control"
                              required
                              name="nom"
                              value={userProfile.nom}
                              onChange={(e) => setUserProfile({ ...userProfile, nom: e.target.value })}
                            />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>First Name <span className="required">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="prenom"
                          value={userProfile.prenom}
                          onChange={(e) => setUserProfile({ ...userProfile, prenom: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Country <span className="required">*</span></label>
                        <div className="select-box">
                          <select
                            className="form-select"
                            required
                            name="localisation"
                            value={userProfile.localisation}
                            onChange={(e) => setUserProfile({ ...userProfile, localisation: e.target.value })}
                          >
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

              

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Profession <span className="required">*</span></label>
                        <input
                          type="text"
                          className="form-control"
                          required
                          name="profession"
                          value={userProfile.profession}
                          onChange={(e) => setUserProfile({ ...userProfile, profession: e.target.value })}
                        />
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
                                value={exp.experience} // Make sure exp.experience is defined
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
                              <label>Certifications and Licenses <span className="required">*</span></label>
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
                    
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Facebook Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="facebook"
                          value={userProfile.facebook}
                          onChange={(e) => setUserProfile({ ...userProfile, facebook: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Twitter Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="twitter"
                          value={userProfile.twitter}
                          onChange={(e) => setUserProfile({ ...userProfile, twitter: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>LinkedIn Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="linkedin"
                          value={userProfile.linkedin}
                          onChange={(e) => setUserProfile({ ...userProfile, linkedin: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="form-group">
                        <label>Instagram Link</label>
                        <input
                          type="text"
                          className="form-control"
                          name="instagram"
                          value={userProfile.instagram}
                          onChange={(e) => setUserProfile({ ...userProfile, instagram: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                      <div className="form-group">
                        <label>Motivation letter : <span className="required">*</span></label>
                        <textarea
                          type="text"
                          className="form-control"
                          required
                          name="motivation_letter"
                          value={userProfile.motivation_letter}
                          onChange={(e) => setUserProfile({ ...userProfile, motivation_letter: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Upload Photo :</label>
                      
                      <input
                        type="file"
                        name="photo"
                        accept="image/*"
                        onChange={(e) => handlePhotoUpdate(e)} // Passing the event object 'e'
                      />

                                            
                    </div>

                  </div>
                  <div>
                    <button type="submit" className="btn btn-primary">
                      Update my profile 
                    </button>
                  </div>
                  <div>
                    {error && <p className="text-danger">{error}</p>}
                    {success && <p className="text-success">{success}</p>}
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
};

export default Updateprofile;