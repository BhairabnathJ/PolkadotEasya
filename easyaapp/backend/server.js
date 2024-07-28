const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001; // Change the port number

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Example questions data
const questions = [
    { question: 'What is 2 + 2?', answers: ['3', '4', '5'], correct: '4' },
    { question: 'What is the capital of France?', answers: ['Berlin', 'Paris', 'Rome'], correct: 'Paris' },
    // Add more questions as needed
];

// API route to get quiz questions
app.get('/api/questions', (req, res) => {
    res.json(questions);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
