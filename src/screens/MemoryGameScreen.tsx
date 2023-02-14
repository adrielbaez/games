import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {globalStyles} from '../styles/global';
import {cardsSport as cards, shuffle} from '../utils';

export const MemoryGameScreen = () => {
  const [board, setBoard] = React.useState(() =>
    shuffle([...cards.slice(0, 4), ...cards.slice(0, 4)]),
  );
  const [selectedCards, setSelectedCards] = React.useState<number[]>([]);
  const [matchedCards, setMatchedCards] = React.useState<number[]>([]);
  const [score, setScore] = React.useState(0);
  const [level, setLevel] = React.useState(1);

  React.useEffect(() => {
    if (selectedCards.length < 2) return;

    if (board[selectedCards[0]] === board[selectedCards[1]]) {
      setMatchedCards([...matchedCards, ...selectedCards]);
      setSelectedCards([]);
    } else {
      const timeOutId = setTimeout(() => {
        setSelectedCards([]);
      }, 1000);

      return () => clearTimeout(timeOutId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCards]);

  const handleTapCard = (index: number) => {
    if (selectedCards.length >= 2 || selectedCards.includes(index)) return;

    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  };

  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    const newCards = cards.slice(0, 4);
    setBoard(shuffle([...newCards, ...newCards]));
    setLevel(1);
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
  };

  const handleLevelUp = () => {
    if (level >= 4) return;
    setLevel(level + 1);
  };

  const handleLevelDown = () => {
    if (level <= 1) return;
    setLevel(level - 1);
  };

  React.useEffect(() => {
    const newCards =
      level === 1
        ? cards.slice(0, (level + 1) * 2)
        : cards.slice(0, level * (level + 1));
    setBoard(shuffle([...newCards, ...newCards]));
    setMatchedCards([]);
    setSelectedCards([]);
    setScore(0);
  }, [level]);

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>
        {didPlayerWin() ? 'You won! 🎉' : 'Memory Game'}
      </Text>
      <Text style={styles.title}>Score : {score}</Text>
      <View style={styles.board}>
        {board.map((card, index) => {
          const isTurnedOver =
            selectedCards.includes(index) || matchedCards.includes(index);
          return (
            <Card
              key={index}
              onPress={() => handleTapCard(index)}
              isTurnedOver={isTurnedOver}
              level={level}>
              {card}
            </Card>
          );
        })}
      </View>
      {/* select level button */}
      <Text style={styles.title}>Level : {level}</Text>
      <View style={styles.sectionLevel}>
        <Button iconName="caret-back-outline" onPress={handleLevelDown} />
        <Button iconName="refresh-circle-outline" onPress={() => resetGame()} />
        <Button iconName="caret-forward-outline" onPress={handleLevelUp} />
      </View>

      {/* reset button */}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: 'white',
  },
  board: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  sectionLevel: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
});
