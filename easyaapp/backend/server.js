const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Example questions data categorized by topics
const questionsByTopic = {
    math: [
        { question: 'What is 2 + 2?', answers: ['3', '4', '5', '6'], correct: '4' },
        { question: 'What is 3 x 3?', answers: ['6', '7', '8', '9'], correct: '9' },
        { question: 'What is 10 / 2?', answers: ['2', '3', '5', '8'], correct: '5' },
        { question: 'What is the square root of 16?', answers: ['2', '4', '8', '16'], correct: '4' },
    ],
    motorsport: [
        {
            question: 'What is the highest class of single-seater auto racing that is recognized globally?',
            answers: ['NASCAR', 'Formula One (F1)', 'IndyCar', 'World Rally Championship'],
            correct: 'Formula One (F1)'
        },
        {
            question: 'In which year was the first official Formula One World Championship race held?',
            answers: ['1950', '1948', '1952', '1955'],
            correct: '1950'
        },
        {
            question: 'Who holds the record for the most Formula One World Championships?',
            answers: ['Michael Schumacher', 'Lewis Hamilton', 'Sebastian Vettel', 'Ayrton Senna'],
            correct: 'Lewis Hamilton'
        },
        {
            question: 'What is the name of the iconic 24-hour endurance race held annually in France?',
            answers: ['Daytona 500', '24 Hours of Le Mans', 'Monaco Grand Prix', 'Indy 500'],
            correct: '24 Hours of Le Mans'
        },
        {
            question: 'In NASCAR, what is the name of the race considered to be the most prestigious and often referred to as the "Super Bowl of Stock Car Racing"?',
            answers: ['Coca-Cola 600', 'Bristol Night Race', 'Daytona 500', 'Southern 500'],
            correct: 'Daytona 500'
        },
        {
            question: 'Which motorsport event is known as the "Great American Race"?',
            answers: ['The Indy 500', 'The Daytona 500', 'The Le Mans 24 Hours', 'The Monaco Grand Prix'],
            correct: 'The Daytona 500'
        },
        {
            question: 'Who was the first driver to win the Indianapolis 500 four times?',
            answers: ['Rick Mears', 'Al Unser', 'A.J. Foyt', 'Bobby Unser'],
            correct: 'A.J. Foyt'
        },
        {
            question: 'What type of racing is known for its use of oval tracks and features open-wheel cars primarily in the United States?',
            answers: ['Formula One', 'NASCAR', 'IndyCar Racing', 'World Rally Championship'],
            correct: 'IndyCar Racing'
        },
        {
            question: 'In the world of MotoGP, which rider is famously known as "The Doctor"?',
            answers: ['Marc Marquez', 'Jorge Lorenzo', 'Valentino Rossi', 'Casey Stoner'],
            correct: 'Valentino Rossi'
        },
        {
            question: 'Which American racing driver, known for competing in the IndyCar Series, is the son of former Formula One and CART driver Derek Daly?',
            answers: ['Josef Newgarden', 'Graham Rahal', 'Conor Daly', 'Ryan Hunter-Reay'],
            correct: 'Conor Daly'
        }
    ]
    // Add more topics and questions as needed
};

// API route to get quiz questions based on topic
app.get('/api/questions', (req, res) => {
    const topic = req.query.topic;
    if (questionsByTopic[topic]) {
        res.json(questionsByTopic[topic]);
    } else {
        res.status(404).json({ error: 'Topic not found' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
