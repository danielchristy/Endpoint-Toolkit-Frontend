import React, { useState } from "react";
import { HexGrid, Layout, Hexagon, Text, Pattern } from "react-hexgrid";
import { filterJobs, getJobs, getJobDetails } from './CareerMapUtils/careerUtils';
import './TestCareerMap.css';

const directions = [
  { q: 0, r: 0, s: 0 },
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
  const [hoveredHex, setHoveredHex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [annualNationalWages, setAnnualNationalWages] = useState(0);
  const [annualStateWages, setAnnualStateWages] = useState(0);

  const handleFieldClick = async (field) => {
    setLoading(true);
    setActiveField(field);
    setSelectedDescription(field.description);
    setCenterLabel(field.label);

    try {
      const jobs = await getJobs(field.searchKeyword);
      const filteredJobs = filterJobs(jobs, field.label);
      console.log("Filtered Jobs:", filteredJobs);

      const jobNodeData = filteredJobs.map((job, index) => ({
        id: index,
        title: job.OnetTitle,
        code: job.OnetCode,
        description: job.OccupationDescription,
      }));

      setJobData(jobNodeData);
      console.log("Job Data:", jobNodeData);
      console.log(setJobData(jobNodeData))
      setStage(2);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleJobClick = async (job) => {
    setLoading(true);
    try {
      const detailsArray = await getJobDetails(job.code);
      const details = detailsArray[0] || null;

      if (!details) {
        console.error("No details found for this job");
        setJobDetails(null);
        return;
      }

      const sortingWages = (jobDetails) => {
        const nationalWage = jobDetails.Wages?.NationalWagesList?.[0] || null;
        const stateWage = jobDetails.Wages?.StateWagesList?.[0] || null;

        if (nationalWage && nationalWage.RateType === 'Annual') {
          setAnnualNationalWages(0);
        } else if (nationalWage) {
          setAnnualNationalWages(1);
        }

        if (stateWage && stateWage.RateType === 'Annual') {
          setAnnualStateWages(0);
        }
        else if (stateWage) {
          setAnnualStateWages(1);
        }
      };

      sortingWages(details);

      setJobDetails(details);
      console.log("Job Details:", details);
      console.log("Job Details:", details);
      setCenterLabel(job.title);
      setStage(3);
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
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

  const createBalancedPositions = (count) => {
    if (count <= 1) return [{ q: 0, r: 0, s: 0 }];

    const positions = [{ q: 0, r: 0, s: 0 }];

    const firstRing = [
      { q: 1, r: -1, s: 0 },
      { q: 0, r: -1, s: 1 },
      { q: -1, r: 0, s: 1 },
      { q: -1, r: 1, s: 0 },
      { q: 0, r: 1, s: -1 },
      { q: 1, r: 0, s: -1 }
    ];

    const secondRing = [
      { q: 2, r: -2, s: 0 },
      { q: 1, r: -2, s: 1 },
      { q: 0, r: -2, s: 2 },
      { q: -1, r: -1, s: 2 },
      { q: -2, r: 0, s: 2 },
      { q: -2, r: 1, s: 1 },
      { q: -2, r: 2, s: 0 },
      { q: -1, r: 2, s: -1 },
      { q: 0, r: 2, s: -2 },
      { q: 1, r: 1, s: -2 },
      { q: 2, r: 0, s: -2 },
      { q: 2, r: -1, s: -1 }
    ];

    const thirdRing = [
      { q: 3, r: -3, s: 0 },
      { q: 2, r: -3, s: 1 },
      { q: 1, r: -3, s: 2 },
      { q: 0, r: -3, s: 3 },
      { q: -1, r: -2, s: 3 },
      { q: -2, r: -1, s: 3 },
      { q: -3, r: 0, s: 3 },
      { q: -3, r: 1, s: 2 },
      { q: -3, r: 2, s: 1 },
      { q: -3, r: 3, s: 0 },
      { q: -2, r: 3, s: -1 },
      { q: -1, r: 3, s: -2 },
      { q: 0, r: 3, s: -3 },
      { q: 1, r: 2, s: -3 },
      { q: 2, r: 1, s: -3 },
      { q: 3, r: 0, s: -3 },
      { q: 3, r: -1, s: -2 },
      { q: 3, r: -2, s: -1 }

    ];




    for (let i = 0; i < firstRing.length && positions.length < count; i++) {
      positions.push(firstRing[i]);
    }

    for (let i = 0; i < secondRing.length && positions.length < count; i++) {
      positions.push(secondRing[i]);
    }

    for (let i = 0; i < thirdRing.length && positions.length < count; i++) {
      positions.push(thirdRing[i]);
    }


    return positions;
  };

  const getVisibleHexes = () => {
    if (stage === 0) {
      return [{ pos: { q: 0, r: 0, s: 0 }, label: centerLabel }];
    }

    if (stage === 3) {
      return [
        { pos: { q: 0, r: 0, s: 0 }, label: centerLabel },
        {
          pos: { q: 1, r: -1, s: 0 },
          label: activeField?.label || "Field",
          field: activeField,
        },
      ];
    }

    if (stage === 2) {
      const jobCount = Math.min(jobData.length, 37);

      const positions = createBalancedPositions(jobCount + 1);

      const dynamicHexes = [];

      dynamicHexes.push({
        pos: positions[0],
        label: centerLabel
      });

      for (let i = 0; i < jobCount; i++) {
        if (i + 1 < positions.length) {
          dynamicHexes.push({
            pos: positions[i + 1],
            label: jobData[i].title,
            job: jobData[i],
          });
        }
      }

      return dynamicHexes;
    }

    return directions.map((d, i) => ({
      pos: d,
      label: i === 0 ? centerLabel : fieldHexes[i - 1]?.label,
      field: fieldHexes[i - 1],
    }));
  };

  const renderJobDetails = () => {
    if (!jobDetails) return <div>Loading job details...</div>;

    return (
      <div className="job-details-container bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">{jobDetails?.OnetTitle || "Job Details"}</h1>
        <p className="text-sm text-gray-500 mb-6"><i>ONET Code: {jobDetails?.OnetCode || "N/A"}</i></p>

        <div className="job-description mb-6">
          <h4 className="text-lg font-semibold mb-2">Job Description</h4>
          <p>{jobDetails?.OnetDescription || "No Description available."}</p>
        </div>

        {/* New Wage Comparison Section */}
        <div className="wage-comparison">
          <h4 className="wage-comparison-header">Wage Comparison</h4>
          <table className="wage-comparison-table">
            <thead>
              <tr>
                <th></th>
                <th>Entry Level</th>
                <th>Median</th>
                <th>High Tier</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="row-title">National</td>
                <td>
                  {jobDetails?.Wages?.NationalWagesList?.[annualNationalWages]?.Pct10
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(jobDetails.Wages.NationalWagesList[annualNationalWages].Pct10))
                    : 'N/A'}
                </td>
                <td>
                  {jobDetails?.Wages?.NationalWagesList?.[annualNationalWages]?.Median
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(jobDetails.Wages.NationalWagesList[annualNationalWages].Median))
                    : 'N/A'}
                </td>
                <td>
                  {jobDetails?.Wages?.NationalWagesList?.[annualNationalWages]?.Pct90
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(jobDetails.Wages.NationalWagesList[annualNationalWages].Pct90))
                    : 'N/A'}
                </td>
              </tr>
              <tr>
                <td className="row-title">Mississippi</td>
                <td>
                  {jobDetails?.Wages?.StateWagesList?.[annualStateWages]?.Pct10
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(jobDetails.Wages.StateWagesList[annualStateWages].Pct10))
                    : 'N/A'}
                </td>
                <td>
                  {jobDetails?.Wages?.StateWagesList?.[annualStateWages]?.Median
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(jobDetails.Wages.StateWagesList[annualStateWages].Median))
                    : 'N/A'}
                </td>
                <td>
                  {jobDetails?.Wages?.StateWagesList?.[annualStateWages]?.Pct90
                    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(jobDetails.Wages.StateWagesList[annualStateWages].Pct90))
                    : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="job-outlook bg-yellow-50 p-4 rounded-md mb-6">
          <div className="flex items-center mb-2">
            <div className="bright-outlook">
              <p className="bright-outlook-header">Bright Outlook:</p>
            </div>
            <div className="w-1/2">
              <p className="font-medium">{jobDetails?.BrightOutlook ? jobDetails.BrightOutlook : "No"}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="bright-outlook">
              <p className="bright-outlook-header">Projected Growth Rate:</p>
            </div>
            <div className="w-1/2">
              <p className="font-medium">{jobDetails?.BrightOutlookCategory || "N/A"}</p>
            </div>
          </div>
        </div>

        {jobDetails?.RelatedOnetTitles?.length > 0 && (
          <div className="related-jobs mb-6">
            <h2 className="text-lg font-semibold mb-2">Related Jobs</h2>
            <ul className="list-disc pl-5 text-gray-600">
              {jobDetails.RelatedOnetTitles.slice(0, 5).map((relatedJob, index) => (
                <li key={index} className="mb-1">{relatedJob.OnetTitle}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="linkedin-search mb-6">
          <a
            href={`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(jobDetails?.OnetTitle || '')}&location=Mississippi`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Search for "{jobDetails?.OnetTitle}" jobs in Mississippi on LinkedIn
          </a>
        </div>

        <button
          onClick={handleBackClick}
          className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Back to Jobs
        </button>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gray-100">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="loader"></div>
            <p className="mt-4 text-center">Loading...</p>
          </div>
        </div>
      )}

      {stage !== 3 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4 w-full">
          <div className="hex-grid-container">
            <HexGrid width={800} height={500} viewBox="-40 -40 80 80">
              <Layout size={{ x: 9, y: 7.1 }} flat={false} spacing={1.03} origin={{ x: 0, y: 0 }}>
                {getVisibleHexes().map((hex, index) => {
                  const isHovered = hoveredHex === index;
                  const isCenter = index === 0;
                  const hexId = `hex-${index}`;

                  return (
                    <g
                      key={hexId}
                      className={`hexagon-wrapper ${isHovered ? 'hexagon-hovered' : ''} ${index === 0 ? 'hexagon-center' : ''}`}
                      onMouseEnter={() => {
                        setHoveredHex(index);
                        if (!isCenter && hex.field) {
                          setSelectedDescription(hex.field.description);
                        } else if (!isCenter && hex.job) {
                          setSelectedDescription(hex.job.description || "");
                        }
                      }}
                      onMouseLeave={() => {
                        setHoveredHex(null);
                        if (stage === 1 && !isCenter) {
                          setSelectedDescription("");
                        }
                      }}
                    >
                      <Hexagon
                        q={hex.pos.q}
                        r={hex.pos.r}
                        s={hex.pos.s}
                        className={`${hoveredHex === index ? 'hexagon-hovered' : ''} ${isCenter ? 'hexagon-center' : ''}`}
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
                            // Reset to field selection if center is clicked
                            setCenterLabel("Pick a Field");
                            setFieldHexes(fieldNodes);
                            setStage(1);
                          }
                        }}
                      >
                        <Text
                          style={{
                            fontSize: hex.label?.length > 16 ? 1.5 : 2,
                            textAnchor: "middle",
                            dominantBaseline: "central",
                            fontWeight: "bold"
                          }}
                        >
                          {hex.label?.length > 20 ? `${hex.label.slice(0, 17)}...` : hex.label}
                        </Text>
                      </Hexagon>
                      <Pattern
                        id={hexId}
                        link=""
                        size={{ x: 10, y: 10 }}
                        className={`hex-pattern ${isHovered ? 'hex-hovered' : ''}`}
                      >
                        <path className="hex-pattern" d="M50 7 Q52 7 54 8 L92 27 ..." />
                      </Pattern>
                    </g>
                  );
                })}
              </Layout>
            </HexGrid>
          </div>

          {stage === 1 && (
            <div className="description-container bg-white p-4 mt-6 rounded-lg shadow-md max-w-xl">
              <p className="text-gray-700">{selectedDescription || "Hover over a field to see its description."}</p>
            </div>
          )}

          {stage === 2 && (
            <div className="description-container bg-white p-4 mt-6 rounded-lg shadow-md max-w-xl">
              <p className="text-gray-700">{selectedDescription || "Click on a job to see details."}</p>

              <button
                onClick={handleBackClick}
                className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
              >
                Back to Fields
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 w-full flex flex-col items-center justify-center p-4">
          {renderJobDetails()}
        </div>
      )}
    </div>
  );
};

export default HexMap;