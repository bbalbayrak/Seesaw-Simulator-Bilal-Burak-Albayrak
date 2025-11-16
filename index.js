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

//MAIN FUNCTIONS

/**
 @returns {number}
*/

function createRandomWeight() {
  return Math.floor(Math.random() * 10) + 1;
}

function updateNextWeightDisplay() {
  nextWeightValue = createRandomWeight();
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

/**
 @param {Object} obj 
 */

function renderObject(obj) {
  const objElement = document.createElement("div");
  objElement.className = "object-shape";
  objElement.dataset.id = obj.id;
  objElement.textContent = `${obj.weight}kg`;
  objElement.style.left = `${obj.x}px`;
  objElement.draggable = true;
  boardElement.appendChild(objElement);
}

function renderAllObjects() {
  const existingObjects = boardElement.querySelectorAll(".object-shape");
  existingObjects.forEach((obj) => obj.remove());

  for (const wgt of weights) {
    renderObject(wgt);
  }
}

function saveCurrentState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(weights));
}

function loadSavedState() {
  const savedState = localStorage.getItem(STORAGE_KEY);
  if (savedState) {
    weights = JSON.parse(savedState);
  }
}

//EVENT HANDLERS

/** 
 @param {MouseEvent} e
 */

function handleBoardClick(e) {
  if (isDragging) {
    isDragging = false;
    return;
  }

  if (e.target !== boardElement) {
    return;
  }

  const boardBounds = boardElement.getBoundingClientRect();
  const cursorX = e.clientX - boardBounds.left;
  const boardPositionX = Math.max(0, Math.min(BOARD_WIDTH, cursorX));

  const newObject = {
    id: Date.now(),
    x: boardPositionX,
    weight: nextWeightValue,
  };

  weights.push(newObject);
  saveCurrentState();
  renderObject(newObject);
  updateBalance();
  updateNextWeightDisplay();
}

/**
 @param {DragEvent} e
 @param {Object} obj
 */

function handleExistingWeightDrag(e, obj) {
  isDragging = true;
  e.dataTransfer.setData("text/plain", obj.id.toString());
  e.dataTransfer.effectAllowed = "move";
}
