import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResumeBuilder.css';

const ResumeBuilder = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: 'JavaScript', selected: false },
    { id: 2, name: 'React', selected: false },
    { id: 3, name: 'Java', selected: false },
    { id: 4, name: 'PostgreSQL', selected: false },
    { id: 5, name: 'Python', selected: false },
    { id: 6, name: 'Docker', selected: false },
    { id: 7, name: 'AWS', selected: false },
    { id: 8, name: 'HTML5', selected: false },
    { id: 9, name: 'CSS', selected: false },
  ]);
  
  // Store the name of the uploaded file (if any)
  const [resumeFile, setResumeFile] = useState(null);
  const resumeRef = useRef();

  const toggleSkill = (id) => {
    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.id === id ? { ...skill, selected: !skill.selected } : skill
      )
    );
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0].name);
    }
  };

  const exportPDF = () => {
    html2canvas(resumeRef.current).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      pdf.save('resume.pdf');
    });
  };

  return (
    <div className="resume-builder-container">
      <h2>Select Skills</h2>
      <div className="skill-list">
        {skills.map(skill => (
          <label key={skill.id} className="skill-tag">
            <input
              type="checkbox"
              checked={skill.selected}
              onChange={() => toggleSkill(skill.id)}
            />
            {skill.name}
          </label>
        ))}
      </div>

      <h2>Your Resume</h2>
      <div ref={resumeRef} className="resume-preview">
        <h3>Your Resume Preview</h3>
        {/* File Upload Area */}
        {!resumeFile ? (
          <div
            className="resume-upload-area"
            onClick={() => document.getElementById('fileInput').click()}
          >
            Drag & Drop or Click to Upload Your Resume
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        ) : (
          <p>Uploaded File: {resumeFile}</p>
        )}
        {/* Display Selected Skills */}
        <ul>
          {skills.filter(s => s.selected).map(s => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ul>
      </div>

      <button className="download-button" onClick={exportPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default ResumeBuilder;


