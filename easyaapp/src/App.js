import React, { useState } from 'react';
import RaceQuiz from './components/raceQuiz';
import TopicSelector from './components/TopicSelector';
import PolkadotLogin from './components/polkadotLogin';
import './App.css';

function App() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [user, setUser] = useState(null);

  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };

  const handleRestart = () => {
    setSelectedTopic(null);
  };

  const handleLogin = (user) => {
    console.log("User logged in:", user); // Debug log
    setUser(user);
  };

  return (
    <div className="App">
      {!user ? (
        <PolkadotLogin onLogin={handleLogin} />
      ) : selectedTopic ? (
        <RaceQuiz topic={selectedTopic} onRestart={handleRestart} user={user} />
      ) : (
        <TopicSelector onSelectTopic={handleSelectTopic} />
      )}
    </div>
  );
}

export default App;
