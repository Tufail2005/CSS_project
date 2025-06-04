const quizdata = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const quizBox = document.getElementById("quizBox");
const nextbtn = document.getElementById("nextBtn");
const submitbtn = document.getElementById("submitBtn");
const result = document.getElementById("result");

let currentQuestion = 0;
let userAnswers = [];

function loadQuestion() {
  const q = quizdata[currentQuestion];
  quizBox.innerHTML = `
        <p><strong>Q${currentQuestion + 1}:</strong> ${q.question}</p>
        <div class="options">
          <label><input type="radio" name="answer" value="a"> ${q.a}</label>
          <label><input type="radio" name="answer" value="b"> ${q.b}</label>
          <label><input type="radio" name="answer" value="c"> ${q.c}</label>
          <label><input type="radio" name="answer" value="d"> ${q.d}</label>
        </div>
      `;
}

nextbtn.addEventListener("click", () => {
  const selected = document.querySelector(`input[name="answer"]:checked`);

  if (!selected) {
    alert("Please select an answer.");
    return;
  }
  userAnswers.push(selected.value);
  currentQuestion++;
  loadQuestion();
});

submitbtn.addEventListener("click", () => {
  const selected = document.querySelector(`input[name="answer"]:checked`);
  if (!selected) {
    alert("Please select an answer.");
    return;
  }
  userAnswers.push(selected.value);

  //result calculation

  let score = 0;
  quizdata.forEach((q, i) => {
    if (userAnswers[i] === q.correct) score++;
  });

  quizBox.style.display = "none";
  nextbtn.style.display = "none";
  submitbtn.style.display = "none";
  result.textContent = `You scored ${score} out of ${quizdata.length}`;
});

loadQuestion();
