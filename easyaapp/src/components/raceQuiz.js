import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './css/raceQuiz.css';

const RaceQuiz = ({ topic, onRestart, user }) => {
    console.log('User:', user); // Add this line to log the user object
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState(null);
    const [timeLeft, setTimeLeft] = useState(30);
    const [timePerQuestion, setTimePerQuestion] = useState([]);
    const [startTime, setStartTime] = useState(Date.now());
    const [nftValue, setNftValue] = useState(null);
    const [txHash, setTxHash] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get(`http://localhost:5001/api/questions?topic=${topic}`);
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
                setError('Error fetching questions. Please try again later.');
            }
        };

        fetchQuestions();
    }, [topic]);

    useEffect(() => {
        if (timeLeft === 0) {
            handleAnswer('');
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const handleAnswer = (answer) => {
        const endTime = Date.now();
        const timeTaken = (endTime - startTime) / 1000; // Time taken in seconds
        setTimePerQuestion([...timePerQuestion, timeTaken]);

        setSelectedAnswer(answer);
        if (answer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        setSelectedAnswer('');
        setTimeLeft(30); // Reset the timer
        setStartTime(Date.now()); // Reset start time

        if (currentQuestionIndex + 1 < questions.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            calculateNftValue();
            setShowResults(true);
        }
    };

    const calculateNftValue = async () => {
        const totalQuestions = questions.length;
        const averageTime = timePerQuestion.reduce((a, b) => a + b, 0) / totalQuestions;
        const accuracy = (score / totalQuestions) * 100;

        console.log('Calculating NFT value with:', { averageTime, accuracy, address: user.address });

        try {
            const response = await axios.post('http://localhost:5001/api/nft/calculate', {
                averageTime,
                accuracy,
                address: user.address, // Ensure this is the correct user address
            });
            setNftValue(response.data.nftValue);
            setTxHash(response.data.txHash);
        } catch (error) {
            console.error('Error calculating NFT value:', error);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (showResults) {
        const totalQuestions = questions.length;
        const averageTime = timePerQuestion.reduce((a, b) => a + b, 0) / totalQuestions;
        const accuracy = (score / totalQuestions) * 100;

        return (
            <div className="quiz-container">
                <h2>Quiz Results</h2>
                <p>
                    You scored {score} out of {totalQuestions}
                </p>
                <p>Average Time per Question: {averageTime.toFixed(2)} seconds</p>
                <p>Accuracy: {accuracy.toFixed(2)}%</p>
                <p>NFT Value: {nftValue}</p>
                <p>Transaction Hash: {txHash}</p>
                <button onClick={onRestart}>Restart Quiz</button>
            </div>
        );
    }

    if (questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <div className="timer">Time left: {timeLeft}s</div>
                <div className="question-counter">
                    Question {currentQuestionIndex + 1} of {questions.length}
                </div>
            </div>
            <div className="question-container">
                <p>{currentQuestion.question}</p>
                <div className="options-container">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`option-button ${selectedAnswer === option ? 'selected' : ''}`}
                            onClick={() => handleAnswer(option)}
                            disabled={selectedAnswer !== ''}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RaceQuiz;
