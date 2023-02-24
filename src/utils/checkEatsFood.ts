import {Coordinates} from '../interfaces/types/types';
export const checkEatsFood = (
  snakeHead: Coordinates,
  foodPosition: Coordinates,
  area: number,
): boolean => {
  const distanceBetweenSnakeHeadAndFoodX = Math.abs(
    snakeHead.x - foodPosition.x,
  );
  const distanceBetweenSnakeHeadAndFoodY = Math.abs(
    snakeHead.y - foodPosition.y,
  );

  return (
    distanceBetweenSnakeHeadAndFoodX < area &&
    distanceBetweenSnakeHeadAndFoodY < area
  );
};
