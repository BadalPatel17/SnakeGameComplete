import { onSnake, expandSnake, setSnakeSpeed, increasePoints, getPoints} from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1;
const SPECIAL_FOOD_DURATION = 10; // Duration of the special food effect in seconds

export function update() {
    if (onSnake(food)) {
      if (food.isSpecial) {
        setSnakeSpeed(15);
        setTimeout(() => {
          setSnakeSpeed(5);
        }, SPECIAL_FOOD_DURATION * 1000);
      } else {
        increasePoints(); // Increase points when regular food is eaten
      }
      expandSnake(EXPANSION_RATE);
      food = getRandomFoodPosition();
    }
  }

  export function draw(gameBoard) {
    // Draw the points on the game board
    const pointsElement = document.createElement("div");
    pointsElement.innerText = `Points: ${getPoints()}`;
    pointsElement.classList.add("points");
    gameBoard.appendChild(pointsElement);
  

    // Draw the food
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add(food.isSpecial ? "special-food" : "food");
    gameBoard.appendChild(foodElement);
  }
  

function getRandomFoodPosition() {
  let newFoodPosition;
  let isSpecial = Math.random() < 0.1; // 10% chance of being a special food
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition();
    newFoodPosition.isSpecial = isSpecial;
  }
  return newFoodPosition;
}