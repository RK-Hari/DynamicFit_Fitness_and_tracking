import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Styles/ContactUs.css';
import emailjs from 'emailjs-com';
import contactUs1 from '../Assets/contactUs1.jpg';
import HomePageCardButton from './HomePageCardButton';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { useAuth } from './AuthContext';

const ContactUs = () => {

  const navigate=useNavigate();

  const {user} = useAuth();

  const MySwal = withReactContent(Swal);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const formRef = useRef(); // Create a ref for the form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user) {
      emailjs.sendForm('service_uva23uu', 'template_x33qaxn', formRef.current, 'WB0VsUPjEqOBERFRJ')
        .then((result) => {
          MySwal.fire({
            title: "Your message reached us successfully!",
            text: "We'll contact you shortly.",
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            setTimeout(() => {
              navigate('/'); // Navigate to homepage after 5 seconds
            }, 5000);
          });
          setFormData({
            name: '',
            email: '',
            message: ''
          });
        }, (error) => {
          MySwal.fire({
            title: "An error occurred while sending email.",
            text: "Try again later.",
            icon: 'error',
            confirmButtonText: 'OK'
          }).then(() => {
            setTimeout(() => {
              navigate('/'); // Navigate to homepage after 5 seconds
            }, 4000);
          });
        });
    } else {
      MySwal.fire({
        title: "Please Login.",
        text: "Login to send an email.",
        icon: 'warning',
        confirmButtonText: 'OK'
      }).then(() => {
        setTimeout(() => {
          navigate('/'); // Navigate to homepage after 5 seconds
        }, 4000);
      });
    }
  };

  return (
    <div>
      <div className='contactUs-container'>
        <div className='contactUs-heading'>
          Get in touch :
        </div>
        <div className='contactUs-contact-container'>
        <form ref={formRef} onSubmit={handleSubmit}> {/* Attach the ref and onSubmit handler */}
          <div className='contactUs-contact-element1'>
            <div className='contactUs-contact-element1-elements'>
                <input
                  name="name"
                  placeholder="Fullname"
                  className="brutalist-input smooth-type"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  name="email"
                  placeholder="E-mail"
                  className="brutalist-input smooth-type"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <input
                  name="message"
                  placeholder="Message"
                  className="brutalist-input smooth-type"
                  type="text"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <HomePageCardButton
                  message="Send message"
                  type="submit"
                />
            </div>
          </div>
          </form>
          <div className='contactUs-contact-element2'>
            <img src={contactUs1} alt="" className='contactUs-contact1' />
            <div className='contactUs-moving-text1'>
              <marquee scrollamount="25">
                let.us.know.what.you.think.
              </marquee>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
