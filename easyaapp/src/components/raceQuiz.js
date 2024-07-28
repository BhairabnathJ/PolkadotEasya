import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/raceQuiz.css';

const RaceQuiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
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
        setSelectedAnswer(answer);
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === questions[currentQuestionIndex].correct) {
            setScore(score + 1);
        }

        setSelectedAnswer(null);
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
            <h2 className="question">{currentQuestion.question}</h2>
            <div className="answers">
                {currentQuestion.answers.map((answer, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswerSelect(answer)}
                        className={`answer-button ${selectedAnswer === answer ? 'selected' : ''}`}
                        disabled={selectedAnswer !== null}
                    >
                        {answer}
                    </button>
                ))}
            </div>
            {selectedAnswer && (
                <button onClick={handleSubmitAnswer} className="submit-button">
                    Submit Answer
                </button>
            )}
        </div>
    );
};

export default RaceQuiz;
