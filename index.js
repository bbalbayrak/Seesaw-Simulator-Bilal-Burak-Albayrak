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
