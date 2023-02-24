import React, {Fragment} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {Coordinates} from '../../interfaces/types/types';

import {COLORS, globalStyles} from '../../styles/global';

interface Props {
  snake: Coordinates[];
}

export const Snake = ({snake}: Props) => {
  return (
    <Fragment>
      {snake.map((snakePart, index) => {
        return (
          <View
            key={index}
            style={[
              styles.snake,
              {left: snakePart.x * 10, top: snakePart.y * 10},
            ]}
          />
        );
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  snake: {
    width: 15,
    height: 15,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    position: 'absolute',
  },
});
