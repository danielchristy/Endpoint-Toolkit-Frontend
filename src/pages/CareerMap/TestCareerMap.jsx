import React, { useState } from "react";
import { HexGrid, Layout, Hexagon, Text } from "react-hexgrid";
import { filterJobs, getJobs, getJobDetails } from './CareerMapUtils/careerUtils';
import './TestCareerMap.css';

const directions = [
  { q: 0, r: 0, s: 0 }, // center
  { q: 1, r: -1, s: 0 },
  { q: 1, r: 0, s: -1 },
  { q: 0, r: 1, s: -1 },
  { q: -1, r: 1, s: 0 },
  { q: -1, r: 0, s: 1 },
  { q: 0, r: -1, s: 1 },
];

const fieldNodes = [
  {
    id: 1,
    label: "Enablement",
    description: "Ensure tech activities run smoothly, such as IT project managers, department leads, and IT channel professionals.",
    searchKeyword: "IT project manager",
  },
  {
    id: 2,
    label: "Support",
    description: "Tech support drives productivity and handles increasingly complex employee experience issues.",
    searchKeyword: "IT support",
  },
  {
    id: 3,
    label: "Infrastructure",
    description: "Infrastructure professionals maintain systems and cloud architecture optimization.",
    searchKeyword: "system administrator",
  },
  {
    id: 4,
    label: "Software",
    description: "Software devs build tools, customize applications, and explore AI for business strategy.",
    searchKeyword: "software developer",
  },
  {
    id: 5,
    label: "Cybersecurity",
    description: "Cybersecurity experts handle risks in a zero trust environment.",
    searchKeyword: "cybersecurity analyst",
  },
  {
    id: 6,
    label: "Data",
    description: "Data professionals manage and analyze vast organizational datasets.",
    searchKeyword: "data scientist",
  },
];

