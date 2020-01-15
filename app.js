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
let additionLowerLimit = -1;
let additionUpperLimit = -1;
let subtractionLowerLimit = -1;
let subtractionUpperLimit = -1;
let multiplicationLowerLimit = -1;
let multiplicationUpperLimit = -1;
let squaresLowerLimit = -1;
let squaresUpperLimit = -1;
let squaresStack = [];
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
const qustionCheckBox = document.getElementById('question-checkbox');
const additionCheckBox = document.getElementById('addition-checkbox');
const subtractionCheckBox = document.getElementById('subtraction-checkbox');
const multiplicationCheckBox = document.getElementById('multiplication-checkbox');
const squaresCheckBox = document.getElementById('squares-checkbox');
const questionNumberInput = document.getElementById('question-number-input')
const additionUpperLimitInput = document.getElementById('addition-upperlimit');
const additionLowerLimitInput = document.getElementById('addition-lowerlimit');
const subtractionUpperLimitInput = document.getElementById('subtraction-upperlimit');
const subtractionLowerLimitInput = document.getElementById('subtraction-lowerlimit');
const multiplicationUpperLimitInput = document.getElementById('multiplication-upperlimit');
const multiplicationLowerLimitInput = document.getElementById('multiplication-lowerlimit');
const squaresUpperLimitInput = document.getElementById('squares-upperlimit');
const squaresLowerLimitInput = document.getElementById('squares-lowerlimit');
let selectedOperator = [];

function clearNumberStack() {
    squaresStack = [];
}
function hideElement(elem) {
    elem.classList.add("hide");
}
function showElement(elem) {
    elem.classList.remove("hide");
}
function updateResultDiv() {
    resultList.innerHTML = '';
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
    document.getElementById('time-per-question').innerHTML = Math.floor(timeSinceStart/(10*(totalQuestions-notAttempted)))/100 + "s";
    document.getElementById('accuracy').innerHTML = (correctAnswers/totalQuestions * 100) + "%";
}

