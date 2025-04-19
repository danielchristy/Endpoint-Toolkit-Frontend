import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import HexNode from '../../components/HexNodes/HexNode';
import './CareerMap.css';

const CareerMap = () => {
    const [occupationData, setOccupationData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobData, setJobData] = useState([]);
    const [currentView, setCurrentView] = useState('start');
    const [activeNode, setActiveNode] = useState(null);
    const [chosenField, setChosenField] = useState(null);
    const [currentLevel, setCurrentLevel] = useState(null);
    const [chosenJob, setChosenJob] = useState(null);

    // const [hoveredNode, setHoveredNode] = useState(null);

    const fieldNodes = [
        // https://www.comptia.org/blog/a-taxonomy-for-technology-jobs
        // { id: 0, label: "test" },
        { id: 1, label: "Enablement",
            description: "The complex technology ecosystem is driving demand for a wide array of workers who ensure technology activities are running smoothly, such as IT project managers, department leads and IT channel professionals."
        },
        { id: 2, label: "Support",
            description: "Even as many routine support tasks are being automated, organizations continue to invest in tech support in order to drive the highest levels of productivity and handle increasingly complex employee experience issues."
        },
        { id: 3, label: "Infrastructure",
            description: "The most cutting-edge solutions still need to run on hardware (real or virtualized), and infrastructure professionals need to stay on top of the latest trends in cloud computing and architecture optimization."
        },
        { id: 4, label: "Software",
            description: "Whether it's improving online presence or exploring the latest AI tools for strategic implementation, organizations often have internal software resources to build internal tools or to customize and automate third-party applications."
        },
        { id: 5, label: "Cybersecurity",
            description: "Reliance on digital operations means that cybercriminals have lots of opportunity for profit, and changes in cybersecurity such as a zero trust approach and formalized risk analysis are driving demand for multiple specializations."
        },
        { id: 6, label: "Data",
            description: "The focal point for competitive differentiation is quickly becoming the ability to manage and analyze the vast datasets sitting in different organizational silos, and data is poised to be the largest growth area in technology over the next decade."
        },
    ];

    // const jobLevel = ['Entry Level', 'Mid Level', 'Senior Level'];

    const fieldOnetCodes = {
        // testing for queries based on field node click
        Enablement: ["11-3021.00", "15-1299.09", "13-1151.00"],
        Support: ["15-1232.00", "15-1231.00", "15-1231.00"],
        Infrastructure: ["15-1244.00", "15-1241.00", "15-1244.00"],
        Software: ["15-1212.00", "15-1251.00", "15-1254.00"],
        Cybersecurity: ["15-1211.00", "15-1212.00", "15-1241.00"],
        Data: ["15-2051.00", "15-2051.01", "15-1221.00"],
    }

    const fetchSoftwareDeveloperData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:3001/occupation/software-developer');
            console.log(response);
            // setOccupationData(response.data.OccupationList);
            const OccupationList = response.data.OccupationList;

            const jobNodeData = OccupationList.map((job, index) => ({
                id: index,
                title: job.OnetTitle,
                code: job.OnetCode,
                description: job.OccupationDescription,
            }));

            setOccupationData(OccupationList);
            setJobData(jobNodeData);
        } catch (err) {
            console.log('Error fetching occupation data:', err);
            setError(err.response?.data?.error || 'Failed to fetch occupation data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSoftwareDeveloperData();
    }, []);

    const handleExploreClick = () => {
        console.log('starting explore');
        setCurrentView('fields');
    }

    const handleFieldNodeClick = (field) => {
        console.log(`${field.label} clicked`);
        setChosenField(field.label);
        setCurrentLevel('Entry Level');
        setCurrentView('jobs');
        setActiveNode(field);

        const onetCodes = fieldOnetCodes[field.label];

        try {
            for(const code of onetCodes) {
                const response = axios.get(`http://localhost:3001/occupation/${code}`);
                console.log(`${code} response:`, response);
            }
        } catch (err) {
            console.log('Error:', err);
        }
    }

    // const handleJobNodeClick = () => {
    //     // need to handle api call
    //     const currentLevelIndex = jobLevel.indexOf(currentLevel);
    //     if (currentLevelIndex < jobLevel.length - 1) {
    //         setCurrentLevel(jobLevel[currentLevelIndex + 1]);
    //     }
    // }

    // const handleBackButtonClick = () => {
    //     if (currentView === 'jobs') {
    //         const currentLevelIndex = jobLevel.indexOf(currentLevel);
    //         if (currentLevelIndex > 0) {
    //             setCurrentLevel(jobLevel[currentLevelIndex - 1]);
    //         } else {
    //             setCurrentView('fields');
    //             setChosenField(null);
    //             setCurrentLevel(null);
    //             setChosenJob(null);
    //         }
    //     } else {
    //         setCurrentView('start');
    //     }
    // }

    // const handleResetButtonClick = () => {
    //     setCurrentView('start');
    // }

    // const handleNodeHover = (node) => {
    //     setHoveredNode(node);
    // }

    // const handleNodeExit = () => {
    //     setHoveredNode(null);
    // }

    return (
        <div className='career-map'>
            <div className="career-map-header">
                <h1><strong>CareerNode Explorer</strong></h1>
            </div>

            {/* {currentView !== 'start' && (
                <button className='back-button'
                    onClick={handleBackButtonClick}>
                </button>
            )} */}
            
            <div className={`interactive-map-container ${currentView}`}>
                {currentView === 'start' && (
                    <HexNode
                        label='Start Exploring'
                        isCenter={true}
                        onClick={handleExploreClick}
                    />
                )}

                {currentView === 'fields' && (
                    <div className='fields-container'>
                        {fieldNodes.map((field) => (
                        <HexNode
                            key={field.id}
                            label={field.label}
                            description={field.description}
                            isCenter={false}
                            onClick={() => handleFieldNodeClick(field)}
                        />
                        ))}
                    </div>
                )}

                {currentView === 'jobs' && chosenField && currentLevel && (
                    <>
                    <div className="center-node-container">
                            <HexNode
                                label={chosenField}
                                description={`${currentLevel} roles`}
                                isCenter={true}
                                // onMouseEnter={() => handleNodeHover({ label: chosenField, description: `${currentLevel} roles` })}
                                // onMouseLeave={handleNodeLeave}
                                // showDescription={hoveredNode && hoveredNode.label === chosenField}
                            />
                    </div>
                        {/* <div className="jobs-container">
                            {jobNodes[chosenField][currentLevel].map((job) => (
                                <HexNode
                                    key={job}
                                    label={job}
                                    isCenter={false}
                                    onClick={() => handleJobNodeClick()}
                                    // onMouseEnter={() => handleNodeHover({ label: job })}
                                    // onMouseLeave={handleNodeLeave}
                                    // showDescription={hoveredNode && hoveredNode.label === job}
                                />
                            ))}
                        </div> */}
                    </>
                )}
            </div>

            {/* {currentView === 'jobs' && (
                <div className='job-level-indicator'>
                    {jobLevel.map((level, index) => (
                        <div
                            key={level}
                            className={`job-level-dot ${currentLevel === level ? 'active' : ''}`}
                            label={level}
                        />
                    ))}
                </div>
            )} */}

            <div className='career-map-info-container'>
                {currentView === 'start' && (
                    <h1><strong>Click "Start Exploring" to explore paths!</strong></h1>
                )}

                {currentView === 'fields' && !activeNode && (
                    <h1><strong>Select a field</strong></h1>
                )}
                
                {currentView === 'jobs' && activeNode && (
                    <>
                    <h1><strong>{activeNode.label}</strong></h1>
                    
                    <div className='description'>
                        <p>{activeNode.description}</p>
                    </div>
                </>
                )}
            </div>

        </div>
    );
};

export default CareerMap;
