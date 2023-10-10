import React from 'react';
import * as Icon from 'react-feather';

const ContactInfo = () => {
    return (
        <>
            <div className="contact-info-area ptb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.Mail />
                                </div>
                                <h3>Mail Here</h3>
                                <p><a href="mailto:admin@startp.com">Kelmission7@gmail.com</a></p>
                                
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.MapPin />
                                </div>
                                <h3>Visit Here</h3>
                                <p>City Agba Monastir 5000, Tunisie</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="contact-info-box">
                                <div className="icon">
                                    <Icon.Phone />
                                </div>
                                <h3>Call Here</h3>
                                <p><a href="tel:+1234567890">+216 54 463 755</a></p>
                                <p><a href="tel:+2414524526">+213 73 535 302</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactInfo;  