function endQuiz(){
    hideElement(quizBoxDiv)
    showElement(resultDiv);
    stopTimer();
    updateResultDiv();
}
getNumberStack(stack, lower, upper) {
    for(let i = lower; i <= upper; i++) stack.push(i);
    //Randomize Stack
    len = stack.length();
    let j = 0;
    while(j < len) {
        rand = Math.floor(Math.random()*len);
        //Swapping
        let temp = stack[j];
        stack[j] = stack[rand];
        stack[rand] = temp;
        j++;
    }

    while(len < questionNumber) {
        stack.unshift(Math.floor(Math.random()*(upper-lower) + lower));
        len++;
    }
    console.log(stack);
}
function updateQuizDiv() {
    questionNumberDiv.innerHTML = questionNumber;
    firstNumberSpan.innerHTML = firstNumber;
    secondNumberSpan.innerHTML = secondNumber;
    operatorSpan.innerHTML = operator;
    answerInput.value = "";
    answerInput.focus();
}
function selectOperator() {
    let rand = Math.floor(Math.random()*(selectedOperator.length));
    return selectedOperator[rand];
}
function nextQuestion() {
    questionNumber++;
    if (questionNumber > totalQuestions) {
        endQuiz();
        return;
    }

    operator =  selectOperator();
    console.log(operator)
    if(operator == '+'){
        firstNumber = Math.floor(Math.random()*(additionUpperLimit - additionLowerLimit + 1) + additionLowerLimit);
        secondNumber = Math.floor(Math.random()*(additionUpperLimit - additionLowerLimit + 1) + additionLowerLimit);
        operatorList[questionNumber] = operator;
        questionAnswers[questionNumber] = firstNumber + secondNumber; 
    }
    else if(operator == '*') {
        firstNumber = Math.floor(Math.random()*(multiplicationUpperLimit - multiplicationLowerLimit + 1) + multiplicationLowerLimit);
        secondNumber = Math.floor(Math.random()*(multiplicationUpperLimit - multiplicationLowerLimit + 1)  + multiplicationLowerLimit);
        console.log(multiplicationUpperLimit);
        questionAnswers[questionNumber] = firstNumber * secondNumber; //Operator is *
    }
    else if(operator == '-') {
        firstNumber = Math.floor(Math.random()*(subtractionUpperLimit - subtractionLowerLimit + 1) + subtractionLowerLimit);
        secondNumber = Math.floor(Math.random()*(subtractionUpperLimit - subtractionLowerLimit + 1) + subtractionLowerLimit);
        if (firstNumber < secondNumber) {
            let temp = secondNumber;
            secondNumber = firstNumber;
            firstNumber = temp;
        }
        questionAnswers[questionNumber] = firstNumber - secondNumber;
    }
    else if (operator == 'square') {
        firstNumber = squaresStack.pop();
        operator = '^';
        secondNumber = 2;
        questionAnswers[questionNumber] = firstNumber * firstNumber;
    }
    firstNumberList[questionNumber] = firstNumber;
    secondNumberList[questionNumber] = secondNumber;
    operatorList[questionNumber] = operator;

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
    clearNumberStack();
    selectedOperator = [];
    totalQuestions = questionNumberInput.value;
    if (subtractionCheckBox.classList.contains('checked')){
        subtractionUpperLimit = +subtractionUpperLimitInput.value;
        subtractionLowerLimit = +subtractionLowerLimitInput.value;
        selectedOperator.push('-');
        console.log(`${subtractionLowerLimit}, ${subtractionUpperLimit}`);
    }
    if(additionCheckBox.classList.contains('checked')) {
        additionUpperLimit = +additionUpperLimitInput.value;
        additionLowerLimit = +additionLowerLimitInput.value;
        selectedOperator.push('+');
        console.log(`${additionLowerLimit}, ${additionUpperLimit}`);
    }
    if(multiplicationCheckBox.classList.contains('checked')) {
        multiplicationUpperLimit = +multiplicationUpperLimitInput.value;
        multiplicationLowerLimit = +multiplicationLowerLimitInput.value;
        selectedOperator.push('*');
        console.log(`${multiplicationLowerLimit}, ${multiplicationUpperLimit}`);
    }
    if(squaresCheckBox.classList.contains('checked')) {
        squaresUpperLimit = +squaresUpperLimitInput.value;
        squaresLowerLimit = +squaresLowerLimitInput.value;
        selectedOperator.push('square');
        getNumberStack(squaresStack, squaresLowerLimit, squaresUpperLimit);
        console.log(`${squaresLowerLimit}, ${squaresUpperLimit}`);
    }
    questionNumber = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    notAttempted = 0;
    startTimer();
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
function toggleCheckBox(div) {
    div.classList.toggle("checked")
}
function checkConstraints() {
    if(additionCheckBox.classList.contains('checked') || subtractionCheckBox.classList.contains('checked')
        || multiplicationCheckBox.classList.contains('checked') || squaresCheckBox.classList.contains('checked')) {
            return true;
        }
    else {
        document.getElementById('error-message').innerHTML = 'Please select at least one option.';
        showElement(document.getElementById('error-message-box'));
        setTimeout(() => hideElement(document.getElementById('error-message-box')), 1000*5)
    }
}
function main() {
    startButton.addEventListener('click', function() {
        if(checkConstraints()) startQuiz();
    })
    answerInput.addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            checkAnswer();
            nextQuestion();
        }
    });
    restartButton.addEventListener('click', function() {
        startQuiz();
    });
    additionCheckBox.addEventListener('click', function(){
        toggleCheckBox(additionCheckBox);
    });
    subtractionCheckBox.addEventListener('click', function(){
        toggleCheckBox(subtractionCheckBox); 
    });
    multiplicationCheckBox.addEventListener('click', function(){
        toggleCheckBox(multiplicationCheckBox);
    });
    squaresCheckBox.addEventListener('click', function(){
        toggleCheckBox(squaresCheckBox);
    });
}
main();
