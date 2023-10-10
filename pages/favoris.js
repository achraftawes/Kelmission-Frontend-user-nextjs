import React, { useEffect, useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import * as Icon from 'react-feather';
import Link from 'next/link';
import axios from 'axios';
 
const Favoris = () => {
    const [favoriteJobs, setFavoriteJobs] = useState([]);

    const fetchFavoris = async () => {
        try {
          const response = await axios.get('http://localhost:3001/api/job/get_favorites', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
    
          setFavoriteJobs(response.data.favorites);
        } catch (error) {
          console.error('Error fetching favoris:', error);
        }
      };
    
      useEffect(() => {
        fetchFavoris();
      }, []);

      const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
      
        return `${year}-${month}-${day} at ${hours}:${minutes}`;
      };

    return (
        <>
            <Navbar />
            <PageBanner pageTitle="Favoris" />
            <div className="blog-area ptb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        {favoriteJobs.length === 0 ? (
                            <p>No favorite jobs to display.</p>
                        ) : (
                            favoriteJobs.map((job, index) => (
                                <div className="col-lg-4 col-md-6" key={index}>
                                    <div className="single-blog-post">
                                        <div className="blog-image">
                                            <div className="date">
                                                <Icon.Calendar /> {formatDate(job.date)}
                                            </div>
                                        </div>
                                        <div className="blog-post-content">
                                            <h3>
                                                <Link href={`/job-details/${job.job_id}`}>
                                                    {job.titles}
                                                </Link>
                                            </h3>
                                            <span>By <Link href="#">{job.company}</Link></span>
                                            <p>{job.job_description}</p>
                                            <Link href={`/blog-details?job_id=${job.job_id}`} className="read-more-btn">
                                                Read More <Icon.ArrowRight />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        
                        {/* Pagination */}
                        <div className="col-lg-12 col-md-12">
                            <div className="pagination-area">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Favoris;