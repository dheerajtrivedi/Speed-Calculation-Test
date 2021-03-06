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
let additionFirstNumberStack = [];
let additionSecondNumberStack = [];
let subtractionFirstNumberStack = [];
let subtractionSecondNumberStack = [];
let multiplicationFirstNumberStack = [];
let multiplicationSecondNumberStack = [];
const mainHeading = document.querySelector('header > h1');
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

function getRandomNumber(lower, upper) {
    return (Math.floor(Math.random() * (upper-lower) + lower));
}
function clearNumberStack() {
    squaresStack = [];
    additionFirstNumberStack = [];
    additionSecondNumberStack = [];
    subtractionFirstNumberStack = [];
    subtractionSecondNumberStack = [];
    multiplicationFirstNumberStack = [];
    multiplicationSecondNumberStack = [];
}
function shuffleArray(arr){
    let len = arr.length;
    let j = 0;
    while(j < len){
        let rand = getRandomNumber(0,len);
        //Swapping
        let temp = arr[j];
        arr[j] = arr[rand];
        arr[rand] = temp;
        j++;
    }
}
function getNumberStack(stack, lower, upper) {
    for(let i = lower; i <= upper; i++) stack.push(i);
    console.log(stack);
    let len = stack.length;
    shuffleArray(stack);
    let uniqueStack = [...stack];
    let temp = [];
    while(len < totalQuestions) {
        if(temp.length == 0) {
            temp = [...uniqueStack];
            shuffleArray(temp);
            console.log(temp);
        }
        stack.unshift(temp.pop());
        len++;
    }
    console.log(stack);
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
            resultList.innerHTML += `<li class = 'incorrect-answer'>  ${firstNumberList[q]} ${operatorList[q]} ${secondNumberList[q]} = <span class = "strike-content">${userAnswers[q]}</span> <span class = "correct-answer">   ${questionAnswers[q]} </span> </li>`;
    }
    document.getElementById('total-questions').innerHTML = totalQuestions;
    document.getElementById('total-correct').innerHTML = correctAnswers;
    document.getElementById('total-incorrect').innerHTML = wrongAnswers;
    document.getElementById('time-taken').innerHTML = (Math.floor(timeSinceStart/100))/10 + "s";
    document.getElementById('time-per-question').innerHTML = Math.floor(timeSinceStart/(10*(totalQuestions-notAttempted)))/100 + "s";
    document.getElementById('accuracy').innerHTML = (correctAnswers/totalQuestions * 100) + "%";
}

