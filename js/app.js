//Initializing selectors for later use
const expression = document.getElementsByClassName('expression')[0];
const answerBoxes = document.querySelectorAll('li');
const answerList = document.querySelector('ul');
const currentProblem = document.getElementsByClassName('currentProblem')[0];
const startOverButton = document.getElementById('btnStartOver');
const score = document.getElementsByClassName('currentScore')[0];
const hideText = document.getElementsByClassName('show-hide')[0];

//Initializing counter variables for later use
let questionCount;
let scoreCount;

//Defining the questions to ask and the corresponding answer
//The position of the question array, example [0], will correspond with the answer array [0] through
//the limit variable in DOMContentLoaded
let questionArray = [
    {
        question: 'What is 4 x 3?',
        answer: 12
    },
    {
        question: 'What is 5 x 5?',
        answer: 25
    },
    {
        question: 'What is 6 x 3?',
        answer: 18
    },
    {
        question: 'What is 3 x 1?',
        answer: 3
    },
    {
        question: 'What is 15 x 3?',
        answer: 45
    },
    {
        question: 'What is 12 x 4?',
        answer: 48
    },
    {
        question: 'What is 7 x 8?',
        answer: 56
    },
    {
        question: 'What is 101 x 2?',
        answer: 202
    },
    {
        question: 'What is 1 x 4?',
        answer: 4
    },
    {
        question: 'What is 0 x 1?',
        answer: 0
    }
];

//Defining arrays of answers, one of which will always be correct
//The position of the answer array, example [0], will correspond with the question array [0] through
//the limit variable in DOMContentLoaded
let answerArray = [
    {
        answers: [12, 14, 16, 17]
    },
    {
        answers: [12, 25, 36, 27]
    },
    {
        answers: [12, 24, 18, 17]
    },
    {
        answers: [22, 24, 3, 1]
    },
    {
        answers: [7, 45, 55, 60]
    },
    {
        answers: [39, 44, 49, 48]
    },
    {
        answers: [56, 24, 55, 34]
    },
    {
        answers: [202, 204, 203, 205]
    },
    {
        answers: [0, 4, 3, 1]
    },
    {
        answers: [2, 0, 3, 1]
    }
];

/*
    For the following functions: index is used as a parameter to keep the questions and answers connected.
    regardless of using random functionality, index is set to a random number before it is ever passed as a parameter,
    therefore the random number is uniform throughout the functions calling on index.
 */
function randomQuestion(index) {
    return questionArray[index].question;
}

function randomAnswer(index) {
    return answerArray[index].answers.map(item => item);
}

function appendStuff(index) {
    //Setting the question in the UI to reflect the question array
    expression.textContent = randomQuestion(index);
    const answers = randomAnswer(index);
    for (let i = 0; i < answers.length; i++) {
        //Setting the answer boxes in the UI to reflect the answer array
        answerBoxes[i].textContent = answers[i];
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let limit;
    scoreCount = 0;
    questionCount = 1;

    //capturing the current display of the answer list, to redisplay when the app is reset with the reset button
    //couldn't get it to look right by just setting it to "block" or "inline", etc.
    const revertDisplay = answerList.style.display;

    function resetQuiz() {
        //reset the counts
        scoreCount = 0;
        questionCount = 1;
        //reset the limit/index to be passed as a parameter
        limit = selectQuestionIndex();

        //resetting score in the UI
        score.textContent = scoreCount;
        currentProblem.textContent = questionCount;

        //showing the hidden elements
        hideText.style.display = "block";
        expression.style.display = "block";
        answerList.style.display = revertDisplay;

        //load new questions and answers
        appendStuff(limit);
    }

    //This function generates an index to be passed as a parameter in several above functions
    function selectQuestionIndex() {
        return Math.floor(Math.random() * questionArray.length);
    }

    //Appends a new question and answers after setting a new random limit/index
    function loadNewQuestion() {
        limit = selectQuestionIndex();
        appendStuff(limit);
    }

    loadNewQuestion();

    //event listener on the answer buttons to wait for answer selected by user
    for (let i = 0; i < answerBoxes.length; i++) {
        answerBoxes[i].addEventListener('click', (e) => {

            //increments the questions and updates the UI, example: 2/10
            questionCount++;
            currentProblem.textContent = questionCount;

            //captures user selection
            let chosen = parseInt(e.target.textContent, 10);
            //selects correct answer to question from answer array
            let answer = questionArray[limit].answer;

            //compares the user answer to actual answer
            if (chosen === answer) {
                //if correct, score increments and UI reflects that
                scoreCount++;
                score.textContent = scoreCount;
            }

            checkForGameOver();
        })
    }

    function checkForGameOver() {
        //Checks to see if game is over based on the amount of questions that have appeared
        //Once the app hits the 11th question, the display resets to make it look like the game stopped on #10
        //and the question and answers sections are hidden
        if (questionCount === 11) {
            currentProblem.textContent = 10;
            expression.style.display = "none";
            answerList.style.display = "none";
            hideText.style.display = "none";
        } else {
            //otherwise, a new question is loaded and the game continues
            loadNewQuestion();
        }
    }

    //adding event handler to the reset button
    startOverButton.addEventListener('click', () => {
        resetQuiz();
    })
})