const cards = [
    {
      image: "images/drive.png",
      correct: "Drive",
      options: ["Drive", "Banana", "Carrot", "Grape"]
    },
    {
      image: "images/give.png",
      correct: "Give",
      options: ["Dog", "Cat", "Give", "Fish"]
    }
  ];
  
  let currentIndex = 0;
  
  function showCard(index) {
    const cardData = cards[index];
    const container = document.getElementById("card-container");
    const feedback = document.getElementById("feedback");
    feedback.textContent = "";
  
    const card = document.createElement("div");
    card.className = "card shadow p-3 mb-5 bg-white rounded";
    card.style.width = "24rem";
  
    card.innerHTML = `
      <img src="${cardData.image}" class="card-img-top" alt="quiz image" />
      <div class="card-body">
        <h5 class="card-title">What is this in English?</h5>
        <div id="options" class="d-grid gap-2"></div>
      </div>
    `;
  
    const optionsContainer = card.querySelector("#options");
    cardData.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "btn btn-outline-primary option-btn";
      btn.textContent = option;
      btn.onclick = () => handleAnswer(option, cardData.correct);
      optionsContainer.appendChild(btn);
    });
  
    container.innerHTML = "";
    container.appendChild(card);
  }
  
  function handleAnswer(selected, correct) {
    const feedback = document.getElementById("feedback");
    if (selected === correct) {
      feedback.textContent = "✅ Correct!";
      feedback.className = "text-success fw-bold";
    } else {
      feedback.textContent = `❌ Wrong. The correct answer is "${correct}".`;
      feedback.className = "text-danger fw-bold";
    }
  
    // Tüm butonları pasif yap
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => {
      btn.disabled = true;
      if (btn.textContent === correct) {
        btn.classList.replace("btn-outline-primary", "btn-success");
      } else if (btn.textContent === selected) {
        btn.classList.replace("btn-outline-primary", "btn-danger");
      }
    });
  }
  
  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }
  
  window.onload = () => showCard(currentIndex);