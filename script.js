const cards = [
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "2 + 2?", answer: "4" },
    { question: "What color is the sky?", answer: "Blue" },
  ];
  
  let currentIndex = 0;
  let showingAnswer = false;
  
  const container = document.getElementById("card-container");
  
  function showCard(index) {
    showingAnswer = false;
    const card = document.createElement("div");
    card.className = "card";
    card.textContent = cards[index].question;
    card.onclick = () => {
      if (!showingAnswer) {
        card.textContent = cards[index].answer;
        showingAnswer = true;
      } else {
        card.textContent = cards[index].question;
        showingAnswer = false;
      }
    };
    container.innerHTML = ""; // temizle
    container.appendChild(card);
  }
  
  function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
  }
  
  window.onload = () => showCard(currentIndex);