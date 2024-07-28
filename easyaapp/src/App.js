import React, { useState } from 'react';
import RaceQuiz from './components/raceQuiz';
import TopicSelector from './components/mainQuiz';
import './App.css';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleRestart = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="App">
      {selectedTopic ? (
        <RaceQuiz topic={selectedTopic} onRestart={handleRestart} />
      ) : (
        <TopicSelector onSelectTopic={handleSelectTopic} />
      )}
    </div>
  );
}

export default App;
