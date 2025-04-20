import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home/Home';
import CareerMap from './pages/CareerMap/CareerMap';
import CertificationCards from './components/CertificationCards/CertificationCards';
import ResourcePage from './components/Resources/ResourcePage';
import ResumeBuilder from './components/ResumeBuilder/ResumeBuilder';
import CustomCalendar from './components/CustomCalendar/CustomCalendar';
import QuestionnairePage from './components/QuestionnairePage/QuestionnairePage';
import UserProfile from './pages/UserProfile/UserProfile';
// import UserDashboard from './pages/UserProfile/UserDashboard';
import Registration from './pages/Registration/Registration';

import PrivateRoute from './components/PrivateRoute';
import TestAPICalls from './pages/TestAPICalls/TestAPICalls';
import TestOnetAPI from './pages/TestAPICalls/TestOnetAPI';

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

const upcoming = [
  { title: 'BCCA Workshop', start: new Date(2025, 3, 10, 14, 0), end: new Date(2025, 3, 10, 16, 0) },
  { title: 'Interview Prep', start: new Date(2025, 3, 12, 10, 0), end: new Date(2025, 3, 12, 11, 0) },
];

function App() {
  return (

    <div className="app-wrapper">
      <nav className='nav'>
        <NavBar />
      </nav>

      <main className='content'>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/careermap" element={<CareerMap />} />
          <Route path="/careers" element={<CertificationCards />} />
          <Route path="/resources" element={<ResourcePage />} />
          <Route path="/resume" element={<ResumeBuilder />} />
          <Route path="/calendar" element={<CustomCalendar initialEvents={upcoming} />} />
          <Route path="/questionnaire" element={<QuestionnairePage />} />
          {/* <Route path="/user" element={<UserPage />} /> */}
          <Route path="/register" element={<Registration />} />
          <Route path="/test" element={<TestAPICalls />} />
          <Route path="/test-onet" element={<TestOnetAPI />} />

          {/* Protected routes */}
          <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <UserProfile />
                </PrivateRoute>
              }
            />
        </Routes>
      </main>

      <footer className='footer'>
        <Footer />
      </footer>

      </div>
  );
}

export default App;
