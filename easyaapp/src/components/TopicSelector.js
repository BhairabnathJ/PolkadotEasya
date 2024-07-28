import React from 'react';
import './css/topicSelector.css'; // Ensure the CSS file exists in this path

const TopicSelector = ({ onSelectTopic }) => {
    return (
        <div className="topic-selector">
            <h2>Select a Topic</h2>
            <button onClick={() => onSelectTopic('mathi')}>Math</button>
            <button onClick={() => onSelectTopic('motorsport')}>Motorsport</button>
            {/* Add more topics as needed */}
        </div>
    );
};

export default TopicSelector;