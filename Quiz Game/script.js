const questions = [

    {
        question: "Which is the largest lake in the world?",
        answers: [
            {text:"Caspian Sea", correct: true},
            {text:"Baikal", correct: false},
            {text:"Lake Superior", correct: false},
            {text:"Ontario", correct: false},
        ],
        explanation: "The largest lake in the world is Lake Caspian, also known as the Caspian Sea. It covers a vast area of about 386,400 square kilometers (149,200 square miles)."
    },
    {
        question: "What is the capital of Japan?",
        answers: [
            {text:"Beijing", correct: false},
            {text:"Tokyo", correct: true},
            {text:"Seoul", correct: false},
            {text:"Bangkok", correct: false},
        ],
        explanation: "Tokyo, city and capital of Tokyo to (metropolis) and of Japan. It is located at the head of Tokyo Bay on the Pacific coast of central Honshu."
    },
    {
        question: "What is the name of the science that studies the past of life on Earth?",
        answers: [
            {text:"Palaeontology", correct: true},
            {text:"Astronomy", correct: false},
            {text:"Anthropology", correct: false},
            {text:"Geology", correct: false},
        ],
        explanation: "Paleontology also spelled palaeontology or palæontology, is the scientific study of life that existed prior to the start of the Holocene epoch (roughly 11,700 years before present)."
    },
    {
        question: "In what year did the first man land on the moon?",
        answers: [
            {text:"1961", correct: false},
            {text:"1970", correct: false},
            {text:"1969", correct: true},
            {text:"1983", correct: false},
        ],
        explanation: "Apollo 11 (July 16–24, 1969) was the American spaceflight that first landed humans on the Moon. Commander Neil Armstrong and Lunar Module Pilot Buzz Aldrin landed the Apollo Lunar Module Eagle on July 20, 1969, at 20:17 UTC"
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("ans-btn");
const nextButton = document.getElementById("nxt");
const explanationElement = document.getElementById("explanation");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    explanationElement.innerHTML = "";
    explanationElement.classList.remove('visible');
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button")
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener("click", selectAnswer);
    });        
    
} 

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
    explanationElement.style.display = "none";
    explanationElement.classList.remove('visible');
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    explanationElement.innerHTML = questions[currentQuestionIndex].explanation;
    explanationElement.style.display = "block";
    setTimeout(() => {
        explanationElement.classList.add('visible');
    }, 10);
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();


