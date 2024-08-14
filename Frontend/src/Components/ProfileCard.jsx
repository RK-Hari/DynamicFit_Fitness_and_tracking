import React from 'react'
import '../Styles/ProfileCard.css';

import user from '../Assets/user.png';
import profile from '../Assets/profile.png'

const ProfileCard = ({name,email,age,gender,bmi,plan}) => {
  return (
    <div>
      <div className='profileCard-display'>
        <div className='profileCard-left'>
            <img src={profile} alt="" className='profileCard-left-userIcon'/>
            <p>{name || "null"}</p>
            <p>{email || "null"}</p>
        </div>
        <div className='profileCard-line'/>
        <div className='profileCard-right'>
            <h3 className='profileCard-right-h3'>
                Profile Details :
            </h3>  
            <p className='profileCard-right-p'>Name : {name || "null"}</p>  
            <p className='profileCard-right-p'>Email :  {email || "null"}</p>  
            <p className='profileCard-right-p'>Age :  {age || "null"}</p>
            <p className='profileCard-right-p'>Gender : {gender || "null"}</p>
            <p className='profileCard-right-p'>BMI : {bmi || "null"}</p>
            <p className='profileCard-right-p'>Plan : {plan || "null"}</p>
        </div>  
      </div>
    </div>
  )
}

export default ProfileCard
