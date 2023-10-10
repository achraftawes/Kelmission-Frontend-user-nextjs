
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import BlogSidebar from '@/components/Blog/BlogSidebar';
import { useRouter } from 'next/router';
import axios from 'axios';
import React, { useEffect, useState } from "react";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';


const BlogDetails = () => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const router = useRouter();
    const { job_id } = router.query;

    const [jobDetail, setJobDetail] = useState(null);
    const [token, setToken] = useState(null);
    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
      }
    }, []);
  
    useEffect(() => {
      const fetchJobDetail = async () => {
        if (!job_id) {
            return; 
          }
        try {
          const response = await axios.get(`http://localhost:3001/api/job/get_job/${job_id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
  
          if (response.status === 200) {
            setJobDetail(response.data);
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

    useEffect(() => {
        const fetchComments = async () => {
          if (!job_id) {
            return; // Prevent the API request if job_id is not available yet
          }
      
          try {
            const response = await axios.get(`http://localhost:3001/api/job/comments/${job_id}`);
      
            if (response.status === 200) {
              setComments(response.data);
            } else {
              console.error('Error fetching comments:', response.statusText);
            }
          } catch (error) {
            console.error('Error fetching comments:', error);
          }
        };
      
        fetchComments();
      }, [job_id]);
    
  
    if (!jobDetail) {
      return <div>Loading...</div>;
    }
  
    if (jobDetail.error) {
      return <div>{jobDetail.error}</div>;
    }
  
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
  
      return `${year}-${month}-${day} at ${hours}:${minutes}`;
    };
  
    const addToFavorites = async (jobId, userId) => {
      try {
        await axios.post(
          "http://localhost:3001/api/job/add_to_favorites",
          { job_id: jobId, user_id: userId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Job added to favorites!");
      } catch (error) {
        console.error("Error adding job to favorites:", error);
      }
    };
    
    const applyToJob = async () => {
      try {
        await axios.post(
          "http://localhost:3001/api/job/apply_to_job",
          { job_id: jobDetail.job_id },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Redirect to the applyjob page with the job_id parameter
        router.push(`/applyjob?job_id=${jobDetail.job_id}`);
      } catch (error) {
        console.error("Error applying to job:", error);
        //alert("An error occurred while applying to the job.");
      }
    };

      const handleCommentSubmit = (e) => {
        e.preventDefault();
    
        // Send a POST request to create a new comment
        axios.post(
            `http://localhost:3001/api/job/add_comment/${job_id}`,
            { comment_text: newComment },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            }
          )
          .then((response) => {
            // Refresh the comments list after adding a new comment
            setComments([...comments, response.data]); // Add the new comment to the existing comments array
            setNewComment(''); // Clear the new comment input
          })
          .catch((error) => {
            console.error('Error creating comment:', error);
          });
    
        }

    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Job Details" /> 

            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">
                               

                                <div className="article-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li>
                                                <Icon.Clock /> {formatDate(jobDetail.date)}
                                            </li>
                                            <li>
                                                <Icon.User /> <a href="#">{jobDetail.company_name}</a>
                                            </li>
                                            <li>
                                                <Icon.Map /> <a href="#">{jobDetail.localisation}</a>
                                            </li>
                                        </ul>
                                    </div>
 
                                    <h2>{jobDetail.titles}</h2> 

                                   

                                    <p>{jobDetail.description}</p>

                                    <blockquote>
                                        <p>{jobDetail.mail}</p>

                
                                    </blockquote>

                                </div>

                                <div className="article-footer">
                                    <div className="article-tags">
                                        <a href="#">{jobDetail.speciality}</a>
                                        
                                    </div>
                                </div>
                                {token ? ( 
                                <div className="startp-post-navigation">
                                    <div className="prev-link-wrapper">
                                        <div className="info-prev-link-wrapper">
                                            <a href="#" onClick={() => addToFavorites(jobDetail.job_id)}>
                                                <span className="image-prev">
                                                    <img src="/images/blog-image/etoile.png" alt="image" />
                                                    <span className="post-nav-title"><FontAwesomeIcon icon={faStar} /></span>
                                                </span>
            
                                                <span className="prev-link-info-wrapper">
                                                    <span className="prev-title">Bookmark this Post for Future Inspiration and Quick Access.</span>
                                                    
                                                </span>
                                            </a>
                                        </div>
                                    </div>
            
                                    <div className="next-link-wrapper">
                                        <div className="info-next-link-wrapper">
                                            <a href="#" onClick={applyToJob}>
                                                <span className="next-link-info-wrapper">
                                                    <span className="next-title">Unlock Your Potential – Apply Today and Shape Your Future Career.</span>
                                                    
                                                </span>
            
                                                <span className="image-next">
                                                    <img src="/images/blog-image/apply.jpg" alt="image" />
                                                    <span className="post-nav-title"><FontAwesomeIcon icon={faCheckCircle} /></span>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                ) : (
                                  <>
                                  </>
                                )} 
                                <div className="comments-area">
                                    <h3 className="comments-title">{comments.length} Comments:</h3>

                                    <ol className="comment-list">
                                        {comments.map((comment) => (
                                            <li className="comment" key={comment.comment_id}>
                                                    <article className="comment-body">
                                                    <footer className="comment-meta">
                                                        <div className="comment-author vcard">
                                                        {comment.photo && (
                                                            <img
                                                            src={`http://localhost:3001/uploads/${comment.photo}`}
                                                            className="avatar"
                                                            alt="image"
                                                            />
                                                        )}
                                                        <b className="fn">{comment.user_prenom} {comment.user_nom} </b>
                                                        <span className="says">says:</span>
                                                        </div>
                                                        <div className="comment-metadata">
                                                        {formatDate(comment.created_at)}
                                                        </div>
                                                    </footer>
                                                    <div className="comment-content">
                                                        <p>{comment.comment_text}</p>
                                                    </div>
                                                    </article>
                                                </li>
                                        ))}
                                    </ol>
                                    {token ? (                            
                                    <div className="comment-respond">
                                    <h3 className="comment-reply-title">Leave a comment</h3>

                                        <form className="comment-form" onSubmit={handleCommentSubmit}>
                                            
                                            <p className="comment-notes">
                                            <span id="email-notes"></span>
                                            
                                            <span className="required"></span>
                                            </p>
                                            <p className="comment-form-comment">
                                            <label>Comment</label>
                                            <textarea
                                                name="comment"
                                                id="comment"
                                                cols="45"
                                                rows="5"
                                                maxLength="65525"
                                                required="required"
                                                value={newComment}
                                                onChange={(e) => setNewComment(e.target.value)}
                                            ></textarea>
                                            </p>
                                                
                                            <p className="form-submit">
                                            <input type="submit" name="submit" id="submit" className="submit" value="Post Comment" />
                                            </p>
                                        </form>
                                        </div>
                                        ) : (
                                          <>
                                          </>
                                        )} 
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default BlogDetails;