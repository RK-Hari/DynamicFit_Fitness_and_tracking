import React, { useState } from 'react';
import './ChatBot.css';
import robot from '../../Assets/robot.png';

const preloadedAnswers = {
    'hi': 'Hello! How can I assist you today?',
    'plan': 'You can purchase a plan from our homepage after logging in with your account.',
    'plans': 'You can purchase a plan from our homepage after logging in with your account.',
    'meeting': 'A meeting can be scheduled by entering your details in the Schedule a Meeting tab in you profile.',
    'meetings': 'A meeting can be scheduled by entering your details in the Schedule a Meeting tab in you profile.',
    'trainer': 'You can contact a trainer by purchasing advanced plans and scheduling an one-on-one meeting.',
    'trainers': 'You can contact a trainer by purchasing advanced plans and scheduling an one-on-one meeting.',
    'hello': 'Hi there! What can I help you with?',
    'what is your name?': 'I am a fitness assistant chatbot here to help you with your fitness journey.',
    'how can i contact support?': 'You can contact support via email at support@example.com.',
    'what are your operating hours?': 'We are available 24/7 to assist you with any questions or issues.',
    'what features does this fitness app offer?': 'Our fitness app includes features such as exercise tracking, food recommendations, a calorie burner timer, automatic progress updates, trainer integration, and an admin dashboard.',
    'how can i create a fitness plan?': 'You can create a fitness plan by navigating to the "Plans" section in the app, where you can set your goals and preferences to receive a customized plan.',
    'can i track my calorie intake?': 'Yes, the app includes a calorie tracker that allows you to monitor your daily intake and manage your nutrition effectively.',
    'how do i connect with a trainer?': 'To connect with a trainer, go to the "Trainers" section in the app, where you can view available trainers and schedule a meeting with them.',
    'is my data secure?': 'Yes, we prioritize your privacy and implement robust security measures to protect your personal and fitness data.',
    'what should i do if i forget my password?': 'If you forget your password, use the "Forgot Password" option on the login page to reset it via your registered email address.',
    'how do i update my fitness goals?': 'You can update your fitness goals by accessing the "Profile" or "Settings" section in the app, where you can adjust your goals and preferences.',
    'what is the calorie burner timer?': 'The calorie burner timer helps you track and manage your exercise sessions by calculating the calories burned based on the duration and intensity of your workout.',
    'how can i see my progress?': 'You can view your progress in the "Progress" section of the app, where you can track metrics such as workout performance, calorie intake, and overall fitness goals.',
    'can i integrate other fitness trackers with this app?': 'Yes, our app supports integration with various fitness trackers to provide a comprehensive view of your fitness data.',
    'what is your favorite feature?': 'As a chatbot, I don’t have personal preferences, but many users find the exercise tracking and calorie burner timer features very helpful!',
    'how can i log in?': 'To log in, use your email and password on the login page. If you don’t have an account, you can sign up using the "Sign Up" option.',
    'can i change my email address?': 'Yes, you can change your email address in the "Profile" section of the app under account settings.',
    'how do i delete my account?': 'To delete your account, go to the "Settings" section in the app and select "Delete Account." Please note this action is permanent.',
    'what do i do if the app isn’t working?': 'If the app isn’t working, try restarting it or checking for updates. If the issue persists, contact support via email at support@example.com.',
    'how can I provide feedback?': 'You can provide feedback by going to the "Feedback" section in the app and submitting your comments or suggestions.',
    'where can I find the app’s privacy policy?': 'The privacy policy can be found in the "Settings" section of the app or on our website under the "Privacy Policy" link.'
};




const Chatbot = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleIconClick = () => {
        setIsVisible(!isVisible);
    };

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSend = () => {
        if (userInput) {
            // Convert user input to lowercase
            const lowerCaseInput = userInput.toLowerCase();
            // Check the preloadedAnswers with the lowercase input
            const response = preloadedAnswers[lowerCaseInput] || "Sorry, I don't understand that question.";
            setChatHistory([...chatHistory, { user: userInput, bot: response }]);
            setUserInput('');
        }
    };
    

    return (
        <div className={`chatbot-container ${!isVisible ? 'shaking' : ''}`}>
            <div className="chatbot-icon" onClick={handleIconClick}>
                {isVisible ? 'X' : <img className="robot-icon" src={robot} alt="Chatbot Icon" />}
            </div>
            {isVisible && (
                <div className="chatbot-box">
                    <div className="chatbot-header">
                        <span>Chatbot</span>
                        <button className="close-btn" onClick={() => setIsVisible(false)}>X</button>
                    </div>
                    <div className="chatbot-body">
                        <div className="chat-history">
                            {chatHistory.map((entry, index) => (
                                <div key={index} className="chat-entry">
                                    <div className="user-message">{entry.user}</div>
                                    <div className="bot-message">{entry.bot}</div>
                                </div>
                            ))}
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                placeholder="Ask me something..."
                            />
                            <button onClick={handleSend}>Send</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatbot;

