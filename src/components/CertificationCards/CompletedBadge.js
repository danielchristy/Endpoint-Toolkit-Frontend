// CompletedBadge.js
import React from "react";
import trophyIcon from "./trophy.png"; 

function CompletedBadge() {
  return (
    <div className="completed-badge" style={{ display: "flex", alignItems: "center" }}>
      <img src={trophyIcon} alt="Completed Badge" style={{ width: 24, height: 24, marginRight: 8 }} />
      <span style={{ fontWeight: "bold", color: "#ffbf00" }}>Completed</span>
    </div>
  );
}

export default CompletedBadge;