function gotoHome(){
    endQuiz();
    hideElement(resultDiv);
    hideElement(quizBoxDiv);
    showElement(indtroductionDiv);
}
function endQuiz(){
    hideElement(quizBoxDiv)
    showElement(resultDiv);
    if(questionNumber < totalQuestions) totalQuestions = questionNumber - 1;
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
        firstNumber = additionFirstNumberStack.pop();
        secondNumber = additionSecondNumberStack.pop();
        operatorList[questionNumber] = operator;
        questionAnswers[questionNumber] = firstNumber + secondNumber; 
    }
    else if(operator == '*') {
        firstNumber = multiplicationFirstNumberStack.pop();
        secondNumber = multiplicationSecondNumberStack.pop();
        console.log(multiplicationUpperLimit);
        questionAnswers[questionNumber] = firstNumber * secondNumber; //Operator is *
    }
    else if(operator == '-') {
        firstNumber = subtractionFirstNumberStack.pop();
        secondNumber = subtractionSecondNumberStack.pop();
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
function isChecked(div){
    return div.classList.contains('checked');
}
function showError(err) {
    document.getElementById('error-message').innerHTML += `<p> ${err} </p> <hr>`;
    showElement(document.getElementById('error-message-box'));
    setTimeout(() => {
        hideElement(document.getElementById('error-message-box'));
        document.getElementById('error-message-box').innerHTML = "";
        }, 1000*5);
}

function checkConstraints() {
    let allConstraintsPassed = true;
    if( !(isChecked(additionCheckBox)|| isChecked(subtractionCheckBox)
        || isChecked(multiplicationCheckBox) || isChecked(squaresCheckBox) ) ) {
            showError("Please select at least one question type.");          
            allConstraintsPassed = false;
        }
    if(isChecked(additionCheckBox)) {
        if(additionLowerLimit == 0 || additionUpperLimit == 0 || additionUpperLimit < additionLowerLimit) {
            showError('Please set  appropriate lowerLimit/UpperLimit for addition.');
            allConstraintsPassed = false;
        }
    }
    if(isChecked(subtractionCheckBox)) {
        if(subtractionLowerLimit == 0 || subtractionUpperLimit == 0 || subtractionUpperLimit < subtractionLowerLimit) {
            showError('Please set appropriate lowerLimit/UpperLimit for subtraction.');
            allConstraintsPassed = false;
        }
    }
    if(isChecked(multiplicationCheckBox)) {
        if(multiplicationLowerLimit == 0 || multiplicationUpperLimit == 0 || multiplicationUpperLimit < multiplicationLowerLimit) {
            showError('Please set appropriate lowerLimit/UpperLimit for multiplication.');
            allConstraintsPassed = false;
        }
    }
    if(isChecked(squaresCheckBox)) {
        if(squaresLowerLimit == 0 || squaresUpperLimit == 0 || squaresUpperLimit < squaresLowerLimit) {
            showError('Please set appropriate lowerLimit/UpperLimit for squares.');
            allConstraintsPassed = false;
        }
    }
    return allConstraintsPassed;
}
function initializeNumberStacks(){
    clearNumberStack();
    if (isChecked(subtractionCheckBox)){
        getNumberStack(subtractionFirstNumberStack, subtractionLowerLimit, subtractionUpperLimit);
        getNumberStack(subtractionSecondNumberStack, subtractionLowerLimit, subtractionUpperLimit);
    }
    if(isChecked(additionCheckBox)) {
        getNumberStack(additionFirstNumberStack, additionLowerLimit, additionUpperLimit);
        getNumberStack(additionSecondNumberStack, additionLowerLimit, additionUpperLimit);
    }
    if(isChecked(multiplicationCheckBox)) {
        getNumberStack(multiplicationFirstNumberStack, multiplicationLowerLimit, multiplicationUpperLimit);
        getNumberStack(multiplicationSecondNumberStack, multiplicationLowerLimit, multiplicationUpperLimit);
    }
    if(isChecked(squaresCheckBox)) {
        getNumberStack(squaresStack, squaresLowerLimit, squaresUpperLimit);
    }
}

function getLimits(){
    clearNumberStack();
    selectedOperator = [];
    totalQuestions = questionNumberInput.value;
    if (isChecked(subtractionCheckBox)){
        subtractionUpperLimit = +subtractionUpperLimitInput.value;
        subtractionLowerLimit = +subtractionLowerLimitInput.value;
        getNumberStack(subtractionFirstNumberStack, subtractionLowerLimit, subtractionUpperLimit);
        getNumberStack(subtractionSecondNumberStack, subtractionLowerLimit, subtractionUpperLimit);
        selectedOperator.push('-');
        console.log(`${subtractionLowerLimit}, ${subtractionUpperLimit}`);
    }
    if(isChecked(additionCheckBox)) {
        additionUpperLimit = +additionUpperLimitInput.value;
        additionLowerLimit = +additionLowerLimitInput.value;
        getNumberStack(additionFirstNumberStack, additionLowerLimit, additionUpperLimit);
        getNumberStack(additionSecondNumberStack, additionLowerLimit, additionUpperLimit);
        selectedOperator.push('+');
        console.log(`${additionLowerLimit}, ${additionUpperLimit}`);
    }
    if(isChecked(multiplicationCheckBox)) {
        multiplicationUpperLimit = +multiplicationUpperLimitInput.value;
        multiplicationLowerLimit = +multiplicationLowerLimitInput.value;
        getNumberStack(multiplicationFirstNumberStack, multiplicationLowerLimit, multiplicationUpperLimit);
        getNumberStack(multiplicationSecondNumberStack, multiplicationLowerLimit, multiplicationUpperLimit);
        selectedOperator.push('*');
        console.log(`${multiplicationLowerLimit}, ${multiplicationUpperLimit}`);
    }
    if(isChecked(squaresCheckBox)) {
        squaresUpperLimit = +squaresUpperLimitInput.value;
        squaresLowerLimit = +squaresLowerLimitInput.value;
        getNumberStack(squaresStack, squaresLowerLimit, squaresUpperLimit);
        selectedOperator.push('square');
        console.log(`${squaresLowerLimit}, ${squaresUpperLimit}`);
    }
}
function main() {
    startButton.addEventListener('click', function() {
        getLimits();
        if(checkConstraints()) startQuiz();
    })
    answerInput.addEventListener('keydown', function(event) {
        if(event.key === "Enter") {
            checkAnswer();
            nextQuestion();
        }
    });
    restartButton.addEventListener('click', function() {
        initializeNumberStacks();
        startQuiz();
    });
    document.querySelector(".restart").addEventListener('click', function() {
        initializeNumberStacks();
        startQuiz();
    });
    document.querySelector(".stop").addEventListener('click', function() {
        endQuiz();
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
    mainHeading.addEventListener('click', function () {
        gotoHome();
    })
}
main();
