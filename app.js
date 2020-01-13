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
let startTime;
const indtroductionDiv = document.getElementById('introduction-box');
const resultDiv = document.getElementById('result');
const startButton = document.getElementById('start-button');
const timerDiv = document.getElementById('timer');
const timerSpan = document.getElementById('timer-content')
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
    document.getElementById('time-taken').innerHTML = (Math.floor(timeSinceStart/100))/10 + "s";

}
function endQuiz(){
    hideElement(quizBoxDiv)
    showElement(resultDiv);
    stopTimer();
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
    firstNumber = Math.floor(Math.random()*8 +2);
    secondNumber = Math.floor(Math.random()*8 + 2);
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
function updateTimerDiv() {
    timeSinceStart = Date.now() - startTime;
    timerSpan.innerHTML = Math.floor(timeSinceStart/100)/10;
}
function stopTimer() {
    clearInterval(timerIntervalID);
}
function startTimer(){
    startTime = Date.now();
    timerIntervalID = setInterval(updateTimerDiv, 100) 
}
function startQuiz() {
    console.log("Quiz has started!");
    questionNumber = 0;
    startTimer();
    nextQuestion();
    hideElement(indtroductionDiv);
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
}
main();
