const express = require('express');
const router = express.Router();

const questions = {
    motorsport: [
        {
            question: "What is the highest class of single-seater auto racing that is recognized globally?",
            options: ["Formula One (F1)", "IndyCar", "NASCAR", "Formula E"],
            answer: "Formula One (F1)"
        },
        {
            question: "In which year was the first official Formula One World Championship race held?",
            options: ["1948", "1950", "1952", "1960"],
            answer: "1950"
        },
        {
            question: "Who holds the record for the most Formula One World Championships?",
            options: ["Michael Schumacher", "Lewis Hamilton", "Ayrton Senna", "Sebastian Vettel"],
            answer: "Lewis Hamilton"
        },
        {
            question: "What is the name of the iconic 24-hour endurance race held annually in France?",
            options: ["24 Hours of Daytona", "24 Hours of Le Mans", "Sebring 12 Hours", "Nürburgring 24 Hours"],
            answer: "24 Hours of Le Mans"
        },
        {
            question: "In NASCAR, what is the name of the race considered to be the most prestigious and often referred to as the 'Super Bowl of Stock Car Racing'?",
            options: ["Daytona 500", "Indy 500", "Coca-Cola 600", "Southern 500"],
            answer: "Daytona 500"
        },
        {
            question: "Which motorsport event is known as the 'Great American Race'?",
            options: ["Daytona 500", "Indy 500", "Pikes Peak Hill Climb", "Bonneville Speed Week"],
            answer: "Daytona 500"
        },
        {
            question: "Who was the first driver to win the Indianapolis 500 four times?",
            options: ["A.J. Foyt", "Rick Mears", "Al Unser", "Mario Andretti"],
            answer: "A.J. Foyt"
        },
        {
            question: "What type of racing is known for its use of oval tracks and features open-wheel cars primarily in the United States?",
            options: ["IndyCar Racing", "NASCAR", "Formula E", "Rally Racing"],
            answer: "IndyCar Racing"
        },
        {
            question: "In the world of MotoGP, which rider is famously known as 'The Doctor'?",
            options: ["Valentino Rossi", "Marc Márquez", "Jorge Lorenzo", "Dani Pedrosa"],
            answer: "Valentino Rossi"
        },
        {
            question: "Which American racing driver, known for competing in the IndyCar Series, is the son of former Formula One and CART driver Derek Daly?",
            options: ["Conor Daly", "Graham Rahal", "Marco Andretti", "Ryan Hunter-Reay"],
            answer: "Conor Daly"
        }
    ]
};

router.get('/', (req, res) => {
    const { topic } = req.query;

    if (!topic || !questions[topic]) {
        return res.status(404).json({ error: 'Questions not found for the given topic' });
    }

    res.json(questions[topic]);
});

module.exports = router;
