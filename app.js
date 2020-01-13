let correctAnswers = 0;
let wrongAnswers = 0;
let notAttempted = 0;
let totalQuestions = 10;
let questionNumber = 0;
let firstNumberList = [];
let secondNumberList = [];
let operatorList = [];
let questionAnswers = [];
let userAnswers = [];
let questionResult = [] //0:Not-answered -1:Incorrect 1:Correct
let firstNumber = 0;
let secondNumber = 0;
let operator = '+';
const indtroductionDiv = document.getElementById('introduction-box');
const resultDiv = document.getElementById('result');
const startButton = document.getElementById('start-button');
const timerDiv = document.getElementById('timer');
const timeSpan = document.getElementById('timer-content')
const restartButton = document.getElementById('restart-button');
const quizBoxDiv = document.getElementById('quiz-box');
const firstNumberSpan = document.getElementById('first-number');
const secondNumberSpan = document.getElementById('second-number');
const operatorSpan = document.getElementById('operator');
const answerInput = document.getElementById('answer-input');
const questionNumberDiv = document.getElementById('question-number');
const resultList = document.getElementById('result-list');

function hideElement(elem) {
    elem.classList.add("hide");
}
function showElement(elem) {
    elem.classList.remove("hide");
}
function updateResultDiv() {
    resultList.innerHTML = "";
    for(let q = 1; q <= totalQuestions; q++){
        if(questionResult[q] == 1)
            resultList.innerHTML += `<li class = 'correct-answer'>  ${firstNumberList[q]} ${operatorList[q]} ${secondNumberList[q]} = ${userAnswers[q]} </li>`;
        else if (questionResult[q] == 0)
            resultList.innerHTML += `<li class = 'unanswered'>  ${firstNumberList[q]} ${operatorList[q]} ${secondNumberList[q]} = _ </li>`;
        else 
            resultList.innerHTML += `<li class = 'incorrect-answer'>  ${firstNumberList[q]} ${operatorList[q]} ${secondNumberList[q]} = ${userAnswers[q]} </li>`;
    }
    document.getElementById('total-questions').innerHTML = totalQuestions;
    document.getElementById('total-correct').innerHTML = correctAnswers;
    document.getElementById('total-incorrect').innerHTML = wrongAnswers;

}
function endQuiz(){
    hideElement(quizBoxDiv)
    showElement(resultDiv);
    updateResultDiv();
}
function updateQuizDiv() {
    questionNumberDiv.innerHTML = questionNumber;
    firstNumberSpan.innerHTML = firstNumber;
    secondNumberSpan.innerHTML = secondNumber;
    operatorSpan.innerHTML = operator;
    answerInput.value = "";
    answerInput.focus();
}
function nextQuestion() {
    questionNumber++;
    if (questionNumber > totalQuestions) {
        endQuiz();
        return;
    }
    firstNumber = Math.floor(Math.random()*9 + 1);
    secondNumber = Math.floor(Math.random()*9 + 1);
    operator =  Math.floor(Math.random()*2);

    firstNumberList[questionNumber] = firstNumber;
    secondNumberList[questionNumber] = secondNumber;

    if(operator == 0){
        operator = '+';
        operatorList[questionNumber] = operator;
        questionAnswers[questionNumber] = firstNumber + secondNumber; //Operator is +
    }
    else if(operator == 1) {
        operator = '*';
        operatorList[questionNumber] = operator;
        questionAnswers[questionNumber] = firstNumber * secondNumber; //Operator is *
    }
    updateQuizDiv();
    console.log(`Question: ${firstNumber} ${operator} ${secondNumber} = ${questionAnswers[questionNumber]}`);
}
function startQuiz() {
    console.log("Quiz has started!");
    correctAnswers = 0;
    wrongAnswers = 0;
    notAttempted = 0;
    questionNumber = 0;
    nextQuestion();
    hideElement(indtroductionDiv);
    hideElement(resultDiv);
    showElement(quizBoxDiv);
    showElement(timerDiv);
    answerInput.focus();   
}
function checkAnswer() {
    userAnswers[questionNumber] = +answerInput.value;
    if(answerInput.value == 0) {
        //Not Attempted
        notAttempted++;
        questionResult[questionNumber] = 0;
        console.log("Not Attempted");
    }
    else if(userAnswers[questionNumber] == questionAnswers[questionNumber]){
        //Correct
        correctAnswers++;
        questionResult[questionNumber] = 1;
        console.log("Correct");
    }
    else {
        //Incorrect
        wrongAnswers++;
        questionResult[questionNumber] = -1;
        console.log("Incorrect")
    }
}
function main() {
    startButton.addEventListener('click', function() {
        startQuiz();
    })
    answerInput.addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            checkAnswer();
            nextQuestion();
        }
    });
    restartButton.addEventListener('click', function() {
        startQuiz();
    })
}
main();
