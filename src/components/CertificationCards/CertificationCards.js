import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import CompletedBadge from "./CompletedBadge";
import "./CertificationCards.css";

function CertificationCards() {
  
  const [certData, setCertData] = useState([
    {
      date: "Feb 02, 2021",
      title: "HTML/CSS Certification",
      subtitle: "Prototyping",
      progress: 90,
      timeLeft: "2 days left",
    },
    {
      date: "Feb 05, 2021",
      title: "JavaScript Certification",
      subtitle: "Shopping",
      progress: 30,
      timeLeft: "3 weeks left",
    },
    {
      date: "Mar 03, 2021",
      title: "React Certification",
      subtitle: "Wireframing",
      progress: 20,
      timeLeft: "1 month left",
    },
    {
      date: "Mar 08, 2021",
      title: "Node.js Certification",
      subtitle: "Medical",
      progress: 50,
      timeLeft: "2 weeks left",
    },
    {
      date: "Apr 01, 2021",
      title: "AWS Cloud Practitioner",
      subtitle: "Cloud Basics",
      progress: 70,
      timeLeft: "1 week left",
    },
  ]);

  
  const [showConfetti, setShowConfetti] = useState(false);

  
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

  return (
    <div className="cert-cards-container bcca-bg">
      {/* Render confetti overlay if triggered */}
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
        />
      )}

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

          {/* Render Completed Badge if progress reaches 100% */}
          {cert.progress === 100 && <CompletedBadge />}

          {/* Themed Action Buttons */}
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
}

export default CertificationCards;





