import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/raceQuiz.css';

const RaceQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/questions'); // Update the port number here
                setQuestions(response.data);
            } catch (error) {
                setError('Error fetching questions. Please try again later.');
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerSelect = (answer) => {
        if (answer === questions[currentQuestionIndex].correct) {
            setScore(score + 1);
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1);
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (currentQuestionIndex >= questions.length) {
        return <div>Quiz Complete! Your score: {score}</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="header">
                <div className="progress">Question {currentQuestionIndex + 1}/{questions.length}</div>
                <div className="timer">Time: 00:30</div>
            </div>
            <div className="question-area">
                <h2 className="question">{currentQuestion.question}</h2>
            </div>
            <div className="answers">
                {currentQuestion.answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(answer)}
                        className="answer-button"
                    >
                        {answer}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RaceQuiz;
