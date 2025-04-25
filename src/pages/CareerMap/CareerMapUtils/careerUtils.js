import axios from 'axios';

const jobInclusionKeywords = {
    Software: ['developer', 'engineer', 'programmer', 'software', 'web', 'application', 'frontend', 'backend', 'full stack', 'mobile', 'cloud', 'devops'],
    Infrastructure: ['system', 'network', 'cloud', 'infrastructure', 'administrator', 'architect', 'operations', 'devops', 'platform',],
    Cybersecurity: ['security', 'cyber', 'information security', 'cryptograph', 'penetration', 'analyst', 'forensic'],
    Data: ['data', 'analyst', 'scientist', 'analytics', 'database', 'machine learning', 'ai', 'artificial intelligence', 'business intelligence'],
    Support: ['support', 'help desk', 'technical support', 'service desk', 'it support', 'desktop support'],
    Enablement: ['project manager', 'product manager', 'scrum master', 'agile', 'delivery manager', 'it manager']
};

const jobExclusionKeywords = {
    Software: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'photographer', 'materials',],
    Infrastructure: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'education', 'health', 'business', 'clerks', 'general', 'facilities', 'plumbers', 'conveyor'],
    Cybersecurity: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'plumbers'],
    Data: ['nurse', 'doctor', 'physician', 'healthcare', 'medical','food'],
    Support: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'workers', 'tutor', 'legal', 'nursing', 'agricultural', 'personal care', 'roof', 'Secretaries', 'teaching', 'nannies'],
    Enablement: ['nurse', 'doctor', 'physician', 'healthcare', 'medical']
};

export const getJobs = async (keyword) => {
    try {
        const response = await axios.get(`https://api.devwaypoint.xyz/occupation/${keyword}`);
        return response.data.OccupationList;
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return []; 
    }
};

export const getJobDetails = async (jobCode) => {
    try {
        const response = await axios.get(`https://api.devwaypoint.xyz/occupation/details/${jobCode}`);
        return response.data.OccupationDetail || [];
    }
    catch (error) {
        console.error("Error fetching job details:", error);
        return []; 
    } 
};

export const filterJobs = (jobData, field) => {
    const includedKeywords = jobInclusionKeywords[field];
    const excludedKeywords = jobExclusionKeywords[field] || [];

    if (!includedKeywords) return jobData;

    return jobData.filter((job) => {
        return !excludedKeywords.some((keyword) =>
            job.OnetTitle.toLowerCase().includes(keyword.toLowerCase())
        );
    });
};

const careerUtils = {
    getJobs,
    getJobDetails,
    filterJobs
};

export default careerUtils;