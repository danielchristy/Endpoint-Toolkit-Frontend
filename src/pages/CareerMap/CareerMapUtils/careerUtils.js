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
    Data: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'food', 'chemist', 'bio', 'statistician', 'agricultural', 'agriculture', 'biologist', 'biochemist', 'atmospheric', 'environmental', 'geoscientist', 'geologist', 'hydrologist', 'materials', 'scientist', 'social', 'geographer', 'geospatial', 'cartographer', 'urban', 'regional', 'planner', 'surveyor', 'astronomers', "mathematicians", 'psychologists', 'physicists', 'geneticists', 'epidemiologists', 'statistical', 'survey', 'chemical', 'Sociologists',
        'operations Research Analysts', 'Aerospace Engineering and Operations Technologists and Technicians', 'Nanotechnology Engineering Technologists and Technicians', 'Geographic Information Systems Technologists and Technicians', 'Mathematical Science Occupations, All Other', 'Accountants and Auditors', 'Proofreaders and Copy Markers', 'Cytogenetic Technologists', 'Mechanical Engineering Technologists and Technicians', 'Architectural and Engineering Managers',
        'Veterinarians', 'Industrial Ecologists', 'Interviewers, Except Eligibility and Loan', 'Range Managers', 'Fraud Examiners, Investigators and Analysts', 'Electrical and Electronics Repairers, Commercial and Industrial Equipment', 'Wind Energy Engineers', 'Foresters', 'Market Research Analysts and Marketing Specialists', 'Energy Auditors', 'Computer, Automated Teller, and Office Machine Repairers', 'Therapists, All Other', 'Word Processors and Typists', 'Bill and Account Collectors', 'Exercise Physiologists', 'Curators', 'Intelligence Analysts', 'Police Identification and Records Officers', 'Historians', 'Aerospace Engineers', 'Financial Quantitative Analysts', 'Forensic Science Technicians', 'Title Examiners, Abstractors, and Searchers', 'Weighers, Measurers, Checkers, and Samplers, Recordkeeping', 'First-Line Supervisors of Office and Administrative Support Workers', 'Quality Control Analysts', 'Librarians and Media Collections Specialists', 'Hydrologic Technicians', 'Water and Wastewater Treatment Plant and System Operators', 'Fish and Game Wardens', 'Bookkeeping, Accounting, and Auditing Clerks', 'Financial and Investment Analysts', 'News Analysts, Reporters, and Journalists', 'Telecommunications Engineering Specialists', 'Industrial Engineering Technologists and Technicians', 'Payroll and Timekeeping Clerks', 'Occupational Health and Safety Technicians', 'Credit Analysts', 'Economists', 'Non-Destructive Testing Specialists', 'Clinical Research Coordinators', 'Office Clerks, General', 'Billing and Posting Clerks', 'Actuaries', 'sales', 'Production, Planning, and Expediting Clerks', 'Water/Wastewater Engineers', 'Nuclear Power Reactor Operators', 'Human Resources Assistants, Except Payroll and Timekeeping', 'Search Marketing Strategists', 'Human Factors Engineers and Ergonomists', 'Credit Authorizers, Checkers, and Clerks', 'Court, Municipal, and License Clerks', 'Magnetic Resonance Imaging Technologists', 'Office and Administrative Support Workers, All Other', 'Health Education Specialists', 'Forest and Conservation Technicians', 'Community Health Workers', 'Health Informatics Specialists', 'Climate Change Policy Analysts'],
    Support: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'workers', 'tutor', 'legal', 'nursing', 'agricultural', 'personal care', 'roof', 'Secretaries', 'teaching', 'nannies'],
    Enablement: ['nurse', 'doctor', 'physician', 'healthcare', 'medical', 'Wind Energy Development Managers', 'Compliance Managers',
        'Construction Managers', 'Managers, All Other', 'Landscape Architects', 'Management Analysts', 'Facilities Managers', 'Purchasing Managers', 'Regulatory Affairs Managers', 'Public Relations Managers', 'Administrative Services Managers', 'Marketing Managers', 'Security Managers', 'Spa Managers', 'Lodging Managers', 'Fundraising Managers', 'Financial Managers', 'Sales Managers', 'Range Managers', 'Gambling Managers', 'Industrial Production Managers', 'Natural Sciences Managers', 'Training and Development Managers', 'Solar Energy Installation Managers', 'Biomass Power Plant Managers', 'Architectural and Engineering Managers', 'Biofuels Production Managers', 'Hydroelectric Production Managers', 'Funeral Home Managers', 'Loss Prevention Managers', 'Investment Fund Managers', 'Security Management Specialists', 'Geothermal Production Managers', 'Emergency Management Directors', 'Media Technical Directors/Managers', 'Compensation and Benefits Managers', 'Advertising and Promotions Managers', 'Property, Real Estate, and Community Association Managers', 'Environmental Engineers', 'General and Operations Managers', 'Entertainment and Recreation Managers, Except Gambling', 'Personal Service Managers, All Other', 'Human Resources Managers', 'Wind Energy Operations Managers', 'Sustainability Specialists', 'Transportation, Storage, and Distribution Managers', 'Brownfield Redevelopment Specialists and Site Managers', 'Farmers, Ranchers, and Other Agricultural Managers', 'Farm and Home Management Educators', 'Biofuels/Biodiesel Technology and Product Development Managers', 'Social and Community Service Managers', 'Clinical Research Coordinators', 'Civil Engineers', 'Online Merchants', 'Archivists', 'Environmental Restoration Planners', 'Set and Exhibit Designers', 'Cost Estimators', 'Executive Secretaries and Executive Administrative Assistants', 'Business Continuity Planners', 'Energy Auditors', 'Treasurers and Controllers', 'Water Resource Specialists', 'Food Service Managers', "Transportation Engineers",
        "Motion Picture Projectionists", "Geoscientists, Except Hydrologists and Geographers", "Hydrologists", "Solar Energy Systems Engineers", "Riggers", "Political Scientists", "Transportation Planners", "Rail Yard Engineers, Dinkey Operators, and Hostlers", "Economists", "Anthropologists and Archeologists", "Architects, Except Landscape and Naval", "Chemical Engineers", "Materials Engineers", "Marine Engineers and Naval Architects", "Manufacturing Engineers", "Agricultural Engineers", "Wind Energy Engineers", "Surveyors", "Energy Engineers, Except Wind and Solar", "Accountants and Auditors", "Architectural and Civil Drafters", "First-Line Supervisors of Food Preparation and Serving Workers", "First-Line Supervisors of Office and Administrative Support Workers", "Aerospace Engineers", "First-Line Supervisors of Retail Sales Workers", "Meeting, Convention, and Event Planners", "Mechanical Drafters", "Broadcast Technicians", "Histotechnologists", "Recycling Coordinators", "First-Line Supervisors of Entertainment and Recreation Workers, Except Gambling Services", "First-Line Supervisors of Farming, Fishing, and Forestry Workers", "Personal Financial Advisors", "Radio Frequency Identification Device Specialists", "Nannies", "Art Directors", "First-Line Supervisors of Gambling Services Workers", "Business Teachers, Postsecondary", "Merchandise Displayers and Window Trimmers", "First-Line Supervisors of Mechanics, Installers, and Repairers", "Postmasters and Mail Superintendents", "Mental Health and Substance Abuse Social Workers", "Agricultural Sciences Teachers, Postsecondary", "Foresters", "Forestry and Conservation Science Teachers, Postsecondary", 'post', 'water', 'business', 'fitness', 'wellness', 'nuclear', 'industrial', 'government', 'forest,', 'curators', 'legal', 'mining', 'automotive', 'petroleum', 'rehabilitation', 'railroad', 'credit', 'anestesiologists', 'chief executives', 'social', 'traffic', 'underwriters', 'installers', 'janitors', 'counselors', 'first-line', 'cook', 'health', 'coach', 'boiler', 'cooling', 'sales', 'landscaping', 'geological', 'tutors', 'weighers', 'dispatchers', 'stockers', 'park', 'ergonomists',],
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