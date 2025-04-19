import React, { useState } from 'react';
import roles from '../data'; 

function RoleExplorer() {
    const [searchTerm, setSearchTerm] = useState('');
  
    
    const filteredRoles = roles.filter((role) =>
      role.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <h2>Explore Software Roles</h2>
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {filteredRoles.map((role) => (
            <div key={role.name}>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
              <ul>
                {role.certifications.map((cert) => (
                  <li key={cert}>{cert}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default RoleExplorer;
  
