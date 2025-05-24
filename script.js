const rawData = `
image	option1	option2	option3	option4	correct
images/drive.png	Drive	Walk	Jump	Sit	Drive
images/give.png	Eat	Drink	Sleep	Give	Give
images/live.png	Read	Write	Live	Listen	Live
images/open.png	Sing	Dance	Play	Open	Open
images/wake up.png	Write	Wake up	Speak	Listen	Wake up
images/ski.png	Ski	Wake up	Run	Eat	Ski
images/smile.png	Jump	Smile	Sit	Walk	Smile
images/disturb.png	Drive	Ride	Walk	Disturb	Disturb
images/vacuum.png	Swim	Vacuum	Run	Jump	Vacuum
images/sit.png	Think	Speak	Sit	Listen	Sit
images/cry.png	Talk	Listen	Cry	Write	Cry
images/celebrate.png	Celebrate	Sing	Play	Run	Celebrate
images/drink.png	Drink	Drive	Walk	Run	Drink
images/run.png	Listen	Talk	Write	Run	Run
images/watch.png	Cook	Watch	Drink	Read	Watch
images/discuss.png	Ride	Drive	Discuss	Run	Discuss
images/write.png	Watch	See	Look	Write	Write
images/repair.png	Repair	See	Watch	Listen	Repair
images/walk.png	Hear	Listen	Walk	Write	Walk
images/sing.png	Clean	Sing	Cook	Eat	Sing
images/fly.png	Wash	Fly	Dry	Cook	Fly
images/iceskate.png	Iceskate	See	Hear	Touch	Iceskate
images/read.png	Touch	Feel	See	Read	Read
images/leave.png	Feel	Touch	See	Leave	Leave
images/pay.png	Build	Break	Pay	Draw	Pay
images/travel.png	Travel	Break	Build	Draw	Travel
images/go.png	Break	Fix	Go	Draw	Go
images/sell.png	Play	Sell	Sing	Write	Sell
`;

let questions = [];
let currentQuestion = 0;

function parseTSV(tsv) {
  const lines = tsv.trim().split('\n');
  const headers = lines[0].split('\t');
  return lines.slice(1).map(line => {
    const parts = line.split('\t');
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = parts[idx];
    });
    return {
      image: obj.image,
      options: [obj.option1, obj.option2, obj.option3, obj.option4],
      correct: obj.correct
    };
  });
}

questions = parseTSV(rawData);
shuffleArray(questions);
showQuestion();

function showQuestion() {
  const question = questions[currentQuestion];
  const img = document.getElementById('image');
  const optionsDiv = document.getElementById('options');
  const nextBtn = document.getElementById('nextBtn');

  img.src = question.image;
  optionsDiv.innerHTML = '';
  nextBtn.classList.add('d-none');

  const shuffledOptions = [...question.options];
  shuffleArray(shuffledOptions);

  shuffledOptions.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.className = 'btn btn-outline-primary';
    btn.onclick = () => {
      optionsDiv.querySelectorAll('button').forEach(b => b.disabled = true);
      nextBtn.classList.remove('d-none');

      if (option === question.correct) {
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-success');
      } else {
        btn.classList.remove('btn-outline-primary');
        btn.classList.add('btn-danger');
        const correctBtn = [...optionsDiv.children].find(b => b.textContent === question.correct);
        if (correctBtn) {
          correctBtn.classList.remove('btn-outline-primary');
          correctBtn.classList.add('btn-success');
        }
      }
    };
    optionsDiv.appendChild(btn);
  });
}

document.getElementById('nextBtn').addEventListener('click', () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.querySelector('.card-body').innerHTML = '<h3>Quiz Completed 🎉</h3>';
  }
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}