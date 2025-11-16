const BOARD_WIDTH = 400;
const CENTER_X = BOARD_WIDTH / 2;
const MAX_ANGLE = 30;
const SENSITIVITY = 10;
const STORAGE_KEY = "seesawWeights";

const boardElement = document.getElementById("board");
const leftWeightElement = document.getElementById("left-weight");
const rightWeightElement = document.getElementById("right-weight");
const nextWeightElement = document.getElementById("next-weight");
const angleDisplayElement = document.getElementById("angle-display");
const resetButtonElement = document.getElementById("reset-button");

let weights = [];
let nextWeightValue = 0;
let isDragging = false;

function generateRandomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

function updateNextWeightDisplay() {
  nextWeightValue = generateRandomWeight();
  nextWeightElement.textContent = `${nextWeightValue} kg`;
}

function updateBalance() {
  let leftTorque = 0;
  let rightTorque = 0;
  let leftWeight = 0;
  let rightWeight = 0;

  for (const wgt of weights) {
    const distanceFromPivot = wgt.x - PIVOT_X;

    if (distanceFromPivot < 0) {
      leftTorque += wgt.weight * Math.abs(distanceFromPivot);
      leftWeight += wgt.weight;
    } else {
      rightTorque += wgt.weight * distanceFromPivot;
      rightWeight += wgt.weight;
    }
  }

  const netTorque = rightTorque - leftTorque;
  let angle = netTorque / SENSITIVITY;
  angle = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, angle));

  plankElement.style.transform = `rotate(${angle}deg)`;

  leftWeightElement.textContent = `${leftWeight.toFixed(1)} kg`;
  rightWeightElement.textContent = `${rightWeight.toFixed(1)} kg`;
  angleDisplayElement.textContent = `${angle.toFixed(1)}°`;
}

function renderObject(obj) {
  const objElement = document.createElement("div");
  objElement.className = "object-shape";
  objElement.dataset.id = obj.id;
  objElement.style.left = `${obj.x}px`;
  objElement.textContent = `${obj.weight}kg`;
  objElement.draggable = true;

  boardElement.appendChild(objElement);
}
