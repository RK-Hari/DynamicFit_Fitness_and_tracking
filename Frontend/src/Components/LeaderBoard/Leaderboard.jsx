import React, { useEffect, useState } from 'react';
import './Leaderboard.css'; // Import the CSS file
import Navbar from '../Navbar';
import Footer from '../Footer';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/users/leaderboard')
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="leaderboard-container">
      <Navbar/>
      <h2 className="leaderboard-header">🏆 Leaderboard 🏆</h2>
      <div className="leaderboard-table-container">
        <table className="leaderboard-table">
          <thead className="leaderboard-thead">
            <tr className="leaderboard-tr">
              <th className="leaderboard-th">Rank</th>
              <th className="leaderboard-th">User Name</th>
              <th className="leaderboard-th">Monthly Target Achieved</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.userId}
                className={`leaderboard-tr leaderboard-row-${(index % 4) + 1}`}
              >
                <td className="leaderboard-td">{index + 1}</td>
                <td className="leaderboard-td">{user.userName}</td>
                <td className="leaderboard-td">{user.plan.monthlyTargetAchieved || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-10'>
      <Footer/>
      </div>
    </div>
  );
};

export default Leaderboard;
