import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Team from "@/components/Common/Team";
import FunFactsArea from "@/components/Common/FunFactsArea";
import Partner from "@/components/Common/Partner";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';

const About1 = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="About Us" />

            <div className="about-area ptb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="about-image">
                                <img src="/images/about-one.png" alt="image" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="about-content">
                                <div className="section-title">
                                    <h2>About Us</h2>
                                    <div className="bar"></div>
                                    <p>At Kelmission, we are driven by a singular vision: to revolutionize the way individuals and organizations connect with opportunities. Founded on the principles of innovation, integrity, and empowerment, Kelmission is your trusted partner in the journey towards professional growth and success.</p>
                                </div>

                                
                            </div>
                        </div>
                    </div>

                    <div className="about-inner-area">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="about-text">
                                    <h3>Our History</h3>
                                    <p>Kelmission has a rich and dynamic history that spans over 1 years. Founded in 2023, we embarked on a journey with a clear vision: to empower individuals and organizations by connecting them with opportunities that drive success. Over the years, we've evolved and adapted, staying at the forefront of technological advancements and industry trends. Today, we're proud to be a trusted partner for Kelmission professionals, offering cutting-edge solutions that have a lasting impact.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="about-text">
                                    <h3>Our Mission</h3>
                                    <p>Our mission at Kelmission is simple yet powerful: to empower your journey toward professional growth and success. We are dedicated to providing [industry/niche]-specific solutions that streamline processes, foster growth, and deliver tangible results. By understanding your unique needs and challenges, we aim to be your catalyst for positive change.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 col-sm-6">
                                <div className="about-text">
                                    <h3>Who We Are</h3>
                                    <p>At Kelmission, we are more than just a company; we are a passionate and dedicated team of experts who are driven by innovation and a commitment to excellence</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Team />

            

            <FunFactsArea />
            
            <Footer />
        </>
    )
}

export default About1;