import React, { useState } from 'react';
import { filterJobs, getJobs, getJobDetails } from './CareerMapUtils/careerUtils';
import HexNode from '../../components/HexNodes/HexNode';
import './CareerMap.css';

const CareerMap = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobData, setJobData] = useState([]);
    const [jobDetails, setJobDetails] = useState(null);
    const [currentView, setCurrentView] = useState('start');
    const [activeNode, setActiveNode] = useState(null);
    const [annualNationalWages, setAnnualNationalWages] = useState(0);
    const [annualStateWages, setAnnualStateWages] = useState(0);


    console.log('last active node:', activeNode);

    const fieldNodes = [
        // https://www.comptia.org/blog/a-taxonomy-for-technology-jobs
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

    const handleExploreClick = () => {
        console.log('starting explore');
        setCurrentView('fields');
    }

    const handleFieldNodeClick = async (field) => {
        console.log(`${field.label} clicked`);
        setLoading(true);
        setError(null);

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
            setActiveNode(field);
            setCurrentView('jobs');
        } catch (err) {
            console.log('Error:', err);
            setError(err.response?.data?.error || 'Failed to fetch occupation data');
        } finally {
            setLoading(false);
        }
    }

    const handleJobNodeClick = async (job) => {
        console.log(`${job.title} clicked`);
        setLoading(true);
        setError(null);

        try {
            const detailsArray = await getJobDetails(job.code);
            console.log('Feteched job details:', detailsArray);

            const details = detailsArray[0] || null;

            if (!details) {
                console.log('No details found for this job');
                setError('No details found for this job');
                return;
            }
            sortingWages(details);
            setJobDetails(details);
            console.log('jobDetails:', jobDetails);
            console.log('jobDetails:', details.Wages.NationalWagesList[annualNationalWages]?.Median);
            setActiveNode(job);
            setCurrentView('job-details');
        }
        catch (err) {
            console.log('Error fetching job details:', err);
            setError(err.response?.data?.error || 'Failed to fetch job details');
        } finally {
            setLoading(false);
        }
    };

    const sortingWages = (jobDetails) => {
        const a = jobDetails.Wages.NationalWagesList[0];
        const b = jobDetails.Wages.StateWagesList[0];
        if (a.RateType === 'Annual') {
            setAnnualNationalWages(0);
        } else {
            setAnnualNationalWages(1);
        };

        if (b.RateType === 'Annual') {
            setAnnualStateWages(0);
        }
        else {
            setAnnualStateWages(1);
        };
        return;
    };

    const handleBackButtonClick = () => {
        if (currentView === 'fields') {
            setCurrentView('start');
        } else if (currentView === 'jobs') {
            setCurrentView('fields');
            setJobData([]);
        } else if (currentView === 'job-details') {
            setCurrentView('jobs');
            setJobDetails([]);
        }
        setActiveNode(null);
    }

    // const nationalWages = Number(jobDetails.Wages.NationalWagesList[0]);

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

            {error && (
                <div className='error-message'>
                    {error}
                </div>
            )}

            {loading && (
                <div className='loading-message'>
                    Loading...
                </div>
            )}

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

                {currentView === 'jobs' && (
                    <div className='jobs-container'>
                        {jobData.map((job) => (
                            <HexNode
                                key={job.id}
                                label={job.title}
                                description={job.description}
                                isCenter={false}
                                onClick={() => handleJobNodeClick(job)}
                            />
                        ))}
                    </div>
                )}

                {currentView !== 'start' && (
                    <button className='back-button'
                        onClick={handleBackButtonClick}>
                        Back
                    </button>
                )}

            </div>


            <div className='career-map-info-container'>
                {currentView === 'start' && (
                    <h1><strong>Click "Start Exploring" to explore paths!</strong></h1>
                )}

                {currentView === 'fields' && activeNode && (
                    <>
                        <h1><strong>{activeNode.label}</strong></h1>
                    </>
                )}

                {currentView === 'jobs' && activeNode && (
                    <>
                        <p>*Click on a job to see more details*</p>
                        <h1><strong>{activeNode.label}</strong></h1>
                        <p>{activeNode.description}</p>
                    </>
                )}

                {currentView === 'job-details' && activeNode && jobDetails && (
                    <>
                        <h1><strong>{activeNode.title}</strong></h1>
                        <p><i>ONET Code: {activeNode.code}</i></p>

                        <div className='job-description'>
                            <h2>Job Description</h2>
                            <p>{jobDetails.OnetDescription || 'No Description available.'}</p>
                        </div>

                        <div className='wages'>
                            <h2>Annual Wage Estimates</h2>
                            <p>Median Annual Wage: {jobDetails.Wages.NationalWagesList[annualNationalWages]?.Median} </p>
                            <p>Entry Level Average: {jobDetails.Wages.NationalWagesList[annualNationalWages]?.Pct10}</p>
                            <p>High Tier Role Average: {jobDetails.Wages.NationalWagesList[annualNationalWages]?.Pct90}</p>

                            <h2>State Wage Estimates</h2>
                            <p>Median Annual Wage: {jobDetails.Wages.StateWagesList[annualStateWages]?.Median}</p>
                            <p>Entry Level Average: {jobDetails.Wages.StateWagesList[annualStateWages]?.Pct10}</p>
                            <p>High Tier Role Average: {jobDetails.Wages.StateWagesList[annualStateWages]?.Pct90}</p>
                        </div>

                        <div className='job-outlook'>
                            <h2>Job Outlook</h2>
                            <p>Bright Outlook: {jobDetails.BrightOutlook}</p>
                            <p>Projected Growth Rate: {jobDetails.BrightOutlookCategory}</p>
                        </div>

                        {/* {jobDetails.EmploymentProjections && jobDetails.EmploymentProjections.length > 0 && (
                            <div className='employment-projections'>
                                <h2>Employment Projections</h2>
                                <p>Projected Growth Rate: {jobDetails.EmploymentProjections[0].ProjectedGrowthRate}</p>
                                <p>Projected Job Openings: {jobDetails.EmploymentProjections[0].ProjectedJobOpenings}</p>
                            </div>
                        )} */}

                        {jobDetails.RelatedOnetTitles && jobDetails.RelatedOnetTitles.length > 0 && (
                            <div className='related-jobs'>
                                <h2>Related Jobs</h2>
                                <ul>
                                    {jobDetails.RelatedOnetTitles.map((relatedJob, index) => (
                                        <li key={index}>{relatedJob.OnetTitle}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CareerMap;
