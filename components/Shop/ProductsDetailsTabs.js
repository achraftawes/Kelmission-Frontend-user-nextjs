import React, { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

const ProductsDetailsTabs = () => {

    const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make the API request to fetch the user profile data
        const response = await axios.get("http://localhost:3001/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200) {
          setUserProfile(response.data);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);


  return (
    <>
      {userProfile ? (
        <div className="products-details-tabs">
          <Tabs>
            <TabList>
              <Tab>Motivation lettre</Tab>
              <Tab>Detail Information</Tab>
            </TabList>

            <TabPanel>
              <div className="products-description">
                <p>{userProfile.motivation_letter || 'No motivation letter available'}</p>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="products-description">
              <div className="auth-head">
                
                <p>Don't have a cv yet? <Link href="/cv">Create Cv</Link></p>
              </div>
                <ul className="additional-information">
                  <li><span>Location</span> {userProfile.localisation || 'Not specified'}</li>
                  <li>
                    <span>Work Experience</span>
                    {(userProfile.work_experience ? userProfile.work_experience.split(', ') : []).map((exp, index) => (
                      <React.Fragment key={index}>
                        {exp} ({(userProfile.work_experience_duree ? userProfile.work_experience_duree.split(', ')[index] : '')})
                        {index < userProfile.work_experience.split(', ').length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </li>
                  <li>
                    <span>Education</span>
                    {(userProfile.education ? userProfile.education.split(', ') : []).map((edu, index) => (
                      <React.Fragment key={index}>
                        {edu} ({(userProfile.education_duree ? userProfile.education_duree.split(', ')[index] : '')})
                        {index < userProfile.education.split(', ').length - 1 && ', '}
                      </React.Fragment>
                    ))}
                  </li>
                  <li><span>Skills</span> {userProfile.skills || 'Not specified'}</li>
                  <li><span>Languages</span> {userProfile.languages || 'Not specified'}</li>
                  <li><span>Certifications and Licenses</span> {userProfile.certifications_and_licenses || 'Not specified'}</li>
                </ul>
              </div>
            </TabPanel>
          </Tabs>
        </div>
      ) : (
        <p>Loading user profile...</p>
      )}
    </>
  )
}

export default ProductsDetailsTabs;