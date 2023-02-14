import {Animated} from 'react-native';

export const useButtonAnimated = (value: number = 1) => {
  const animatedValue = new Animated.Value(value);

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 4,
      tension: 30,
      useNativeDriver: true,
    }).start();
  };

  return {
    animatedValue,
    handlePressIn,
    handlePressOut,
  };
};
