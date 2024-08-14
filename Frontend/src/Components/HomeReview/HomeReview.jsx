import React, { useEffect, useState } from 'react';
import './HomeReview.css';
import profile from '../../Assets/profile.png';
import axios from 'axios';

const HomeReview = () => {
  const [reviews, setReviews] = useState([]);
  
  // Define an array of colors for the review cards
  const colors = ["#FFB4A2", "#E5989B", "#B5838D"];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reviews');
        const allReviews = response.data;

        // Sort reviews by reviewId in descending order and take the top 3
        const latestReviews = allReviews
          .sort((a, b) => b.reviewId - a.reviewId)
          .slice(0, 3);

        setReviews(latestReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className='homereview-container'>
      {reviews.map((review, index) => (
        <div
          key={review.reviewId}
          className='homereview-card'
          style={{ backgroundColor: colors[index % colors.length] }}  // Apply different colors
        >
          <img src={profile} alt="" className='homereview-card-image h-16 w-16' />
          <h1 className='homereview-name text-slate-600'>{review.name}</h1>
          <p className='homereview-content'>" {review.content} "</p>
          <p className='text-red-800 text-xl'>Rating: {review.rating}/5</p>
        </div>
      ))}
    </div>
  );
};

export default HomeReview;
