import React, { useEffect, useState } from "react";
import * as Icon from 'react-feather';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import axios from "axios";
import Image from "next/image";
const Team = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/auth/search", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                if (response.status === 200 && Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Invalid API response:', response);
                    setUsers([]); // Set users to an empty array if the response is not as expected
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setUsers([]); // Set users to an empty array in case of an error
            }
        };

        fetchUsers();
    }, []);

    const openSocialMedia = (platform, link) => {
        if (link) {
            window.open(link, "_blank");
        }
    };

    return (
        <>
        <div className="team-area ptb-80 bg-f9f6f6">
            <div className="container">
                <div className="section-title">
                    <h2>Our Awesome Customers</h2>
                    <div className="bar"></div>
                    <p>When we support each other incredible things can happen.</p>
                </div>
            </div>

                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    autoplay={{
                        delay: 6000,
                        pauseOnMouseEnter: true,
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        576: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1200: {
                            slidesPerView: 4,
                        },
                        1500: {
                            slidesPerView: 5,
                        },
                    }}
                    modules={[Pagination, Autoplay]}
                    className="team-slider"
                >

                {users.length === 0 ? (
                    <SwiperSlide>
                        <div>No users found.</div>
                    </SwiperSlide>
                ) : (
                    users.map((user, index) => (
                        <SwiperSlide key={index}>
                            <div className="single-team">
                                <div className="team-image">
                                {user.photo ? (
                                    <Image
                                    src={`http://localhost:3001/uploads/${user.photo}`}
                                    alt="Profile Image"
                                    width={132}
                                    height={134}
                                    />
                                    ) : (
                                    <div>No Profile Image</div>
                                )}
                                </div>
                            
                                <div className="team-content">
                                    <div className="team-info">
                                        <h3>{user.nom} {user.prenom}</h3>
                                        <span>{user.profession}</span>
                                    </div>
                                    <ul>
                                        <li>
                                            <a href={user.facebook} target="_blank">
                                                <Icon.Facebook />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={user.twitter} target="_blank">
                                                <Icon.Twitter />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={user.linkedin} target="_blank">
                                                <Icon.Linkedin />
                                            </a>
                                        </li>
                                        <li>
                                            <a href={user.instagram} target="_blank">
                                                <Icon.Instagram />
                                            </a>
                                        </li>
                                    </ul>
                                    
                                </div>
                            </div>
                        </SwiperSlide>
                        
                    ))
                )}
                <SwiperSlide>
                        <div className="single-team">
                            <div className="team-image">
                                <img src="/images/team-image/team2.jpg" alt="image" />
                            </div>

                            <div className="team-content">
                                <div className="team-info">
                                    <h3>Alex Maxwel</h3>
                                    <span>Marketing Manager</span>
                                </div>

                                <ul>
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <Icon.Facebook />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.twitter.com/" target="_blank">
                                            <Icon.Twitter />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/" target="_blank">
                                            <Icon.Linkedin />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.gitlab.com/" target="_blank">
                                            <Icon.Gitlab />
                                        </a>
                                    </li>
                                </ul>

                               
                            </div>
                        </div>
                    </SwiperSlide>
                    
                    <SwiperSlide>
                        <div className="single-team">
                            <div className="team-image">
                                <img src="/images/team-image/team3.jpg" alt="image" />
                            </div>

                            <div className="team-content">
                                <div className="team-info">
                                    <h3>Janny Cotller</h3>
                                    <span>Web Developer</span>
                                </div>

                                <ul>
                                    <li>
                                        <a href="https://www.facebook.com/" target="_blank">
                                            <Icon.Facebook />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.twitter.com/" target="_blank">
                                            <Icon.Twitter />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.linkedin.com/" target="_blank">
                                            <Icon.Linkedin />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="https://www.gitlab.com/" target="_blank">
                                            <Icon.Gitlab />
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </SwiperSlide>
            </Swiper>
        </div>
        
        </>
        
    );
};

export default Team;
