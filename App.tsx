import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import {RootNavigator} from './src/navigations/RootNavigation';

const App = () => {
  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}>
      <RootNavigator />
    </GestureHandlerRootView>
  );
};

export default App;
