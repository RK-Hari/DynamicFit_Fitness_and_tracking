import React, { useState } from 'react';
import '../Styles/HomePage.css';
import HomePageCard from './HomePageCard';
import BMICalculator from './BMICalculator';
import Navbar from './Navbar';
import ContactUs from './ContactUs';
import Footer from './Footer';
import HomeReview from './HomeReview/HomeReview';
import Chatbot from './ChatBot/ChatBot';
import VoiceBot from './VoiceBot/VoiceBot';

import homepicture1 from '../Assets/homepicture1.jpg';
import homepage_video1 from '../Assets/homepage_video1.mp4';
import bmivideo from '../Assets/bmivideo.mp4';

import { useAuth } from '../Components/AuthContext';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const HomePage = () => {
  const MySwal = withReactContent(Swal);
  const [price, setPrice] = useState(0);
  const { user } = useAuth();


  // Prompt for BMI and Gender
  const promptForBmiAndGender = () => {
    return MySwal.fire({
      title: 'Enter BMI and Gender',
      html: `
        <input type="number" id="bmi" class="swal2-input" placeholder="BMI">
        <select id="gender" class="swal2-input">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const bmi = document.getElementById('bmi').value;
        const gender = document.getElementById('gender').value;
        if (!bmi || !gender) {
          MySwal.showValidationMessage('Please enter both BMI and gender');
          return null;
        }
        return { bmi, gender };
      }
    });
  };

  const updatePlanForUser = async (email, planDetails) => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/updatePlan?email=${email}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(planDetails),
      });
  
      if (response.ok) {
        const message = await response.text();
        console.log(message); // "User plan updated successfully"
        // handle success scenario
      } else {
        const error = await response.text();
        console.error('Failed to update plan:', error);
        // handle error scenario
      }
    } catch (error) {
      console.error('There was an error with the fetch operation:', error);
      // handle error scenario
    }
  };  

  const handleClick = async (planDetails) => {

    const price = planDetails.price * 100;

    if (!user) {
      MySwal.fire({
        title: "Please log in first",
        text: "You need to be logged in to purchase a plan.",
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }

    var options = {
      key: "rzp_test_VNP0v0sZEC0YFa",
      key_secret:"CTRPfAZpVDoOXtXcaT93UHY1",
      amount : price,
      currency:"INR",
      name:"Demo_for_project",
      description:"For testing purpose",
      handler: function(response){
        alert(response.razorpay_payment_id);
      },
      prefill:{
        name:"demo",
        email:"demo123@gmail.com",
        contact:"1234567890"
      },
      notes:{
        address:"Razorpay corporate office"
      },
      theme:{
        color:"#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();
  
    const result = await promptForBmiAndGender();
    if (!result.isConfirmed) return;
  
    const { bmi, gender } = result.value;
    const updatedUser = { ...user, bmi, gender };
  
    try {
      // Update the user with BMI and Gender
      const userResponse = await fetch(`http://localhost:8080/api/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
  
      if (!userResponse.ok) {
        throw new Error('Failed to update user details');
      }
  
      // Update the plan for the user with the new planDetails
      await updatePlanForUser(user.email, planDetails);
  
      MySwal.fire({
        title: "Purchased successfully !!",
        text: "Begin your workout now.",
        icon: 'success',
        confirmButtonText: 'OK'
      });
  
      setPrice(planDetails.price);
  
    } catch (error) {
      MySwal.fire({
        title: "Error during purchase",
        text: error.message,
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      console.error('There was a problem with the fetch operation:', error);
    }
  };
  

  const createPlan = (price, planName, dietPlan, oneOnOne) => ({
    planName,
    dietPlan,
    oneOnOne,
    CalorieIntake: 0,
    ProtienIntake: 0,
    CarbsIntake: 0,
    dailyTargert: 0,
    dailyTargertAchieved: 0,
    monthlyTargert: 0,
    monthlyTargertAchieved: 0,
    weeklyTargert: 0,
    weeklyTargertAchieved: 0,
    price,
  });

  return (
    <div className='homepage-container'>
      <Navbar />
      <div className='homepage-picture1-container'>
        <div className='homepage-picture1'>
          <div>
            <img src={homepicture1} alt="homepicture" className='homepage-picture-1' />
          </div>
          <div className='homepage-picture1-overlay1'>
            gain results !!
          </div>
          <div className='homepage-picture1-overlay2'>
            select a program now ..
          </div>
        </div>
        <div className='homepage-quote-side'>
          <div className='homepage-quote-text'>
            <p className='homepage-quote-letter'>#</p>
            <p className='homepage-quote-letter'>G</p>
            <p className='homepage-quote-letter'>E</p>
            <p className='homepage-quote-letter'>T</p>
            <p className='homepage-quote-letter'>F</p>
            <p className='homepage-quote-letter'>I</p>
            <p className='homepage-quote-letter'>T</p>
          </div>
        </div>
      </div>
      <div className="homepage-video-container">
        <video
          className="homepage-video1"
          src={homepage_video1}
          autoPlay
          loop
          muted
        />
      </div>
      <div className='homepage-video-overlay1'>
        <div className='homepage-video-overlay1-bold'>
          Unlock Your Potential with Tailored Personal Training.
        </div>
        <p className='homepage-video-overlay1-p'>
          Achieve your goals with tailored workouts from our expert trainers. Whether you're chasing peak performance or a healthier lifestyle, we provide the motivation and support you need. Start today and transform into a stronger, fitter, and more confident you!
        </p>
      </div>
      <div className="circle-container">
        <div className="rotating-circle">
          <p className="circle-text">D</p>
          <p className="circle-text">R</p>
          <p className="circle-text">E</p>
          <p className="circle-text">A</p>
          <p className="circle-text">M</p>
          <p className="circle-text">B</p>
          <p className="circle-text">I</p>
          <p className="circle-text">G</p>
          <p className="circle-text">⦿</p>
          <p className="circle-text">W</p>
          <p className="circle-text">O</p>
          <p className="circle-text">R</p>
          <p className="circle-text">K</p>
          <p className="circle-text">H</p>
          <p className="circle-text">A</p>
          <p className="circle-text">R</p>
          <p className="circle-text">D</p>
          <p className="circle-text">⦿</p>
        </div>
      </div>
      <div className='homepage-moving-text1'>
        <marquee scrollamount="25">
          workout.live.repeat.move.breath.
        </marquee>
      </div>
      <div className='homepage-bmi-container'>
        <div>
          <video
            className="homepage-bmi-video"
            src={bmivideo}
            autoPlay
            loop
            muted
          />
        </div>
        <div className='homepage-bmi'>
          <BMICalculator />
        </div>
      </div>
      <div>
        <h1 className='homepage-plan-heading'>
          Choose your plan now :
        </h1>
      </div>
      <div className='homepage-card-container'>
        <div className="homepage-card-transition" onClick={() => handleClick(createPlan(3199, "Basic", false, false))}>
          <HomePageCard
            bgcolor="#E5989B"
            title="Basic"
            bestfor="Best for beginners"
            price="3199"
            months="3"
            feature1="- Relaxed workouts"
            feature2="- Beginner friendly"
            feature3="- Guided programs"
          />
        </div>
        <div className="homepage-card-transition" onClick={() => handleClick(createPlan(6399, "Intermediate", true, false))}>
          <HomePageCard
            bgcolor="#B5838D"
            title="Intermediate"
            bestfor="Best for experienced"
            price="6399"
            months="6"
            feature1="- Varied workouts"
            feature2="- Structured progression"
            feature3="- Proper diet plan"
          />
        </div>
        <div className="homepage-card-transition" onClick={() => handleClick(createPlan(9999, "Advanced", true, true))}>
          <HomePageCard
            bgcolor="#FFB4A2"
            title="Advanced"
            bestfor="Best for gymrats"
            price="9999"
            months="9"
            feature1="- Full access"
            feature2="- Whole body transformation"
            feature3="- One-on-one sessions"
          />
        </div>
      </div>
      <div id="contact-section">
        <ContactUs />
      </div>

      <div>
      <h1 className='homepage-plan-heading mb-5'>
          User Reviews :
        </h1>
        <HomeReview/>
      </div>

      <Footer />
      <Chatbot/>
      <VoiceBot/>
    </div>
  );
};

export default HomePage;
