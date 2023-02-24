import React from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {Snake} from './Snake';
import {COLORS} from '../../styles/global';
import {
  Coordinates,
  DIRECTION,
  IGestureEventType,
} from '../../interfaces/types/types';
import {
  FOOD_INITIAL_POSITION,
  GAME_BOUNDS,
  MOVE_INTERVAL,
  SNAKE_INITIAL_POSITION,
} from '../../utils/snake';
import {checkGameOver} from '../../utils/checkGameOver';
import {Food} from './Food';
import {checkEatsFood} from '../../utils/checkEatsFood';
import {randomFoodPosition} from '../../utils/randomFoodPosition';
import {Header} from './Header';

export const SnakeScreen = (): JSX.Element => {
  const [direction, setDirection] = React.useState<DIRECTION>(DIRECTION.Right);
  const [snake, setSnake] = React.useState<Coordinates[]>(
    SNAKE_INITIAL_POSITION,
  );
  const [food, setFood] = React.useState<Coordinates>(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);
  const [score, setScore] = React.useState(0);

  const handleGesture = (event: IGestureEventType) => {
    const {translationX, translationY} = event.nativeEvent;

    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        setDirection(DIRECTION.Right);
      } else {
        setDirection(DIRECTION.Left);
      }
    } else {
      if (translationY > 0) {
        setDirection(DIRECTION.Down);
      } else {
        setDirection(DIRECTION.Up);
      }
    }
  };

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead}; // copy snake head

    // game over

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver(prev => !prev);
      return;
    }

    //  check direction
    switch (direction) {
      case DIRECTION.Right:
        newHead.x += 1;
        break;
      case DIRECTION.Left:
        newHead.x -= 1;
        break;
      case DIRECTION.Up:
        newHead.y -= 1;
        break;
      case DIRECTION.Down:
        newHead.y += 1;
        break;
      default:
        break;
    }

    // check if snake eat food
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + 10);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  React.useEffect(() => {
    if (!isGameOver) {
      // move snake
      const interval = setInterval(() => {
        if (!isPaused) {
          moveSnake();
        }
      }, MOVE_INTERVAL);
      return () => clearInterval(interval);
    }
  }, [isGameOver, snake, isPaused]);

  const handlePause = () => {
    setIsPaused(prev => !prev);
  };

  const handleReload = () => {
    setSnake(SNAKE_INITIAL_POSITION);
    setFood(FOOD_INITIAL_POSITION);
    setScore(0);
    setIsGameOver(false);
    setDirection(DIRECTION.Right);
    setIsPaused(false);
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={[styles.container]}>
        <Header reload={handleReload} pause={handlePause} isPaused={isPaused}>
          <Text style={{color: COLORS.primary, fontSize: 20}}>
            Score: {score}
          </Text>
        </Header>

        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  boundaries: {
    flex: 1,
    borderWidth: 12,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
  },
});
