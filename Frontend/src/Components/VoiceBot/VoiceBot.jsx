import React, { useState, useEffect } from 'react';
import './VoiceBot.css'; // Import the CSS file
import voice from '../../Assets/voice.png';

const VoiceBot = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  
  const recognitionInstance = recognition ? new recognition() : null;

  useEffect(() => {
    if (recognitionInstance) {
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const last = event.results.length - 1;
        const result = event.results[last][0].transcript;
        setTranscript(result);
        handleResponse(result);
      };

      recognitionInstance.onend = () => {
        if (isListening) {
          recognitionInstance.start(); // Restart if still listening
        }
      };
    }
  }, [isListening, recognitionInstance]);

  const startListening = () => {
    if (recognitionInstance) {
      setTranscript(''); // Reset transcript
      setResponse(''); // Reset response
      setIsListening(true);
      recognitionInstance.start();
    }
  };

  const stopListening = () => {
    if (recognitionInstance) {
      setIsListening(false);
      recognitionInstance.stop();
    }
  };

  const handleResponse = (userInput) => {
    const responses = {
      'hi': 'Hello! How can I assist you today?',
      'plan': 'You can purchase a plan from our homepage after logging in with your account.',
      'how can i purchase a plan': 'You can purchase a plan from our homepage after logging in with your account.',
      'plans': 'You can purchase a plan from our homepage after logging in with your account.',
      'how can i schedule a meeting': 'A meeting can be scheduled by entering your details in the Schedule a Meeting tab in your profile.',
      'meeting': 'A meeting can be scheduled by entering your details in the Schedule a Meeting tab in your profile.',
      'meetings': 'A meeting can be scheduled by entering your details in the Schedule a Meeting tab in your profile.',
      'trainer': 'You can contact a trainer by purchasing advanced plans and scheduling a one-on-one meeting.',
      'how can i contact a trainer': 'You can contact a trainer by purchasing advanced plans and scheduling a one-on-one meeting.',
      'how can i contact a trainers': 'You can contact a trainer by purchasing advanced plans and scheduling a one-on-one meeting.',
      'how can i contact the trainer': 'You can contact a trainer by purchasing advanced plans and scheduling a one-on-one meeting.',
      'how can i contact the trainers': 'You can contact a trainer by purchasing advanced plans and scheduling a one-on-one meeting.',
      'trainers': 'You can contact a trainer by purchasing advanced plans and scheduling a one-on-one meeting.',
      'hello': 'Hi there! What can I help you with?',
      'what is your name': 'I am a fitness assistant chatbot here to help you with your fitness journey.',
      'how can i contact support': 'You can contact support via email at support@example.com.',
      'what are your operating hours': 'We are available 24/7 to assist you with any questions or issues.',
      'what features does this fitness app offer?': 'Our fitness app includes features such as exercise tracking, food recommendations, a calorie burner timer, automatic progress updates, trainer integration, and an admin dashboard.',
      'how can i create a fitness plan': 'You can create a fitness plan by navigating to the "Plans" section in the app, where you can set your goals and preferences to receive a customized plan.',
      'can i track my calorie intake': 'Yes, the app includes a calorie tracker that allows you to monitor your daily intake and manage your nutrition effectively.',
      'how do i connect with a trainer': 'To connect with a trainer, go to the "Trainers" section in the app, where you can view available trainers and schedule a meeting with them.',
      'is my data secure': 'Yes, we prioritize your privacy and implement robust security measures to protect your personal and fitness data.',
      'what should i do if i forget my password?': 'If you forget your password, use the "Forgot Password" option on the login page to reset it via your registered email address.',
      'how do i update my fitness goals': 'You can update your fitness goals by accessing the "Profile" or "Settings" section in the app, where you can adjust your goals and preferences.',
      'what is the calorie burner timer': 'The calorie burner timer helps you track and manage your exercise sessions by calculating the calories burned based on the duration and intensity of your workout.',
      'how can i see my progress': 'You can view your progress in the "Progress" section of the app, where you can track metrics such as workout performance, calorie intake, and overall fitness goals.',
      'how can i track my progress': 'You can view your progress in the "Progress" section of the app, where you can track metrics such as workout performance, calorie intake, and overall fitness goals.',
      'can i integrate other fitness trackers with this app?': 'Yes, our app supports integration with various fitness trackers to provide a comprehensive view of your fitness data.',
      'what is your favorite feature': 'As a chatbot, I don’t have personal preferences, but many users find the exercise tracking and calorie burner timer features very helpful!',
      'how can i log in': 'To log in, use your email and password on the login page. If you don’t have an account, you can sign up using the "Sign Up" option.',
      'can i change my email address': 'Yes, you can change your email address in the "Profile" section of the app under account settings.',
      'how do i delete my account?': 'To delete your account, go to the "Settings" section in the app and select "Delete Account." Please note this action is permanent.',
      'what do i do if the app isn’t working': 'If the app isn’t working, try restarting it or checking for updates. If the issue persists, contact support via email at support@example.com.',
      'how can I provide feedback': 'You can provide feedback by going to the "Feedback" section in the app and submitting your comments or suggestions.',
      'where can I find the app’s privacy policy': 'The privacy policy can be found in the "Settings" section of the app or on our website under the "Privacy Policy" link.'
    };

    const userInputLower = userInput.toLowerCase();
    const botResponse = responses[userInputLower] || 'Sorry, I did not understand that.';
    
    setResponse(botResponse);
    speak(botResponse);
  };

  const speak = (text) => {
    if (synth) {
      // Cancel any ongoing speech
      synth.cancel();
      
      // Create and speak the new utterance
      const utterance = new SpeechSynthesisUtterance(text);
      synth.speak(utterance);
    }
  };
  

  const handleIconClick = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`voicebot-container ${!isVisible ? 'shaking' : 'visible'}`}>
      <div className="voicebot-icon" onClick={handleIconClick}>
        {isVisible ? 'X' : <img className="mic-icon" src={voice} alt="Voice Bot Icon" />}
      </div>
      {isVisible && (
        <div className="voicebot-box">
          <div className="voicebot-header">
            <span>Voice Bot</span>
            <button className="close-btn" onClick={() => setIsVisible(false)}>X</button>
          </div>
          <div className="voicebot-body">
            <div className="voicebot-buttons">
              <button onClick={startListening} disabled={isListening}>
                Start Listening
              </button>
              <button onClick={stopListening} disabled={!isListening}>
                Stop Listening
              </button>
            </div>
            <p className="voicebot-transcript"><strong>Transcript:</strong> {transcript}</p>
            <p className="voicebot-response"><strong>Response:</strong> {response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceBot;
