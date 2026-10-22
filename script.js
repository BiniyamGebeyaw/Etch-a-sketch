const container = document.getElementById("container");
const newGridButton = document.getElementById("new-grid");
const modeButton = document.getElementById("mode");

const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
let rainbowMode = false;

function createGrid(size) {
  container.innerHTML = "";
  container.style.setProperty("--size", size);

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    container.appendChild(square);
  }
}

function randomChannel() {
  return Math.floor(Math.random() * 256);
}

function colorSquare(square) {
  if (!rainbowMode) {
    square.style.backgroundColor = "#222";
    return;
  }

  if (!square.dataset.base) {
    square.dataset.base = [randomChannel(), randomChannel(), randomChannel()].join(",");
  }
  const step = Math.min(Number(square.dataset.step || 0) + 1, 10);
  square.dataset.step = step;

  const factor = 1 - step / 10;
  const [r, g, b] = square.dataset.base.split(",").map(Number);
  square.style.backgroundColor =
    `rgb(${Math.round(r * factor)}, ${Math.round(g * factor)}, ${Math.round(b * factor)})`;
}


container.addEventListener("mouseover", (event) => {
  if (event.target.classList.contains("square")) {
    colorSquare(event.target);
  }
});

newGridButton.addEventListener("click", () => {
  const answer = prompt(`Squares per side? (1-${MAX_SIZE})`);
  if (answer === null) return;

  const size = Number(answer);
  if (!Number.isInteger(size) || size < 1 || size > MAX_SIZE) {
    alert(`Please enter a whole number from 1 to ${MAX_SIZE}.`);
    return;
  }
  createGrid(size);
});

modeButton.addEventListener("click", () => {
  rainbowMode = !rainbowMode;
  modeButton.textContent = rainbowMode ? "Mode: Rainbow + darken" : "Mode: Classic";
});

createGrid(DEFAULT_SIZE);
