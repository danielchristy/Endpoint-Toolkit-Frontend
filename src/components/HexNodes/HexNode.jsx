import React from 'react';
import Hexagon from './Hexagon';
import './HexNode.css';

const HexNode = ({ 
    label, 
    description, 
    onClick, 
    isCenter = false, 
    // onMouseEnter, 
    // onMouseLeave,
    showDescription = false 
}) => {
    return (
        <div
            className={`hex-node ${isCenter ? 'center' : ''}`}
            onClick={onClick}
            // onMouseEnter={onMouseEnter}
            // onMouseLeave={onMouseLeave}
        >
            <Hexagon 
                label={label} 
                description={showDescription ? description : null}
            />
        </div>
    );
};

export default HexNode;