import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/raceQuiz.css';

const RaceQuiz = ({ topic, onRestart }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/questions?topic=${topic}`);
                setQuestions(response.data);
                setCurrentQuestionIndex(0);
                setScore(0);
                setTimeLeft(30);
                setError(null);
            } catch (error) {
                setError('Error fetching questions. Please try again later.');
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, [topic]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleNextQuestion();
        }

        const timer = timeLeft > 0 && setInterval(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswerSelect = (answer) => {
        if (answer === questions[currentQuestionIndex].correct) {
            setScore(score + 1);
        }

        handleNextQuestion();
    };

    const handleNextQuestion = () => {
        setTimeLeft(30); // Reset timer

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // End of quiz
            setCurrentQuestionIndex(questions.length);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (questions.length === 0) {
        return <div>Loading...</div>;
    }

    if (currentQuestionIndex >= questions.length) {
        return (
            <div className="quiz-container">
                <div>Quiz Complete! Your score: {score}</div>
                <button onClick={onRestart} className="restart-button">Restart Quiz</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="header">
                <div className="timer">Time: {timeLeft}s</div>
                <div className="progress">Question {currentQuestionIndex + 1}/{questions.length}</div>
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
