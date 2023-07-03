// Define your quiz questions and choices
const quizData = [
  {
    question: "What does HTML stand for ?",
    choices: ["Hypertensive Money Loan",
    "Hypertext Manual Log",
    "Hypertext Markup Language",
    "Hypertech Math Link"],
    correctAnswer: 2
  },
  {
    question: "What does URL stand for ?",
    choices: [  "Universal Resource Language",
    "Uniform Resource Locator",
    "Universal Resource Locator",
    "University Resource Link "],
    correctAnswer: 0
  },
  {
      question:"Choose the correct HTML element for the largest heading:",
  choices: [
              "heading",
              "h1",
              "header",
              "h6",
  ],
  correctAnswer: 1

  },
  {
      question:"What is the correct HTML element for inserting a line break?",
      choices: [
                  "break",
                  "<bl>",
                  "<br>",
                  "margin",
      ],
      correctAnswer : 2,
  },
  {
      question:"What does CSS stand for?",
  choices: [
              "Cascading Style Sheets",
              "Computer Style Sheets",
              "Colorful Style Sheets",
              "Creative Style Sheets",
  ],
  correctAnswer : 0,
  },
  {
      question:"Which HTML tag is used to define an internal style sheet?",
      choices: [
                  "link",
                  "Style",
                  "Script",
                  "css",
      ],
      correctAnswer : 1,
  },
  {
      question:"Which HTML tag is used to define an internal script file?",
      choices: [
              "link",
              "Style",
              "Script",
              "css",
  ],
  correctAnswer : 1,
  }


]

// Get HTML elements
const descriptionContainer = document.getElementById('description-container');
const startButton = document.getElementById('start-btn');
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const choicesElement = document.getElementById('choices');
const questionCountElement = document.getElementById('question-count');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const resultElement = document.getElementById('result');
const leaderboardTable = document.getElementById('leaderboard');
const playerNamee = document.querySelector("#playerName");

let currentQuestion = 0;
let score = 0;
let playerName = '';

// Load description and leaderboard from local storage
const description = localStorage.getItem('quizDescription');
const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
// console.log(description);

if (description) {
  descriptionContainer.style.display = 'block';
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'none';
  document.getElementById('description').textContent = description;
} else {
  startQuiz();
}

// Start the quiz
function startQuiz() {
  descriptionContainer.style.display = 'block';
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'none';

  playerName = playerNamee.value;
  console.log(playerName);
  if (!playerName) {
    // playerName = 'Anonymous';
    alert("Please enter your name to proceed");
  }else {
  startButton.addEventListener('click', startQuiz);
  descriptionContainer.style.display = 'none';
  quizContainer.style.display = 'block';

  loadQuestion();
  }
  
}



// Load question and choices
function loadQuestion() {
 
  const quiz = quizData[currentQuestion];

  questionElement.textContent = quiz.question;
  choicesElement.innerHTML = '';

  for (let i = 0; i < quiz.choices.length; i++) {
    const choice = quiz.choices[i];
    const li = document.createElement('li');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'choice';
    input.value = i;
    li.appendChild(input);
    li.appendChild(document.createTextNode(choice));
    choicesElement.appendChild(li);
  }

  questionCountElement.textContent = `Question ${currentQuestion + 1} / ${quizData.length}`;
}

// Check if the selected answer is correct
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="choice"]:checked');
  if (!selectedOption) {
    return;
  }

  const answer = parseInt(selectedOption.value);
  if (answer === quizData[currentQuestion].correctAnswer) {
    
    score++;
  }

  currentQuestion++;
  selectedOption.checked = false;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

// Display the result
function showResult() {
  quizContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  resultElement.textContent = `Dear ${playerName}, you scored ${score} out of ${quizData.length}!`;

  // Update leaderboard
  leaderboard.push({ player: playerName, score: score });
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard.splice(5); // Keep only the top 5 scores
  updateLeaderboard();

  // Save leaderboard to local storage
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
}

// Update the leaderboard table
function updateLeaderboard() {
  // Clear the table body
  while (leaderboardTable.rows.length > 1) {
    leaderboardTable.deleteRow(1);
  }

  // Add rows to the table
  for (let i = 0; i < leaderboard.length; i++) {
    const row = leaderboardTable.insertRow(-1);
    const playerCell = row.insertCell(0);
    const scoreCell = row.insertCell(1);
    playerCell.textContent = leaderboard[i].player;
    scoreCell.textContent = leaderboard[i].score;
  }
}

// Move to the next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
shuffleArray(quizData);


// Add event listeners
startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
choicesElement.addEventListener('change', () => nextButton.style.display = 'block');
nextButton.addEventListener('click', checkAnswer);


