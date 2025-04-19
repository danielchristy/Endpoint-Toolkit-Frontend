import React from 'react';
import '../../styles/variables.css';

const Hexagon = ({ label, description, onClick, isCenter }) => {
    const lines = label.split(' ');

    return (
        <svg
            onClick={onClick}
            // className={`hexagon ${isCenter ? 'center' : ''}`}
            viewBox="0 0 100 100"
            // width="100%"
            // height="100%"
        >
            <path
                d="
                M50 7
                Q52 7 54 8 
                L92 27 
                Q95 29 95 32 
                L95 68 
                Q95 71 92 73 
                L54 92 
                Q52 93 50 93 
                Q48 93 46 92 
                L8 73 
                Q5 71 5 68 
                L5 32 
                Q5 29 8 27 
                L46 8 
                Q48 7 50 7 Z
                "
                className="hexagon-svg"
            />
            <g className="hexagon-content">
                {lines.map((line, index) => {
                    const lineHeight = 14;
                    const totalHeight = (lines.length - 1) * lineHeight;
                    const y = description ? 40 - totalHeight / 2 + index * lineHeight : 50 - totalHeight / 2 + index * lineHeight;

                    return (
                        <text
                            key={index}
                            x="50"
                            y={y}
                            dominantBaseline="middle"
                            textAnchor="middle"
                            className="hexagon-text"
                            fontFamily='var(--wwg-font)'
                            fill="var(--plain-white)"
                            fontWeight="bold"
                            fontSize=".75em"
                        >
                            {line}
                        </text>
                    );
                })}
                {description && (
                    <text
                        x="50"
                        y="80"
                        dominantBaseline="middle"
                        textAnchor="middle"
                        className="hexagon-description"
                        fontFamily='var(--wwg-font)'
                        fill="var(--plain-white)"
                        fontSize=".75em"
                    >
                        {description}
                    </text>
                )}
            </g>
        </svg>
    );
};

export default Hexagon;