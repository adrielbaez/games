import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../styles/global';

interface Props {
  reload: () => void;
  pause: () => void;
  isPaused: boolean;
  children?: JSX.Element;
}

export const Header = ({reload, isPaused, pause, children}: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          reload();
        }}>
        <Icon name="reload" size={30} color={COLORS.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          pause();
        }}>
        <Icon
          name={isPaused ? 'play' : 'pause'}
          size={30}
          color={COLORS.primary}
        />
      </TouchableOpacity>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.05,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 12,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.background,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomWidth: 0,
    padding: 15,
  },
});
