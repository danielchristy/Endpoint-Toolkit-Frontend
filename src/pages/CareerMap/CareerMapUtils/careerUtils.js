import axios from 'axios';

const jobKeywords = {
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
    Data: ['nurse', 'doctor', 'physician', 'healthcare', 'medical'],
    Support: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'workers', 'tutor', 'legal', 'nursing', 'agricultural', 'personal care', 'roof', 'Secretaries', 'teaching', 'nannies'],
    Enablement: ['nurse', 'doctor', 'physician', 'healthcare', 'medical']
};

export const getJobs = async (keyword) => {
    const response = await axios.get(`https://api.devwaypoint.xyz/occupation/${keyword}`);
    return response.data.OccupationList;
};

export const getJobDetails = async (jobCode) => {
    const response = await axios.get(`https://api.devwaypoint.xyz/occupation/details/${jobCode}`);
    return response.data.OccupationDetail || [];
    
};

export const filterJobs = (jobData, field) => {
    const keywords = jobKeywords[field];
    const excludedKeywords = jobExclusionKeywords[field] || [];

    if (!keywords) return jobData;

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