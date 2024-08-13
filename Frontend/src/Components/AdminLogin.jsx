import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../Styles/LoginForm.css';
import '../Styles/Loader1.css';
import '../Styles/Loader2.css';

import InputContainer from './InputContainer';
import SecondInputContainer from './SecondInputContainer';
import LoginPageButton from './LoginPageButton';

import logo from '../Assets/logo.png';
import padlock from '../Assets/padlock.png';
import email from '../Assets/email.png';
import poster2 from '../Assets/poster2.png';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const LoginForm = () => {

  const MySwal = withReactContent(Swal);

  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const [switchToggle,setSwitchToggle] = useState(true);

  const navigate = useNavigate();

  if(switchToggle){
  }else{
    navigate('/login');
  }


    const [showText, setShowText] = useState(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister , setShowRegister] = useState(false);
    const [dynamicStyle, setDynamicStyle] = useState("sm:mt-40 sm:ml-12 lg:mt-36 lg:pl-32");
    const [buttonText,setButtonText] = useState("Login >");

    const handleLogin =()=> {
      if(emailInput === "admin@gmail.com" && passwordInput==="admin"){
      navigate('/admin');
      }else{
        MySwal.fire({
          title: "Error during login",
          text: 'Please check your credentials',
          icon: 'warning',
          confirmButtonText: 'OK'
      });
      }
    }

    useEffect(() => {
        const loginTimer = setTimeout(() => {
          setShowLogin(true);
        }, 4100);

        const timer = setTimeout(() => {
          setShowText(false);
        }, 4000); 
    
        return () => clearTimeout(timer,loginTimer);
      }, []);

    useEffect(() => {
        if (showRegister) {
            setDynamicStyle("Login-form sm:mt-40 sm:ml-12 lg:mt-1 lg:pl-32");
            setButtonText("Register >");
          }else {
            setDynamicStyle("Login-form sm:mt-40 sm:ml-12 lg:mt-36 lg:pl-32");
            setButtonText("Login >");
        }
    }, [showRegister]);
  
    return (
      <div className='Login-container'>
        {showText && (
          <h2 className='Login-header font-sans font-bold'>
          <img src={logo} alt="logo" className='Login-Logo'/> &nbsp;
              DynamicFit
          </h2>
        )}
        {showText && (
            <div className="Login-first font-sans font-bold ">
              <div class="loader1"></div>
              <div className='hidden lg:block'>
              Navigating <br/>
              To <br/>
              Admin login...
              </div>
            </div>
        )}
        {
          showLogin && (
          <div className='flex'>
            <div className='Login-Name hidden lg:block'>
              <div className='Login-Name-Animation'>
               <br/>
               <br/>
              A <br/>
              D <br/>
              M <br/>
              I <br/>
              N <br/>
               <br/>
               <br/>
               <br/>
              </div>
            </div>

            <div className='Login-poster hidden lg:block'>
              <div>
                <img src={poster2} alt="poster" className='poster-placement h-[830px] w-[800px]'/>
              </div>
            </div>

            <div className={`${dynamicStyle}`}>
            {showRegister ? "" : 
             <marquee behavior="scroll" direction="left" className='moving-text'>
             Login to monitor log activities.
             </marquee>}
            <div onChange={(e)=> {setEmailInput(e.target.value)}}>
              <InputContainer 
              type={"email"}
              icon={email}
              name={"email"}
              placeholder={"Enter email"}
              />
            </div>
            <div onChange={(e)=> {setPasswordInput(e.target.value)}}>
              <SecondInputContainer
              type={"password"}
              icon={padlock}
              name={"password"}
              placeholder={"Enter password"}
              />
            </div>

            <div className='Login-bottom ml-5 mr-10' onClick={handleLogin}>
              Click to login
            </div> 

            <div className='Login-userAdmin-switch' onClick={()=>{setSwitchToggle(false)}}>
                <h3>User</h3>
                <label class="Login-userAdmin-switch-switch">
                      <input type="checkbox"
                      checked={switchToggle}
                      />
                          <span class="Login-userAdmin-switch-slider"></span>
                      </label> 
                <h3>Admin</h3>
                </div>

            </div>
          </div>
          )
        }
        
      </div>
    );
}

export default LoginForm
