import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import CertificationCards from '../../components/CertificationCards/CertificationCards';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showSettings, setShowSettings] = useState(false);
  const [certData, setCertData] = useState([]);

  const showQuestionnaire = () => {
    navigate('/questionnaire');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className='user-profile'>
      <div className='user-info'>
        <div className='user-details-text'>
          {/* <div className='settings-btn' onClick={toggleSettings}>
            <span className='settings-icon'>⚙️</span>
          </div> */}
          <h2><strong>{user.first_name} {user.last_name}</strong> </h2>
          <p className='user-email'>{user.email}</p>
        </div>
      </div>

      <div className='dashboard'>
        {/* <div className='dashboard-header'>
            <h2 className='dashboard-title'>Your Dashboard</h2>
            <h6>Questionnaire Status</h6>
            {user.questionnaire_completed ? (
              <div className='questionnaire-prompt'>
                <p>Your questionnaire results are ready!</p>
                <button className='view-results-btn'>View Results</button>
              </div>
            ) : (
              <div className='questionnaire-prompt'>
                <p>Complete the questionnaire to get personalized recommendations</p>
                <button className='questionnaire-btn' onClick={showQuestionnaire}>
                  <span className='questionnaire-icon'>📝</span>
                  Take Questionnaire
                </button>
              </div>
            )}
          </div> */}
        
          <div className='certifications-section'>
            <h3>Certification Tracker</h3>
            <div className='certification-cards'>
            <CertificationCards certData={certData} setCertData={setCertData} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfile;