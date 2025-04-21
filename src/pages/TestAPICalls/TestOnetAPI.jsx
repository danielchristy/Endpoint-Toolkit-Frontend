import React, { useState } from 'react';
import axios from 'axios';

const TestOnetAPI = () => {
    const [occupationData, setOccupationData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchOccupationData = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:3001/occupation/${query}`);
            console.log('qiytf', response);
            setOccupationData(response.data.OccupationList);
        } catch (err) {
            console.error('Error fetching occupation data:', err);
            setError(err.response?.data?.error || 'Failed to fetch occupation data');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            console.log('Searching for:', searchQuery);
            fetchOccupationData(searchQuery);
        }
    };

    return (
        <div>
            <h2>Occupation Data</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter occupation code"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {loading && <p>Loading occupation data...</p>}
            {error && <p>Error: {error}</p>}
            {occupationData.length !== 0 ? (
                <div>
                    <h3>{occupationData[0].OnetTitle}</h3>
                    <p>{occupationData[0].OccupationDescription}</p>
                </div>
            ) : (
                !loading && <p>No data to display.</p>
            )}
        </div>
    );
};

export default TestOnetAPI;