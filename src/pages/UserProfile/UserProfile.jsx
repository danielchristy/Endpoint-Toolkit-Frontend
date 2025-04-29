import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import CertificationCards from '../../components/CertificationCards/CertificationCards';
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [certData, setCertData] = useState([]);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await axios.get(`https://api.devwaypoint.xyz/api/users/${user._id}`);
        if (res.data.certifications) {
          setCertData(res.data.certifications);
        }
      } catch (error) {
        console.error("Failed to load certifications:", error);
      }
    };

    if (user && user._id) {
      fetchCertifications();
    }
  }, [user]);

  const saveCertifications = async (updatedCerts) => {
    try {
      setCertData(updatedCerts); 
      await axios.put(`https://api.devwaypoint.xyz/api/users/${user._id}`, {
        certifications: updatedCerts,
      });
    } catch (err) {
      console.error("Failed to save certifications:", err);
    }
  };

  // const showQuestionnaire = () => {
  //   navigate('/questionnaire');
  // };

  // const toggleSettings = () => {
  //   setShowSettings(!showSettings);
  // };

  return (
    <div className='user-profile'>
      <div className='user-info'>
        <div className='user-details-text'>
          <h2><strong>{user.first_name} {user.last_name}</strong> </h2>
          <p className='user-email'>{user.email}</p>
        </div>
      </div>

      <div className='dashboard'>        
          <div className='certifications-section'>
            <h3>Certification Tracker</h3>
            <div className='certification-cards'>
            <CertificationCards 
              certData={certData} 
              setCertData={saveCertifications} 
              saveCertifications={saveCertifications} />
            </div>
          </div>
        </div>
      </div>
  );
};

export default UserProfile;