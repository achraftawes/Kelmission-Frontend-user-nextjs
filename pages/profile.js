
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import ProductCard from '@/components/Shop/ProductCard';
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ProductsDetailsTabs from "@/components/Shop/ProductsDetailsTabs";
import * as Icon from "react-feather";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';


const Shop = () => {
    const [userProfile, setUserProfile] = useState(null);
  const router = useRouter();
const [links, setLinks] = useState({
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
});
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Make the API request to fetch the user profile data
        const response = await axios.get("http://localhost:3001/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.status === 200 ) {
          setUserProfile(response.data);
          setLinks({
            facebook: response.data.facebook.replace(/\)/g, ""),
            twitter: response.data.twitter.replace(/\)/g, ""),
            linkedin: response.data.linkedin.replace(/\)/g, ""),
            instagram: response.data.instagram.replace(/\)/g, ""),
          });
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = () => {
    router.push("/updateprofile"); // Replace "/update-profile" with the actual route of your update profile page
  };

 const openSocialMedia = (platform) => {
  if (userProfile) {
    const socialMediaLinks = {
      facebook: userProfile.facebook,
      twitter: userProfile.twitter,
      linkedin: userProfile.linkedin ,
      instagram: userProfile.instagram,
    };

    const link = socialMediaLinks[platform];

    if (link) {
      console.log("Opening link:", link); // Add this line to debug
      window.open(link, "_blank");
    } else {
      console.log(`No ${platform} link found.`);
    }
  }
};

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  
  
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
            <Navbar />

            <PageBanner pageTitle="Profile" /> 
            {userProfile && (
            <div className="shop-details-area ptb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                        {userProfile.photo ? (
                            <Image
                            src={`http://localhost:3001/uploads/${userProfile.photo}`}
                            alt="Profile Image"
                            width={500}
                            height={500}
                            />
                        ) : (
                            <div>No Profile Image</div>
                        )}
                        </div>

                        <div className="col-lg-7">
                            <div className="products-details">
                                <h3>{userProfile.nom} {userProfile.prenom}</h3>

                                <div className="price">{userProfile.profession}</div>

                                

                                <p>{userProfile.motivation_letter}</p>

                                <div className="availability">
                                <h6> Mail  :</h6> {userProfile.email}  <Icon.Mail />
                                </div>


                                {token ? (
                                <form onSubmit={(e) => e.preventDefault()}>
                                <button type="submit" onClick={handleUpdateProfile}>
                                  Update my profile
                                </button>
                                </form>
                                 ) : (
                                    <>

                                    </>
                                  )} 
                                <div className="products-share-social">
                                  <span>Share:</span>
                                  <ul>
                                    <li>
                                    <a onClick={() => openSocialMedia("facebook")} className="facebook">
                                      <Icon.Facebook /> 
                                    </a>
                                    </li>
                                    <li>
                                      <a onClick={() => openSocialMedia("twitter")} className="twitter">
                                        <Icon.Twitter />
                                      </a>
                                    </li>
                                    <li>
                                      <a onClick={() => openSocialMedia("linkedin")} className="linkedin">
                                        <Icon.Linkedin />
                                      </a>
                                    </li>
                                    <li>
                                      <a onClick={() => openSocialMedia("instagram")} className="instagram">
                                        <Icon.Instagram />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                        </div>
                        </div>

                <div className="col-lg-12 col-md-12">
                <ProductsDetailsTabs />
                </div>
                </div>
                </div>
            </div>
            )}
      <Footer />
    </>
  );
}

export default Shop;