const HexMap = () => {
  const [stage, setStage] = useState(0);
  const [centerLabel, setCenterLabel] = useState("Start Exploring");
  const [selectedDescription, setSelectedDescription] = useState("");
  const [jobData, setJobData] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [fieldHexes, setFieldHexes] = useState(fieldNodes);

  const handleFieldClick = async (field) => {
    setActiveField(field);
    setSelectedDescription(field.description);
    setCenterLabel(field.label);

    try {
      const jobs = await getJobs(field.searchKeyword);
      const filteredJobs = filterJobs(jobs, field.label);

      const jobNodeData = filteredJobs.map((job, index) => ({
        id: index,
        title: job.OnetTitle,
        code: job.OnetCode,
        description: job.OccupationDescription,
      }));

      setJobData(jobNodeData);
      setStage(2);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobData([]);
    }
  };

  const handleJobClick = async (job) => {
    try {
      const detailsArray = await getJobDetails(job.code);
      const details = detailsArray[0] || null;

      if (!details) {
        console.error("No details found for this job");
        setJobDetails(null);
        return;
      }

      setJobDetails(details);
      setCenterLabel(job.title);
      setStage(3);
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const handleBackClick = () => {
    if (stage === 3) {
      setStage(2);
      setJobDetails(null);
      setCenterLabel(activeField?.label || "Pick a Field");
    } else if (stage === 2) {
      setStage(1);
      setCenterLabel("Pick a Field");
      setSelectedDescription("");
    } else if (stage === 1) {
      setStage(0);
      setCenterLabel("Start Exploring");
      setSelectedDescription("");
    }
  };

  const getVisibleHexes = () => {
    if (stage === 0) {
      return [{ pos: { q: 0, r: 0, s: 0 }, label: centerLabel }];
    }

    if (stage === 3) {
      // Include the active field node along with the job details
      return [
        { pos: { q: 0, r: 0, s: 0 }, label: centerLabel }, // Center hex for job details
        {
          pos: { q: -1, r: 1, s: 0 }, // Position for the active field node
          label: activeField?.label || "Field",
          field: activeField,
        },
      ];
    }

    if (stage === 2) {
      const jobCount = Math.min(jobData.length, 20);
      const dynamicHexes = [{ pos: { q: 0, r: 0, s: 0 }, label: centerLabel }];

      let radius = 1;
      let hexCount = 0;

      while (hexCount < jobCount) {
        for (let q = -radius; q <= radius; q++) {
          for (let r = Math.max(-radius, -q - radius); r <= Math.min(radius, -q + radius); r++) {
            const s = -q - r;
            if (hexCount >= jobCount) break;
            dynamicHexes.push({
              pos: { q, r, s },
              label: jobData[hexCount].title,
              job: jobData[hexCount],
            });
            hexCount++;
          }
        }
        radius++;
      }

      return dynamicHexes;
    }

    return directions.map((d, i) => ({
      pos: d,
      label: i === 0 ? centerLabel : fieldHexes[i - 1]?.label,
      field: fieldHexes[i - 1],
    }));
  };

  return (
    <div className="w-full h-screen flex flex-col justify-between items-center bg-gray-100">
      {stage !== 3 ? (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <HexGrid width={800} height={600} viewBox="-50 -50 100 100">
            <Layout size={{ x: 10, y: 10 }} flat={false} spacing={1.3} origin={{ x: 0, y: 0 }}>
              {getVisibleHexes().map((hex, index) => (
                <Hexagon
                  key={`hex-${index}`}
                  q={hex.pos.q}
                  r={hex.pos.r}
                  s={hex.pos.s}
                  onClick={() => {
                    if (stage === 0 && index === 0) {
                      setCenterLabel("Pick a Field");
                      setFieldHexes(fieldNodes);
                      setStage(1);
                    } else if (stage === 1 && hex.field) {
                      handleFieldClick(hex.field);
                    } else if (stage === 2 && hex.job) {
                      handleJobClick(hex.job);
                    } else if ((stage === 1 || stage === 2) && index === 0) {
                      setCenterLabel("Pick a Field");
                      setFieldHexes(fieldNodes);
                      setStage(1);
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <Text
                    style={{
                      fontSize: hex.label?.length > 15 ? 1.5 : 2,
                      textAnchor: "middle",
                      dominantBaseline: "central",
                      fill: "white",
                    }}
                  >
                    {hex.label?.length > 20 ? `${hex.label.slice(0, 17)}...` : hex.label}
                  </Text>
                </Hexagon>
              ))}
            </Layout>
          </HexGrid>
        </div>
      ) : (
        <div className="job-details-container">
          <h1><strong>{jobDetails?.OnetTitle || "Job Details"}</strong></h1>
          <p><i>ONET Code: {jobDetails?.OnetCode || "N/A"}</i></p>

          <div className="job-description">
            <h4>Job Description</h4>
            <p>{jobDetails?.OnetDescription || "No Description available."}</p>
          </div>

          <div className="wages">
            <h4>Annual Wage Estimates</h4>
            <p>
              Entry Level Average: {jobDetails?.Wages?.NationalWagesList?.[0]?.Pct10
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(jobDetails.Wages.NationalWagesList[0].Pct10))
                : 'N/A'}
            </p>
            <p>
              Median Annual Wage: {jobDetails?.Wages?.NationalWagesList?.[0]?.Median
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(jobDetails.Wages.NationalWagesList[0].Median))
                : 'N/A'}
            </p>
            <p>
              High Tier Role Average: {jobDetails?.Wages?.NationalWagesList?.[0]?.Pct90
                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(Number(jobDetails.Wages.NationalWagesList[0].Pct90))
                : 'N/A'}
            </p>
          </div>

          <div className="job-outlook">
            <h4>Job Outlook</h4>
            <p>Bright Outlook: {jobDetails?.BrightOutlook || "N/A"}</p>
            <p>Projected Growth Rate: {jobDetails?.BrightOutlookCategory || "N/A"}</p>
          </div>

          {jobDetails?.RelatedOnetTitles?.length > 0 && (
            <div className="related-jobs">
              <h2>Related Jobs</h2>
              <ul>
                {jobDetails.RelatedOnetTitles.map((relatedJob, index) => (
                  <li key={index}>{relatedJob.OnetTitle}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="linkedin-search" style={{ marginTop: '50px' }}>
            <a
              href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobDetails?.OnetTitle || '')}&location=Mississippi`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Search for "{jobDetails?.OnetTitle}" jobs in Mississippi on LinkedIn
            </a>
          </div>

          <button onClick={handleBackClick} style={{ marginTop: '20px' }}>Back to Jobs</button>
        </div>
      )}
      {stage !== 3 && (
        <div className="description-container">
          <p>{selectedDescription || "Click on a field to see its description here."}</p>
        </div>
      )}
    </div>
  );
};

export default HexMap;
