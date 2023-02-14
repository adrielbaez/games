import React from 'react';
import {Text, View} from 'react-native';
import {GameOption} from '../components/GameOption';
import {globalStyles} from '../styles/global';

const MENU_GAMES = [
  {
    id: 1,
    title: 'Memory Game',
    route: 'MemoryGameScreen',
  },
  {
    id: 2,
    title: 'Tic Tac Toe',
    route: 'TicTacToeScreen',
  },
];

export const MenuScreen = () => {
  return (
    <View style={[globalStyles.container]}>
      {/* create menu games */}
      <Text
        style={[
          globalStyles.title,
          {
            marginBottom: 60,
          },
        ]}>
        Select Game
      </Text>
      <View>
        {MENU_GAMES.map(game => (
          <GameOption key={game.id} title={game.title} route={game.route} />
        ))}
      </View>
    </View>
  );
};
