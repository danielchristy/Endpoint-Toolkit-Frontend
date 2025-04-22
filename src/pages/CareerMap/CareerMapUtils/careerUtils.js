const ORG_ID = process.env.REACT_APP_COS_API_ID;
const API_KEY = process.env.REACT_APP_COS_API_KEY;
const BASE_URL = 'https://api.careeronestop.org/v1';

const jobKeywords = {
    Software: ['developer', 'engineer', 'programmer', 'software', 'web', 'application', 'frontend', 'backend', 'full stack', 'mobile', 'cloud', 'devops'],
    Infrastructure: ['system', 'network', 'cloud', 'infrastructure', 'administrator', 'architect', 'operations', 'devops', 'platform',],
    Cybersecurity: ['security', 'cyber', 'information security', 'cryptograph', 'penetration', 'analyst', 'forensic'],
    Data: ['data', 'analyst', 'scientist', 'analytics', 'database', 'machine learning', 'ai', 'artificial intelligence', 'business intelligence'],
    Support: ['support', 'help desk', 'technical support', 'service desk', 'it support', 'desktop support'],
    Enablement: ['project manager', 'product manager', 'scrum master', 'agile', 'delivery manager', 'it manager']
};

const jobExclusionKeywords = {
    Software: ['nurse', 'doctor', 'physician', 'healthcare', 'medical'],
    Infrastructure: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'education', 'health', 'business', 'clerks', 'general', 'facilities', 'plumbers', 'conveyor'],
    Cybersecurity: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'plumbers'],
    Data: ['nurse', 'doctor', 'physician', 'healthcare', 'medical'],
    Support: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'workers', 'tutor', 'legal', 'nursing', 'agricultural', 'personal care', 'roof', 'Secretaries', 'teaching', 'nannies'],
    Enablement: ['nurse', 'doctor', 'physician', 'healthcare', 'medical']
};

// filter jobs based on keywords to ignore irrelevant jobs (hopefully?)
export const filterJobs = (jobs, field) => {
    console.table('intial jobs:', jobs);
    const keywords = jobKeywords[field];
    const exclusionKeywords = jobExclusionKeywords[field];

    console.log('keywords:', keywords);
    if (!keywords) return jobs;

    return jobs.filter(job => {
        if (!job.OnetTitle || !job.OnetCode) return false;

        const onetTitle = job.OnetTitle.toLowerCase();
        const onetCode = job.OnetCode;
        const description = job.OccupationDescription?.toLowerCase() || '';

        console.log('job:', job);
        console.log('onetTitle:', onetTitle);
        console.log('onetCode:', onetCode);
        console.log('description:', description);

        const matchesInclusion = keywords.some(keyword =>
            onetTitle.includes(keyword.toLowerCase()) ||
            onetCode.includes(keyword.toLowerCase()) ||
            description.includes(keyword.toLowerCase())
        );

        const matchesExclusion = exclusionKeywords.some(keyword =>
            onetTitle.includes(keyword.toLowerCase()) ||
            description.includes(keyword.toLowerCase())
        );

        return matchesInclusion && !matchesExclusion;
    });
};

// first fetch to get all jobs
export const getJobs = async (keyword) => {
    try {
        const response = await fetch(
            `${BASE_URL}/occupation/${ORG_ID}/${keyword}/national/0/191`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );
        const data = await response.json();
        return data.OccupationList || [];
    } catch (error) {
        console.error('job fetch error:', error);
        throw error;
    }
};

// second fetch to get job details
export const getJobDetails = async (onetCode) => {
    console.log(`getJobDetails called with ONET code: ${onetCode}`);
    try {
        const response = await fetch(
            `http://localhost:3001/occupation/details/${onetCode}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`
                }
            }
        );
        const data = await response.json();
        console.log('job details:', data);

        return data.OccupationDetail || null;
    } catch (error) {
        console.error('job detail fetch error:', error);
        throw error;
    }
};

const careerUtils = {
    getJobs,
    getJobDetails,
    filterJobs
};
export default careerUtils;