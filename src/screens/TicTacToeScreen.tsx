import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Button} from '../components/Button';
import {globalStyles} from '../styles/global';
import {WINNING_COMPS} from '../utils/winningComps';

enum Player {
  X = 'X',
  O = 'O',
}

enum Status {
  Playing = 'PLAYING',
  XWon = 'XWON',
  OWon = 'OWON',
  Draw = 'DRAW',
}

export const TicTacToeScreen = () => {
  const [turn, setTurn] = useState<Player>(Player.X);
  const [cells, setCells] = useState<(Player | '')[]>([
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [status, setStatus] = useState(Status.Playing);
  const [scoreBoard, setScoreBoard] = useState({
    X: 0,
    O: 0,
  });

  const handlePress = (index: number) => {
    if (status !== Status.Playing) {
      return;
    }

    const newCells = [...cells];

    if (newCells[index] === '') {
      newCells[index] = turn;

      setTurn(turn === Player.X ? Player.O : Player.X);
      setCells(newCells);
    }
  };

  useEffect(() => {
    let winner: Player | undefined;

    for (let player of [Player.X, Player.O]) {
      const hasWon = WINNING_COMPS.some(winningComp => {
        return winningComp.every(index => cells[index] === player);
      });

      if (hasWon) {
        winner = player;
      }
    }

    if (winner === Player.X) {
      setStatus(Status.XWon);
      setScoreBoard({
        ...scoreBoard,
        X: scoreBoard.X + 1,
      });
    } else if (winner === Player.O) {
      setStatus(Status.OWon);
      setScoreBoard({
        ...scoreBoard,
        O: scoreBoard.O + 1,
      });
    } else if (cells.every(cell => cell !== '')) {
      setStatus(Status.Draw);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cells]);

  return (
    <>
      <View style={globalStyles.container}>
        <Text
          style={[
            globalStyles.title,
            {
              marginBottom: 40,
            },
          ]}>
          Tic Tac Toe
        </Text>
        <Text
          style={[
            globalStyles.title,
            {
              marginBottom: 40,
            },
          ]}>
          X win: {scoreBoard.X} - O win: {scoreBoard.O}
        </Text>
        {/* board */}
        <View style={styles.board}>
          {cells.map((cell, index) => (
            <TouchableOpacity
              key={`cell-${index}`}
              style={styles.cell}
              activeOpacity={0.8}
              onPress={() => handlePress(index)}>
              <Text style={styles.letter}>{cell}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* status */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
            width: 300,
            height: 100,
          }}>
          <Text style={styles.text}>
            {status === Status.Playing && `Turn: ${turn}`}
          </Text>
          <Text style={styles.text}>
            {status === Status.XWon && '🎉🎉🎉 X Won! 🎉🎉🎉'}
          </Text>
          <Text style={styles.text}>
            {status === Status.Draw && '🤝 Draw! 🤝'}
          </Text>
          <Text style={styles.text}>
            {status === Status.OWon && '🎉🎉🎉 O Won! 🎉🎉🎉'}
          </Text>
        </View>
        {/* reset */}
        {status !== Status.Playing && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 300,
            }}>
            <Text style={styles.text}>Play again?</Text>
            <Button
              iconName="refresh-circle-outline"
              onPress={() => {
                setCells(['', '', '', '', '', '', '', '', '']);
                setStatus(Status.Playing);
              }}
            />
          </View>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  board: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: 302,
    height: 300,
    backgroundColor: '#e07305',
    borderWidth: 1,
    borderColor: 'black',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
    width: 100,
    height: 100,
  },
  text: {
    color: 'white',
    fontSize: 25,
  },
  letter: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 58,
  },
});
