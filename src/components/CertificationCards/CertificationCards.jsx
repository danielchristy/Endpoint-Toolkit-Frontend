import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import CompletedBadge from "./CompletedBadge";
import "./CertificationCards.css";

function CertificationCards() {
  
  const [certData, setCertData] = useState([]);

  const [showConfetti, setShowConfetti] = useState(false);
  
  const [newCert, setNewCert] = useState({
    date: "",
    title: "",
    subtitle: "",
    progress: 0,
    timeLeft: "",
  });

  const handleDelete = (indexToDelete) => {
    const updatedCerts = certData.filter((_, index) => index !== indexToDelete);
    setCertData(updatedCerts);
  };

  const handleUpdate = (indexToUpdate) => {
    const updatedCerts = certData.map((cert, index) => {
      if (index === indexToUpdate) {
        const newProgress = Math.min(cert.progress + 10, 100);
        if (newProgress === 100 && cert.progress < 100) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 6000);
        }
        return { ...cert, progress: newProgress };
      }
      return cert;
    });
    setCertData(updatedCerts);
  };

  const handleAddCertification = (e) => {
    e.preventDefault(); 
    if (newCert.title && newCert.subtitle && newCert.date && newCert.timeLeft) {
      const updatedCert = {
        ...newCert,
        progress: newCert.progress ? parseInt(newCert.progress, 10) : 0, 
      };
  
      const updatedCerts = [...certData, updatedCert];
      updatedCerts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
      setCertData(updatedCerts);
      setNewCert({
        date: "",
        title: "",
        subtitle: "",
        progress: 0,
        timeLeft: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCert((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="cert-cards-container bcca-bg">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <form className="add-cert-form" onSubmit={handleAddCertification}>
        <h3>Add New Certification</h3>
        <input
          type="text"
          name="date"
          placeholder="Date (e.g., Apr 25, 2025)"
          value={newCert.date}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="title"
          placeholder="Certification Title"
          value={newCert.title}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="subtitle"
          placeholder="Subtitle"
          value={newCert.subtitle}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="progress"
          placeholder="Progress (0-100)"
          value={newCert.progress}
          onChange={handleInputChange}
          min="0"
          max="100"
        />
        <input
          type="text"
          name="timeLeft"
          placeholder="Time Left (e.g., 2 weeks left)"
          value={newCert.timeLeft}
          onChange={handleInputChange}
          required
        />
        <button className="btn" type="submit">
          Add Certification
        </button>
      </form>

      {certData.map((cert, index) => (
        <div className="cert-card bcca-card" key={index}>
          <p className="cert-date bcca-text-muted">{cert.date}</p>
          <h3 className="cert-title bcca-text-accent">{cert.title}</h3>
          <p className="cert-subtitle bcca-text-secondary">{cert.subtitle}</p>

          <div className="progress-wrapper">
            <div className="progress-label">
              Progress: <strong>{cert.progress}%</strong>
            </div>
            <div className="progress-bar-bg">
              <div
                className="progress-bar-fg"
                style={{ width: `${cert.progress}%` }}
              ></div>
            </div>
          </div>

          <div className="time-left bcca-text-muted">{cert.timeLeft}</div>

          {cert.progress === 100 && <CompletedBadge />}

          <div className="card-actions">
            <button className="btn" onClick={() => handleUpdate(index)}>
              Update
            </button>
            <button className="btn" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationCards;





