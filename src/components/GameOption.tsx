import React from 'react';
import {Text, StyleSheet, Animated, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons';
import {useButtonAnimated} from '../hooks/useButtonAnimated';
import {RootStackParamList} from '../navigations/StackNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  title: string;
  route: string;
}

type GameOptionStack = NativeStackNavigationProp<
  RootStackParamList,
  'MemoryGameScreen' | 'TicTacToeScreen'
>;

export const GameOption = ({title, route}: Props) => {
  const {animatedValue, handlePressIn, handlePressOut} = useButtonAnimated();
  const navigation = useNavigation<GameOptionStack>();

  const animatedStyle = {
    transform: [{scale: animatedValue}],
  };

  return (
    <Animated.View style={[animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => navigation.navigate(route as keyof RootStackParamList)}
        style={styles.button}>
        <Text style={styles.text}>{title}</Text>
        <Icon name="caret-forward-outline" size={30} color="#e07305" />
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
