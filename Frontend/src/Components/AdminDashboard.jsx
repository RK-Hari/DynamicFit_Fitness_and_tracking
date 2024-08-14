import React, { useEffect, useState } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import '../Styles/AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [reviews, setReviews] = useState([]); // New state for reviews
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Fetch data functions
  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`Failed to fetch data from ${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5000/api/admin/logs', setLogs);
    fetchData('http://localhost:8080/api/users', setUsers);
    fetchData('http://localhost:8080/api/plans', setPlans);
    fetchData('http://localhost:8080/api/trainers', setTrainers);
    fetchData('http://localhost:8080/api/meetings', setMeetings);
    fetchData('http://localhost:8080/api/reviews', setReviews); // Fetch reviews
  }, []);

  // Event counts for the chart
  const eventCounts = logs.reduce((acc, log) => {
    acc[log.event] = (acc[log.event] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(eventCounts),
    datasets: [{
      label: 'Event Count',
      data: Object.values(eventCounts),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const lineData = {
    labels: logs.map(log => log.timestamp),
    datasets: [{
      label: 'Log Events Over Time',
      data: logs.map((_, index) => index + 1),
      fill: false,
      borderColor: 'rgba(153, 102, 255, 1)',
      tension: 0.1,
    }],
  };

  const handleAddTrainer = () => {
    navigate('/trainerForm');
  };

  const handleDelete = async (type, id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/${type}/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        switch (type) {
          case 'users':
            setUsers(users.filter(user => user.userId !== id));
            break;
          case 'plans':
            setPlans(plans.filter(plan => plan.planId !== id));
            break;
          case 'trainers':
            setTrainers(trainers.filter(trainer => trainer.email !== id));
            break;
          case 'meetings':
            setMeetings(meetings.filter(meeting => meeting.meetingId !== id));
            break;
          case 'reviews':
            setReviews(reviews.filter(review => review.reviewId !== id));
            break;
          default:
            break;
        }
      } else {
        throw new Error(`Failed to delete ${type}`);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'users':
        return (
          <div className="admin-data-section">
            <h1><strong>Users</strong></h1>
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Username</th>
                  <th>Age</th>
                  <th>BMI</th>
                  <th>Gender</th>
                  <th>Plan ID</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>{user.email}</td>
                    <td>{user.password}</td>
                    <td>{user.userName}</td>
                    <td>{user.age}</td>
                    <td>{user.bmi}</td>
                    <td>{user.gender}</td>
                    <td>{user.plan ? user.plan.planId : 'N/A'}</td>
                    <td>
                      <button onClick={() => handleDelete('users', user.userId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'plans':
        return (
          <div className="admin-data-section">
            <h1><strong>Plans</strong></h1>
            <table>
              <thead>
                <tr>
                  <th>Plan ID</th>
                  <th>Plan Name</th>
                  <th>Diet Plan</th>
                  <th>One-on-One</th>
                  <th>Calorie Intake</th>
                  <th>Protein Intake</th>
                  <th>Carbs Intake</th>
                  <th>Daily Target</th>
                  <th>Daily Target Achieved</th>
                  <th>Monthly Target</th>
                  <th>Monthly Target Achieved</th>
                  <th>Weekly Target</th>
                  <th>Weekly Target Achieved</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans.map(plan => (
                  <tr key={plan.planId}>
                    <td>{plan.planId}</td>
                    <td>{plan.planName}</td>
                    <td>{plan.dietPlan ? 'Yes' : 'No'}</td>
                    <td>{plan.oneOnOne ? 'Yes' : 'No'}</td>
                    <td>{plan.calorieIntake}</td>
                    <td>{plan.protienIntake}</td>
                    <td>{plan.carbsIntake}</td>
                    <td>{plan.dailyTarget}</td>
                    <td>{plan.dailyTargetAchieved}</td>
                    <td>{plan.monthlyTarget}</td>
                    <td>{plan.monthlyTargetAchieved}</td>
                    <td>{plan.weeklyTarget}</td>
                    <td>{plan.weeklyTargetAchieved}</td>
                    <td>
                      <button onClick={() => handleDelete('plans', plan.planId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'trainers':
        return (
          <div className="admin-data-section">
            <h1><strong>Trainers</strong></h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Phone Number</th>
                  <th>Average Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {trainers.map(trainer => (
                  <tr key={trainer.email}>
                    <td>{trainer.name}</td>
                    <td>{trainer.email}</td>
                    <td>{trainer.password}</td>
                    <td>{trainer.number}</td>
                    <td>{trainer.rating}</td>
                    <td>
                      <button onClick={() => handleDelete('trainers', trainer.email)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'meetings':
        return (
          <div className="admin-data-section">
            <h1><strong>Meetings</strong></h1>
            <table>
              <thead>
                <tr>
                  <th>Meeting ID</th>
                  <th>Full Name</th>
                  <th>Email</th>
                  <th>Reason</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {meetings.map(meeting => (
                  <tr key={meeting.meetingId}>
                    <td>{meeting.meetingId}</td>
                    <td>{meeting.fullName}</td>
                    <td>{meeting.email}</td>
                    <td>{meeting.reason}</td>
                    <td>{meeting.date}</td>
                    <td>{meeting.time}</td>
                    <td>
                      <button onClick={() => handleDelete('meetings', meeting.meetingId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'reviews':
        return (
          <div className="admin-data-section">
            <h1><strong>Reviews</strong></h1>
            <table>
              <thead>
                <tr>
                  <th>Review ID</th>
                  <th>UserName</th>
                  <th>Content</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map(review => (
                  <tr key={review.reviewId}>
                    <td>{review.reviewId}</td>
                    <td>{review.name}</td>
                    <td>{review.content}</td>
                    <td>{review.rating}</td>
                    <td>
                      <button onClick={() => handleDelete('reviews', review.reviewId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      default:
        return (
          <div className="admin-data-section">
            <h1><strong>Dashboard</strong></h1>
            <div className="charts-container">
              <div className="chart">
                <Bar data={chartData} />
              </div>
              <div className="chart">
                <Line data={lineData} />
              </div>
            </div>
            <div className="totals">
              <div className="total-box total-users">
                <p><strong>Total Users:</strong> {users.length}</p>
              </div>
              <div className="total-box total-plans">
                <p><strong>Total Plans:</strong> {plans.length}</p>
              </div>
              <div className="total-box total-trainers">
                <p><strong>Total Trainers:</strong> {trainers.length}</p>
              </div>
              <div className="total-box total-meetings">
                <p><strong>Total Meetings:</strong> {meetings.length}</p>
              </div>
            </div>
            <div className="add-trainer-section">
              <button onClick={handleAddTrainer}>Add Trainer</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <ul>
          <li>💪DynamicFit</li>
          <li onClick={() => setActiveSection('dashboard')} className={activeSection === 'dashboard' ? 'active' : ''}>Dashboard</li>
          <li onClick={() => setActiveSection('users')} className={activeSection === 'users' ? 'active' : ''}>Users</li>
          <li onClick={() => setActiveSection('plans')} className={activeSection === 'plans' ? 'active' : ''}>Plans</li>
          <li onClick={() => setActiveSection('trainers')} className={activeSection === 'trainers' ? 'active' : ''}>Trainers</li>
          <li onClick={() => setActiveSection('meetings')} className={activeSection === 'meetings' ? 'active' : ''}>Meetings</li>
          <li onClick={() => setActiveSection('reviews')} className={activeSection === 'reviews' ? 'active' : ''}>Reviews</li> {/* New section */}
        </ul>
      </aside>
      <main className="content">
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminDashboard;

