import React, { useState } from 'react';
import '../Styles/ReviewComponent.css';
import ReviewVideo from '../Assets/ReviewVideo.mp4';
import { useAuth } from './AuthContext';

const ReviewComponent = () => {
  const { user } = useAuth();
  const [userName, setUserName] = useState(user.userName);
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const handleReviewChange = (e) => setReview(e.target.value);
  const handleRatingChange = (e) => setRating(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (review && rating) {
      const reviewData = {
        name: userName,
        content: review,
        rating: rating
      };

      try {
        const response = await fetch('http://localhost:8080/api/reviews', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(reviewData),
        });

        if (response.ok) {
          setSubmitted(true);
        } else {
          alert('Failed to submit review. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting review:', error);
        alert('Failed to submit review. Please try again.');
      }
    } else {
      alert('Please fill in both review and rating.');
    }
  };

  return (
    <div className="review-container">
      <div>
        <video
          src={ReviewVideo}
          autoPlay
          loop
          muted
          className='reviewVideo'
        />
      </div>
      {submitted ? (
        <div className="relative z-10 p-8 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-md max-w-md text-center">
          <h2 className="text-3xl font-semibold mb-4 text-green-400">Thank you for your review!</h2>
          <p className="text-xl mb-2 text-white">Your rating: {rating}/5</p>
        </div>
      ) : (
        <form className="relative h-96 z-10 pt-10 p-8 bg-white bg-opacity-10 rounded-lg shadow-lg backdrop-blur-md max-w-md" onSubmit={handleSubmit}>
          <h2 className="text-3xl font-semibold mb-4 text-white">Share Your Experience</h2>
          <textarea
            value={review}
            onChange={handleReviewChange}
            placeholder="Write your review here..."
            className="w-full p-4 mb-4 text-white bg-white bg-opacity-30 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          ></textarea>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="w-full p-4 mb-4 text-black bg-white bg-opacity-30 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="0">Select Rating</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
          <button
            type="submit"
            className="w-full p-4 text-lg font-semibold text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 transition-all"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewComponent;
