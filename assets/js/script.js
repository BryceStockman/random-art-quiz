// VARIABLES
var highScoreLink = document.querySelector('.highscore-list');
var timerEl = document.querySelector('.timer');
var countdownSeconds = 60;
var countdownTimer;
timerEl.innerHTML = countdownSeconds;

var startQuizContainer = document.querySelector('#container-start');
var startBtn = document.querySelector('.start-btn');

var quizContainerEl = document.querySelector('#container-quiz');
var questionsContainerEl = document.querySelector('.questions-container');
var questionEl = '';
var questionItemsListEl = document.querySelector('.question-item-list');
var questionsAnswerBtn = document.querySelector('.answer-btn');

var questionsArray = [
  {
    question: 'Who wrote the novel "The Bridge Over the River Kwai"?',
    choices: [
      'Ernest Hemingway',
      'Pierre Boulle',
      'Langston Hughes',
      'T.S. Eliot',
    ],
    answer: 'Pierre Boulle',
  },
  {
    question: 'What year was Beethoven born in?',
    choices: ['1770', '1754', '1870', '1670'],
    answer: '1770',
  },
  {
    question:
      'Who wrote the collection of short stories on which Fiddler on the Roof was based?',
    choices: [
      'Sholem Aleichem',
      'Mendele Mocher Sforim',
      'I.L. Peretz',
      'Jacob Dinezon',
    ],
    answer: 'Sholem Aleichem',
  },
  {
    question:
      'What musical instrument does Sherlock Holmes play for relaxation?',
    choices: ['Violin', 'Guitar', 'Harmonica', 'Flute'],
    answer: 'Violin',
  },
  {
    question:
      'Which museum owns the only Da Vinci painting in the Western Hemisphere?',
    choices: [
      'National Art Gallery (U.S.)',
      'Tacoma Art Museum',
      'Montreal Museum of Fine Arts Montreal, Quebec, Canada',
      'Frederic Remington Art Museum',
    ],
    answer: 'National Art Gallery (U.S.)',
  },
  {
    question: 'What kind of a dog is Marmaduke?',
    choices: [
      'Great Dane',
      'Yorkshire Terrier',
      'Cavalier King Charles Spaniel',
      'Greyhound',
    ],
    answer: 'Great Dane',
  },
  {
    question:
      'What surname for John in "The Importance of Being Earnest" did Oscar Wilde take from the seaside town he vacationed at?',
    choices: ['Worthing', 'Wright', 'Hill', 'Hughes'],
    answer: 'Worthing',
  },
  {
    question: 'Which singer wrote the autobiography "Take It Like a Man"?',
    choices: ['Boy George', 'George Michael', 'Freddie Mercury', 'Paul Young'],
    answer: 'Boy George',
  },
  {
    question:
      'What semi-autobiographical play did Emlyn Williams write in 1938?',
    choices: ['The Corn Is Green', 'As I Lay Dying', 'The Waves', 'Anthem'],
    answer: 'The Corn Is Green',
  },
  {
    question:
      'What wealthy comic-book title character keeps his mansion tidy with the help of a robot maid, Irona?',
    choices: [
      'Richie Rich',
      'Professor Keenbean',
      'Herbert Arthur Runcible Cadbury',
      'Reggie Van Dough',
    ],
    answer: 'Richie Rich',
  },
  {
    question:
      'The folklore characters known as "oni" originated in which country?',
    choices: ['Japan', 'Finland', 'South Korea', 'Nigeria'],
    answer: 'Japan',
  },
  {
    question: 'How many symphonies did Beethoven compose?',
    choices: ['9', '11', '7', '4'],
    answer: '9',
  },
  {
    question:
      'Who spent months rehearsing for "My Fair Lady" then had most of her singing dubbed by Marni Nixon?',
    choices: [
      'Audrey Hepburn',
      'Mae West',
      'Katherine Hepburn',
      'Lucille Ball',
    ],
    answer: 'Audrey Hepburn',
  },
  {
    question:
      'Which classic science fiction author wrote "The End of Eternity", "Pebble in the Sky", and "The Caves of Steel"?',
    choices: [
      'Isaac Asimov',
      'Frank Herbert',
      'Robert A. Heinlein',
      'Orson Scott Card',
    ],
    answer: 'Isaac Asimov',
  },
  {
    question:
      'What river is the setting for the novel "The Adventures of Huckleberry Finn"?',
    choices: [
      'Mississippi River',
      'Missouri Rivers',
      'Arkansas River',
      'Allegheny River',
    ],
    answer: 'Mississippi River',
  },
  {
    question:
      'Which character is pregnant at the beginning of The Grapes of Wrath?',
    choices: ['Rose of Sharon', 'Ma Joad', 'Ruthie Joad', 'Agnes Wainwright'],
    answer: 'Rose of Sharon',
  },
  {
    question: 'Who has a heart "two sizes too small"?',
    choices: ['The Grinch', 'Ebenezer Scrooge', 'Miss Trunchbull', 'Gru'],
    answer: 'The Grinch',
  },
  {
    question: 'Andy Warhol was born in what US city?',
    choices: ['Pittsburgh', 'Detroit', 'Boston', 'Albuquerque'],
    answer: 'Pittsburgh',
  },
  {
    question: `What are the two cities in Charles Dickens' novel "A Tale of Two Cities"?`,
    choices: [
      'London and Paris',
      'New York and Boston',
      'London and Berlin',
      'Paris and Berlin',
    ],
    answer: 'London and Paris',
  },
];
var i = 0;

