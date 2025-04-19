import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./QuestionnairePage.css"; // Optional: for styling

function QuestionnairePage() {
  // Access the selected experience passed from the Home page
  const location = useLocation();
  const { experience } = location.state || { experience: "None" };

  // State to store the user's answers
  const [answers, setAnswers] = useState({
    reason: "",
    interests: "",
    goal: "",
    preferredRole: "",
    timeline: "",
  });

  // Handle form changes
  const handleChange = (e) => {
    setAnswers({
      ...answers,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission (e.g., move to the next step or send to a backend)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Answers:", answers);
    // Navigate to another page or do something else here
  };

  return (
    <div className="questionnaire-container">
      <h1>Questionnaire Page</h1>
      <div className="questionnaire-card">
        <form onSubmit={handleSubmit}>
          {/* 1. Reason for exploring tech */}
          <div className="form-group">
            <label htmlFor="reason">
              What is your main reason for exploring a career in tech?
            </label>
            <input
              type="text"
              id="reason"
              name="reason"
              value={answers.reason}
              onChange={handleChange}
              placeholder="e.g., better pay, creativity, love for coding"
            />
          </div>

          {/* 2. Interests in tech fields */}
          <div className="form-group">
            <label htmlFor="interests">
              Which areas of tech interest you the most?
              <small> (Front-end, Back-end, DevOps, Data, etc.)</small>
            </label>
            <input
              type="text"
              id="interests"
              name="interests"
              value={answers.interests}
              onChange={handleChange}
              placeholder="e.g., Front-end, Cloud, AI/ML"
            />
          </div>

          {/* 3. Ultimate career goal */}
          <div className="form-group">
            <label htmlFor="goal">What is your ultimate career goal?</label>
            <input
              type="text"
              id="goal"
              name="goal"
              value={answers.goal}
              onChange={handleChange}
              placeholder="e.g., Become a senior engineer, start a tech company"
            />
          </div>

          {/* 4. Preferred role (radio buttons as an example) */}
          <div className="form-group">
            <label>Which role appeals to you most?</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="preferredRole"
                  value="frontend"
                  checked={answers.preferredRole === "frontend"}
                  onChange={handleChange}
                />
                Front-end Developer
              </label>
              <label>
                <input
                  type="radio"
                  name="preferredRole"
                  value="backend"
                  checked={answers.preferredRole === "backend"}
                  onChange={handleChange}
                />
                Back-end Developer
              </label>
              <label>
                <input
                  type="radio"
                  name="preferredRole"
                  value="devops"
                  checked={answers.preferredRole === "devops"}
                  onChange={handleChange}
                />
                DevOps Engineer
              </label>
            </div>
          </div>

          {/* 5. Timeline (select as an example) */}
          <div className="form-group">
            <label htmlFor="timeline">
              How soon do you want to transition or advance in tech?
            </label>
            <select
              id="timeline"
              name="timeline"
              value={answers.timeline}
              onChange={handleChange}
            >
              <option value="">--Select--</option>
              <option value="immediately">Immediately (0-3 months)</option>
              <option value="soon">Soon (3-6 months)</option>
              <option value="longTerm">Long-term (6+ months)</option>
            </select>
          </div>

          {/* Submit button */}
          <button type="submit" className="submit-button">
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default QuestionnairePage;

