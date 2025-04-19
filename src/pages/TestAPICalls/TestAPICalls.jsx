import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CareersPage = () => {
    const [careers, setCareers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCareers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/careers');
                setCareers(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCareers();
    }, []);

    if (loading) return <p>Loading careers...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Career List</h2>
            <ul>
                {careers.map((career, index) => (
                    <li key={index}>{career.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default CareersPage;