var answerResponseContainer = document.querySelector('.answer-response');

var totalScore = 0;
var endQuizContainer = document.querySelector('#container-end');
var userInitialsInput = document.querySelector('.high-score-input');
var highScoreBtn = document.querySelector('.hs-btn');
var highScoreContainer = document.querySelector('#container-highscores');
var highScores = document.querySelector('.user-hs');
var restartQuizBtn = document.querySelector('.restart-btn');
var clearHighScoresBtn = document.querySelector('.clear-btn');
var saveUserPerformance = [];

// FUNCTIONS
function startQuiz() {
  startQuizContainer.classList.add('hide');
  quizContainerEl.classList.remove('hide');

  countdownTimer = setInterval(function () {
    countdownSeconds--;
    if (countdownSeconds <= 0) {
      countdownSeconds = 0;
      clearInterval(countdownTimer);
      endQuiz();
    }
    timerEl.innerHTML = countdownSeconds;
  }, 1000);

  showQuestion();
}

function showQuestion(questionTitle) {
  // Question
  var questionTitle = questionsArray[i].question;
  var questionHeader = document.querySelector('.question');
  questionHeader.textContent = questionTitle;

  // Choice Options
  questionsArray[i].choices.forEach(function (choice) {
    console.log(questionsArray[i]);
    var answerBtnEl = document.createElement('button');
    answerBtnEl.classList.add(
      'answer-btn',
      'btn',
      'question-item',
      'col-12',
      'm-auto'
    );
    answerBtnEl.textContent = choice;
    questionItemsListEl.appendChild(answerBtnEl);
  });
}

function showNextQuestion() {
  resetState();
  if (questionsArray[i]) {
    showQuestion(questionsArray[i]);
  } else {
    clearInterval(countdownTimer);
    endQuiz();
  }
}

function resetState() {
  questionItemsListEl.innerHTML = '';

  setTimeout(function () {
    answerResponseContainer.innerHTML = '';
    answerResponseContainer.classList.add('hide');
    answerResponseContainer.classList.remove('bg-correct', 'bg-incorrect');
  }, 2000);
}

function endQuiz() {
  quizContainerEl.classList.add('hide');
  endQuizContainer.classList.remove('hide');

  var userHighScoreEl = document.querySelector('.user-high-score');
  userHighScoreEl.innerText = totalScore;
}

function collectHighScore() {
  var userPerformanceEl = document.createElement('li');
  var userInitials = userInitialsInput.value;
  var userStats = `${userInitials}-${totalScore}`;

  saveUserPerformance.push(userStats);
  console.log(saveUserPerformance);
  localStorage.setItem('userPerformance', JSON.stringify(saveUserPerformance));

  endQuizContainer.classList.add('hide');
  highScoreContainer.classList.remove('hide');

  userPerformanceEl.innerText = userStats;
  highScores.appendChild(userPerformanceEl);
}

function restartQuiz() {
  i = 0;
  totalScore = 0;
  countdownSeconds = 60;
  questionItemsListEl.innerHTML = '';
  timerEl.innerHTML = countdownSeconds;
  highScoreContainer.classList.add('hide');
  startQuizContainer.classList.remove('hide');
}

function displayHighScore(e) {
  e.preventDefault();
  highScores.innerHTML = '';
  highScoreContainer.classList.remove('hide');
  startQuizContainer.classList.add('hide');
  var highScoreList = JSON.parse(localStorage.getItem('userPerformance'));

  for (var i = 0; i < highScoreList.length; i++) {
    var userPerformanceEl = document.createElement('li');
    userPerformanceEl.innerText = highScoreList[i];
    highScores.appendChild(userPerformanceEl);
  }
}

function clearHighScores() {
  highScores.innerHTML = '';
  localStorage.clear();
}

// EVENT LISTENERS
questionItemsListEl.addEventListener('click', function (event) {
  if (event.target.innerHTML == questionsArray[i].answer) {
    // total score incrementer
    totalScore += 10;

    // correct response
    answerResponseContainer.classList.remove('hide');
    answerResponseContainer.classList.add('bg-correct');
    var answerResponseEl = document.createElement('p');
    answerResponseEl.innerText = 'Correct!';

    answerResponseContainer.appendChild(answerResponseEl);
  } else {
    // incorrect response
    answerResponseContainer.classList.remove('hide');
    answerResponseContainer.classList.add('bg-incorrect');
    var answerResponseEl = document.createElement('p');
    answerResponseEl.innerText = 'Incorrect!';
    answerResponseContainer.appendChild(answerResponseEl);

    // timer decrementer
    countdownSeconds -= 10;
  }
  // next array question incrementer
  i++;
  showNextQuestion();
});

startBtn.addEventListener('click', startQuiz);

highScoreBtn.addEventListener('click', collectHighScore);

restartQuizBtn.addEventListener('click', restartQuiz);

highScoreLink.addEventListener('click', displayHighScore);

clearHighScoresBtn.addEventListener('click', clearHighScores);
