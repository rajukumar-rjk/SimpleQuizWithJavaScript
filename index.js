function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

// Checking correct answer for the question
Question.prototype.isCorrectAnswer = function (answer) {
  return this.answer === answer ? true : false;
};

function Quiz(questions) {
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

// Getting the current question
Quiz.prototype.getCurrentQuestion = function () {
  return this.questions[this.questionIndex];
};

// Checking correct answer for the current question
// If answer is correct then increase the score and moved to the nex question
Quiz.prototype.checkOptionWithAnswer = function (choice) {
  if (this.getCurrentQuestion().isCorrectAnswer(choice)) {
    this.score++;
  }

  this.questionIndex++;
};

// Finishing the quiz
Quiz.prototype.done = function () {
  return this.questionIndex >= this.questions.length;
};

//////////////////// GUI ///////////////////////
function loadQuestion() {
  if (quiz.done()) {
    showScore();
    return;
  }
  const currentQuestion = quiz.getCurrentQuestion();
  // get the DOM node for question
  const questionEl = document.getElementById("question");
  questionEl.textContent = currentQuestion.text;

  // getting choices for the question in the GUI
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    const currentChoice = currentQuestion.choices[i];
    document.getElementById("choice" + i).textContent = currentChoice;

    handleSelect("btn" + i, currentChoice);
  }

  showProgress();
}
function handleSelect(id, choice) {
  console.log(id, choice);

  document.getElementById(id).onclick = function () {
    quiz.checkOptionWithAnswer(choice);
    loadQuestion();
  };
}
function showScore() {
  document.getElementById("quiz").innerHTML = `<h1>Result</h1>
  <h2 id='score'>Your scored  ${quiz.score}</h2>`;
}

function showProgress() {
  document.getElementById("progress").textContent = `Question ${
    quiz.questionIndex + 1
  } of ${quiz.questions.length}`;
}
const questions = [
  new Question(
    "JavaScript supports",
    ["Functions", "XHTML", "CSS", "HTML"],
    "Functions"
  ),
  new Question(
    "Which language is used for styling web pages?",
    ["HTML", "JQuery", "CSS", "XML"],
    "CSS"
  ),
  new Question(
    "Which is not a JavaScript Framework?",
    ["Python Script", "JQuery", "Django", "NodeJS"],
    "Django"
  ),
  new Question(
    "Which is used for Connect To Database?",
    ["PHP", "HTML", "JS", "All"],
    "PHP"
  ),
  new Question(
    "JavaScript is a ",
    ["Language", "Programming Language", "Development", "All"],
    "Programming Language"
  ),
];

// console.log(questions[0]);
const quiz = new Quiz(questions);
loadQuestion();
