import React, { useState } from "react";
import ReactConfetti from "react-confetti";
import CompletedBadge from "./CompletedBadge";
import "./CertificationCards.css";

function CertificationCards({ certData, setCertData, saveCertifications  }) {
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [newCert, setNewCert] = useState({
    startDate: "",
    dueDate: "",
    title: "",
    subtitle: "",
    milestones: [""],
  });

  const handleDelete = (indexToDelete) => {
    const updatedCerts = certData.filter((_, index) => index !== indexToDelete);
    setCertData(updatedCerts);
    saveCertifications(updatedCerts);
  };

  const handleUpdate = (e, index = null) => {
    const { name, value } = e.target;
    
    if (name === "milestones") {
      const updatedMilestones = [...newCert.milestones];
      updatedMilestones[index] = value;
      setNewCert({ ...newCert, milestones: updatedMilestones });
    } else {
      setNewCert((prev) => ({ ...prev, [name]: value }));
    }
  };

  const addMilestoneInput = () => {
    setNewCert((prev) => ({
      ...prev,
      milestones: [...prev.milestones, ""],
    }));
  };

  const handleAddCertification = (e) => {
    e.preventDefault();
  
    if (
      newCert.title &&
      newCert.subtitle &&
      newCert.startDate &&
      newCert.dueDate &&
      newCert.milestones.length &&
      newCert.milestones.every((m) => m.trim() !== "")
    ) {
      const newCertification = {
        ...newCert,
        completedMilestones: [],
      };
  
      const sorted = [...certData, newCertification].sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
      setCertData(sorted);
      saveCertifications(sorted);
      setNewCert({
        startDate: "",
        dueDate: "",
        title: "",
        subtitle: "",
        milestones: [""],
      });
    }
  };

  const toggleMilestone = (certIndex, milestone) => {
    const updated = certData.map((cert, index) => {
      if (index === certIndex) {
        const isCompleted = cert.completedMilestones.includes(milestone);
        const updatedCompleted = isCompleted
          ? cert.completedMilestones.filter((m) => m !== milestone)
          : [...cert.completedMilestones, milestone];

        const allComplete =
          updatedCompleted.length === cert.milestones.length &&
          cert.milestones.length > 0;

        if (allComplete && cert.completedMilestones.length !== cert.milestones.length) {
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
        }

        return {
          ...cert,
          completedMilestones: updatedCompleted,
        };
      }
      return cert;
    });
    setCertData(updated);
    saveCertifications(updated);
  };

  const calculateProgress = (cert) => {
    if (!cert.milestones.length) return 0;
    return Math.round((cert.completedMilestones.length / cert.milestones.length) * 100);
  };

  const calculateTimeLeft = (dueDate, completedDate = null) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    if (completedDate) {
      const completed = new Date(completedDate);
      const diff = Math.ceil((completed - due) / (1000 * 60 * 60 * 24));
      const formattedDate = completed.toLocaleDateString();
  
      if (diff === 0) {
        return `Completed on ${formattedDate} (on time)`;
      } else {
        return `Completed on ${formattedDate} (late by ${diff} day${diff !== 1 ? 's' : ''})`;
      }
    }

      const diffDays = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        return `Due in ${diffDays} days`;
      } else if (diffDays === 0) {
        return "Due today";
      } else {
        return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
      }
  };

  return (
    <div className="cert-cards-container">
      {showConfetti && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={250}
          recycle={false}
        />
      )}

      <form className="add-cert-form" onSubmit={handleAddCertification}>
        <h3>Add New Certification</h3>

        <div className="left-column">
          <span>Start Date:</span>
          <input
            type="date"
            name="startDate"
            value={newCert.startDate}
            onChange={handleUpdate}
            required={true}
          />

          <span>Due Date:</span>
          <input
            type="date"
            name="dueDate"
            value={newCert.dueDate}
            onChange={handleUpdate}
            required={true}
          />

          <span>Certification Title:</span>
          <input
            type="text"
            name="title"
            placeholder="Ex. CCNP"
            value={newCert.title}
            onChange={handleUpdate}
            required={true}
          />

          <span>Certification Provider:</span>
          <input
            type="text"
            name="subtitle"
            placeholder="Ex. CISCO"
            value={newCert.subtitle}
            onChange={handleUpdate}
            required={true}
          />
        </div>

        <div className="right-column">
          <span>Progress Milestones:</span>
          {newCert.milestones.map((milestone, index) => (
            <input
              key={index}
              type="text"
              name="milestones"
              placeholder={`Milestone ${index + 1}`}
              value={milestone}
              onChange={(e) => handleUpdate(e, index)}
              required={true}
              />
          ))}

          <button
            type="button"
            className="btn"
            onClick={addMilestoneInput}
          >
            Add Another Milestone
          </button>
        </div>

        <div className="add-cert-button">
          <button 
            type='submit'
            className="btn">
            Add This Cert
          </button>
        </div>
      </form>

      {certData && certData.length > 0 ? (
        certData.map((cert, index) => {
          const progress = calculateProgress(cert);
          return (
            <div className="cert-card bcca-card" key={index}>
              <p className="cert-due-date">Due: {cert.dueDate}</p>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-subtitle">{cert.subtitle}</p>

              <div className="progress-wrapper">
                <div className="progress-label">
                  <strong>{progress}%</strong> Complete
                </div>
                <div className="progress-bar-bg">
                  <div
                    className="progress-bar-fg"
                    style={{
                      width: `${progress}%`,
                      backgroundColor:
                        progress === 100 ? '#2caa85'
                          : progress >= 75 ? '#9cd4e4'
                          : progress >= 50 ? '#ffe549'
                          : progress >= 25? '#e07645'
                          : '#F9F0E1'
                    }}
                  ></div>
                </div>
              </div>

              <ul className="milestones">
                {cert.milestones.map((milestone, i) => (
                  <li key={i}>
                    <label>
                      <input
                        type="checkbox"
                        checked={cert.completedMilestones.includes(milestone)}
                        onChange={() => toggleMilestone(index, milestone)}
                      />
                      {milestone}
                    </label>
                  </li>
                ))}
              </ul>

              {/* <div className="time-left">{calculateTimeLeft(cert.dueDate)}</div> */}

              {progress === 100 ? (
                <div className="time-left">
                  <CompletedBadge />
                </div>
              ) : (
                <div className="time-left">{calculateTimeLeft(cert.dueDate)}</div>
              )}

              <div className="card-actions">
                <button className="btn" onClick={() => handleUpdate(index)}>
                  Update
                </button>
                <button className="btn" onClick={() => handleDelete(index)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p>No certifications found.</p>
      )}
    </div>
  );
}

export default CertificationCards;
