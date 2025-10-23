const questions = [
  {
    question: "What is the largest animal in the world?",
    answers: [
      { text: "shark", correct: false },
      { text: "blue whale", correct: true },
      { text: "elephant", correct: false },
      { text: "giraffe", correct: false }
    ]
  }, {
    question: "What is the smallest continent in the world?",
    answers: [
      { text: "asia", correct: false },
      { text: "australia", correct: true },
      { text: "africa", correct: false },
      { text: "artic", correct: false }
    ]
  }, {
    question: "What is the largest desert in the world?",
    answers: [
      { text: "kalahari", correct: false },
      { text: "gobi", correct: false },
      { text: "sahara", correct: false },
      { text: "antarctica", correct: true }
    ]
  }, {
    question: "What is the smallest country in the world?",
    answers: [
      { text: "vatican city", correct: true },
      { text: "bhutan", correct: false },
      { text: "nepal", correct: false },
      { text: "shri lanka", correct: false }
    ]
  }
];

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButtonElement = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

// reset quiz to initial values
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButtonElement.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNumber = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNumber + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('BUTTON');
    button.innerHTML = answer.text;
    button.classList.add('answer-button');
    answerButtonsElement.appendChild(button);    // display the button element inside the 'answer-buttons' div
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButtonElement.style.display = 'none';
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect = selectedButton.dataset.correct;

  if (isCorrect) {
    selectedButton.classList.add('correct');
    score++;
  } else {
    selectedButton.classList.add('incorrect');
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    if (button.dataset.correct) {
      button.classList.add('correct');
    }
    button.disabled = true;
  });
  nextButtonElement.style.display = 'block'; 
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Score: ${score} / ${questions.length}`;
  nextButtonElement.innerHTML = 'Play Again';
  nextButtonElement.style.display = 'block';
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButtonElement.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();