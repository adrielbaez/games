import React from 'react';
import {Animated, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useButtonAnimated} from '../hooks/useButtonAnimated';

interface Props {
  iconName: string;
  onPress: () => void;
}

export const Button = ({iconName, onPress}: Props) => {
  const {animatedValue, handlePressIn, handlePressOut} = useButtonAnimated();

  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        style={styles.button}>
        <Icon name={iconName} size={30} color="#e07305" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#f8b908',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    padding: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
