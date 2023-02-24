import {StyleSheet, Platform} from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: 'white',
  },
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: '#0f172a',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
});

export const COLORS = {
  primary: '#4D455D',
  secondary: '#84cc16',
  tertiary: '#eab308',
  background: '#F5E9CF',
};
