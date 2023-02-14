import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MemoryGameScreen} from '../screens/MemoryGameScreen';
import {MenuScreen} from '../screens/MenuScreen';
import {TicTacToeScreen} from '../screens/TicTacToeScreen';

export type RootStackParamList = {
  MenuScreen: undefined;
  MemoryGameScreen: undefined;
  TicTacToeScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MenuScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="MenuScreen" component={MenuScreen} />
      <Stack.Screen name="MemoryGameScreen" component={MemoryGameScreen} />
      <Stack.Screen name="TicTacToeScreen" component={TicTacToeScreen} />
    </Stack.Navigator>
  );
};
