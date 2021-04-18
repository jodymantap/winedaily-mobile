import React from 'react';
import {SafeAreaView} from 'react-native';
import store from './src/redux/Store';
import { Provider } from 'react-redux'; 


import AppStack from 'navigation';

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <AppStack />
    </Provider>
  );
};

export default App;