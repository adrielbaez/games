import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  onPress?: () => void;
  isTurnedOver?: boolean;
  children?: JSX.Element | JSX.Element[];
  level: number;
}

export const Card = ({onPress, isTurnedOver, children, level}: Props) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.cardUp,
        {
          width: level < 4 ? 80 : 70,
          height: level < 4 ? 80 : 70,
        },
      ]}>
      {isTurnedOver ? (
        <Text
          style={[
            styles.text,
            {
              fontSize: level < 4 ? 46 : 30,
            },
          ]}>
          {children}
        </Text>
      ) : (
        <Text
          style={[
            styles.text,
            {
              fontSize: level < 4 ? 46 : 30,
            },
          ]}>
          ?
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cardUp: {
    width: 65,
    height: 65,
    margin: 5,
    borderWidth: 10,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  cardDown: {
    width: 65,
    height: 65,
    margin: 5,
    borderWidth: 10,
    borderColor: '#334155',
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  text: {
    fontSize: 46,
    color: '#334155',
  },
});
