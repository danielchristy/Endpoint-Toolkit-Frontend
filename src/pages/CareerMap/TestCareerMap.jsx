import React, { useState } from "react";
import { HexGrid, Layout, Hexagon, Text } from "react-hexgrid";

const directions = [
  { q: 0, r: 0, s: 0 }, // center
  { q: 1, r: -1, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
  { q: -1, r: 0, s: 1 },
  { q: 0, r: -1, s: 1 },
];

const fieldLabels = [
{
  id: 1, label: "Enablement",
  description: "The complex technology ecosystem is driving demand for a wide array of workers who ensure technology activities are running smoothly, such as IT project managers, department leads and IT channel professionals.",
  searchKeyword: 'IT project manager'
},
{
  id: 2, label: "Support",
  description: "Even as many routine support tasks are being automated, organizations continue to invest in tech support in order to drive the highest levels of productivity and handle increasingly complex employee experience issues.",
  searchKeyword: 'IT support'
},
{
  id: 3, label: "Infrastructure",
  description: "The most cutting-edge solutions still need to run on hardware (real or virtualized), and infrastructure professionals need to stay on top of the latest trends in cloud computing and architecture optimization.",
  searchKeyword: 'system administrator'
},
{
  id: 4, label: "Software",
  description: "Whether it's improving online presence or exploring the latest AI tools for strategic implementation, organizations often have internal software resources to build internal tools or to customize and automate third-party applications.",
  searchKeyword: 'software developer'
},
{
  id: 5, label: "Cybersecurity",
  description: "Reliance on digital operations means that cybercriminals have lots of opportunity for profit, and changes in cybersecurity such as a zero trust approach and formalized risk analysis are driving demand for multiple specializations.",
  searchKeyword: 'cybersecurity analyst'
},
{
  id: 6, label: "Data",
  description: "The focal point for competitive differentiation is quickly becoming the ability to manage and analyze the vast datasets sitting in different organizational silos, and data is poised to be the largest growth area in technology over the next decade.",
  searchKeyword: 'data scientist'
},
];
const jobLabels = {
  Software: ["Frontend Dev", "Backend Dev", "Fullstack Dev", "QA Tester", "PM", "DevOps"],
  Data: ["Data Analyst", "Data Engineer", "ML Engineer", "BI Developer", "Statistician", "Data Architect"],
  // Add more if needed
};

const HexMap = () => {
  const [stage, setStage] = useState(0); // 0 = intro, 1 = field selection, 2 = job view
  const [centerLabel, setCenterLabel] = useState("Start Exploring");
  const [surroundingLabels, setSurroundingLabels] = useState([]);

  const handleClick = (index) => {
    if (stage === 0 && index === 0) {
      // Show field options
      setCenterLabel("Pick a Field");
      setSurroundingLabels(fieldLabels);
      setStage(1);
    } else if (stage === 1 && index > 0) {
      // Show job options for clicked field
      const selectedField = surroundingLabels[index - 1];
      setCenterLabel(selectedField.label); // Use the label property
      const jobs = jobLabels[selectedField.label] || ["Coming Soon", "Coming Soon", "Coming Soon", "Coming Soon", "Coming Soon", "Coming Soon"];
      setSurroundingLabels(jobs.map((job) => ({ label: job }))); // Convert job strings to objects with a label property
      setStage(2);
    } else if (stage === 2 && index === 0) {
      // Back to field options
      setCenterLabel("Pick a Field");
      setSurroundingLabels(fieldLabels);
      setStage(1);
    }
  };

  const getVisibleHexes = () => {
    if (stage === 0) return [directions[0]]; // only center
    return directions; // center + 6 surrounding
  };

  return (
    <div
      className="w-full h-screen flex justify-center items-center bg-gray-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Ensure full viewport height
        backgroundColor: "#f3f4f6", // Matches bg-gray-100
      }}
    >
      <HexGrid width={800} height={600} viewBox="-50 -50 100 100">
        <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.1} origin={{ x: 0, y: 0 }}>
          {getVisibleHexes().map((pos, index) => (
            <Hexagon
              key={`hex-${index}`}
              q={pos.q}
              r={pos.r}
              s={pos.s}
              onClick={() => handleClick(index)}
              style={{ cursor: "pointer" }}
            >
              <Text
                style={{
                  fontSize: 2.5,
                  textAnchor: "middle",
                  dominantBaseline: "central",
                  fill: "white",
                }}
              >
                {index === 0 ? centerLabel : surroundingLabels[index - 1]?.label}
              </Text>
            </Hexagon>
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
};

export default HexMap;
