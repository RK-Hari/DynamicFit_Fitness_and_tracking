import LoginForm from './Components/LoginForm';
import HomePage from './Components/HomePage';
import ProfilePage from './Pages/ProfilePage';
import AdminDashboard from './Components/AdminDashboard';
import AdminLogin from './Components/AdminLogin';
import DietPlanner from './Components/DietPlanner/DietPlanner';
import ExcerciseDetails from './Components/ExcerciseComponents/ExcerciseDetails';
import TrainerLogin from './Components/trainerLogin';
import AddTrainerForm from './Components/AddTrainerForm';
import TrainerPage from './Components/Trainer/TrainerPage';
import Leaderboard from './Components/LeaderBoard/Leaderboard';
import VoiceBot from './Components/VoiceBot/VoiceBot';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/diet" element={<DietPlanner />} />
          <Route path="/excerciseDetails" element={<ExcerciseDetails />} />
          <Route path="/trainerLogin" element={<TrainerLogin />} />
          <Route path="/trainerForm" element={<AddTrainerForm />} />
          <Route path="/trainerPage" element={<TrainerPage />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/voice" element={<VoiceBot />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
