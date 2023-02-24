import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Coordinates} from '../../interfaces/types/types';

export const Food = ({x, y}: Coordinates) => {
  return <Text style={[styles.food, {left: x * 10, top: y * 10}]}>🍟</Text>;
};

const styles = StyleSheet.create({
  food: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
  },
});
