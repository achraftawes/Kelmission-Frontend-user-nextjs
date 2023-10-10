
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import * as Icon from 'react-feather';
import Link from 'next/link';
import BlogSidebar from '@/components/Blog/BlogSidebar';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import axios from "axios"; // Import axios
import Image from "next/image";


const Blog4 = () => {

    const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 12; 

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
// Count speciality occurrences
        const specialityCounts = countSpecialityOccurrences(response.data);
      setJobs(response.data);
      setSpecialityCounts(specialityCounts);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  

  const filteredJobs = jobs.filter((job) => {
    const mail = job.mail.toLowerCase();
    const num = job.num.toLowerCase();
    const speciality = job.speciality.toLowerCase();
    const search = searchTerm.toLowerCase();

    return mail.includes(search) || num.includes(search) || speciality.includes(search);
  });
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return `${year}-${month}-${day} at ${hours}:${minutes}`;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when performing a new search
  };

  const [popularPosts, setPopularPosts] = useState([]);

  useEffect(() => {
    async function fetchAndSetPopularPosts() {
      const popularPostsData = await fetchPopularPosts();
      setPopularPosts(popularPostsData);
    }
  
    fetchAndSetPopularPosts();
  }, []);

  const fetchPopularPosts = async () => {
    try {
      // Fetch both jobs and favorites data
      const [jobsResponse, favoritesResponse] = await Promise.all([
        axios.get('http://localhost:3001/api/job/get_jobs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
        axios.get('http://localhost:3001/api/job/get_favorites', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }),
      ]);
  
      const jobsData = jobsResponse.data;
      const favoritesData = favoritesResponse.data.favorites;
  
      // Calculate and store the number of favorites for each job
      const jobsWithFavorites = jobsData.map((job) => ({
        ...job,
        favoritesCount: favoritesData.filter((fav) => fav.job_id === job.job_id).length,
      }));
  
      // Sort the jobs by the number of favorites in descending order
      const sortedJobs = jobsWithFavorites.sort((a, b) => b.favoritesCount - a.favoritesCount);
  
      // Slice the top 3 popular posts
      const popularPosts = sortedJobs.slice(0, 3);
  
      return popularPosts;
    } catch (error) {
      console.error('Error fetching popular posts:', error);
      return [];
    }
  };

  const countSpecialityOccurrences = (jobsData) => {
    // Extract speciality data from the jobsData
    const specialitiesData = jobsData.map((job) => job.speciality);
  
    // Count the occurrences of each speciality
    const specialityCounts = specialitiesData.reduce((counts, speciality) => {
      counts[speciality] = (counts[speciality] || 0) + 1;
      return counts;
    }, {});
  
    return specialityCounts;
  };

  const [tagCounts, setTagCounts] = useState({}); // Initialize tagCounts state

useEffect(() => {
    const fetchAndSetTagCounts = async () => {
        const tagCountsData = await fetchTagCounts();
        const top6TagCounts = Object.entries(tagCountsData)
          .sort(([, a], [, b]) => b - a) // Sort by count in descending order
          .slice(0, 6) // Take the top 6 specialties
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {});
        setTagCounts(top6TagCounts);
      };

  fetchAndSetTagCounts();
}, []);

const fetchTagCounts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/job/get_jobs', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const tagCounts = countSpecialityOccurrences(response.data);
      return tagCounts;
    } catch (error) {
      console.error('Error fetching tag counts:', error);
      return {};
    }
  };
  
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Find Jobs here" />

            <div className="blog-area ptb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="row">

                            {currentJobs.map((job) => (
                                <div className="col-lg-6 col-md-6">
                                    <div className="single-blog-post-box">
                                        <div className="entry-thumbnail">
                                            <Link href={`/blog-details?job_id=${job.job_id}`} >
                                                <img src="/images/blog-image/blog9.jpg" alt="image" />
                                            </Link>
                                            
                                        </div>

                                        <div className="entry-post-content">
                                            <div className="entry-meta">
                                                <ul>
                                                    <li><Link href="#">Admin</Link></li>
                                                    <li>{formatDate(job.date)}</li>
                                                </ul>
                                            </div>

                                            <h3>
                                                <Link href={`/blog-details?job_id=${job.job_id}`} >
                                                {job.titles}
                                                </Link>
                                            </h3>
    

                                            <Link href={`/blog-details?job_id=${job.job_id}`}  className="learn-more-btn">
                                                Read  <Icon.Plus />
                                            </Link>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                                ))}


                            

                                {/* Pagination */}
                                <div className="col-lg-12 col-md-12">
                                    <div className="pagination-area">
                                        <nav aria-label="Page navigation">
                                            <ul className="pagination justify-content-center">
                                                <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                                

                                                {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }).map((_, index) => (
                                                <button key={index} onClick={() => paginate(index + 1)}  className="page-link">{index + 1}</button>
                                                ))}
                                                
                                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                        <div className="widget-area" id="secondary">
                <div className="widget widget_search">
                    <form className="search-form">
                        <label>
                            <input 
                            type="text"  
                            value={searchTerm}
                            onChange={handleSearch} 
                            className="search-field" 
                            placeholder="Search..." />
                        </label>
                        <button type="submit">
                            <Icon.Search />
                        </button>
                    </form>
                </div>

                <div className="widget widget_startp_posts_thumb">
                    <h3 className="widget-title">Popular Posts</h3>

                    {popularPosts.map((post, index) => (
                        <article className="item" key={index}>
                        <Link href={`/blog-details?job_id=${post.job_id}`} className="thumb">
                            <span className={`fullimage cover bg${index + 1}`} role="img"></span>
                        </Link>
                        <div className="info">
                            <time>{formatDate(post.date)}</time>
                            <h4 className="title usmall">
                            <Link href={`/blog-details?job_id=${post.job_id}`}>
                                {post.titles}
                            </Link>
                            </h4>
                            <p>Favorites: {post.favoritesCount}</p>
                        </div>
                        <div className="clear"></div>
                        </article>
                    ))}
                    </div>

                

                    <div className="widget widget_tag_cloud">
                        <h3 className="widget-title">Tags</h3>
                        <div className="tagcloud">
                            {Object.entries(tagCounts).map(([tag, count]) => (
                            <Link href={`/blog-4`} key={tag}>
                                {tag} <span className="tag-link-count">({count})</span>
                            </Link>
                            ))}
                        </div>
                </div>
            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export default Blog4;