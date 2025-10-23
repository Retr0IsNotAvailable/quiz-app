import { questions } from './data/questions.js';

// Get references to key DOM elements
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButtonElement = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

// Initializes or restarts the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButtonElement.innerHTML = 'Next';
  showQuestion();
}

// Displays the current question and its answer options
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

// Clears previous question's buttons and hides the Next button
function resetState() {
  nextButtonElement.style.display = 'none';
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

// Handles user answer selection and updates score
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

// Displays final score and restart option
function showScore() {
  resetState();
  questionElement.innerHTML = `Score: ${score} / ${questions.length}`;
  nextButtonElement.innerHTML = 'Play Again';
  nextButtonElement.style.display = 'block';
}

// Loads the next question or shows the final score
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Controls behavior of the Next / Play Again button
nextButtonElement.addEventListener('click', () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start quiz when page loads
startQuiz();