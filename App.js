import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {AppLoading} from 'expo';
import * as Font from 'expo-font';

import Header from './components/Header';

import StartScreen from './screens/StartScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

export default function App() {

  const [userNum, setUserNum] = useState();
  const [GRounds, setGRounds] = useState(0);
  const [dataLoader,setDataLoader] = useState(false)

  if(!dataLoader){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setDataLoader(true)} onError={(console.log('font loading error'))} />
  }

  const configNewGameHandler = () => {
    setGRounds(0);
    setUserNum(null)
  }

  const startGameHandler = (selectedNum) => {
    setUserNum(selectedNum);
    setGRounds(0);
  }

  const gameOverHandler = numOfRounds => {
    setGRounds(numOfRounds);
  }

  let content = <StartScreen onStart={startGameHandler} />;

  if (userNum && GRounds <= 0) {
    content = <GameScreen userChoice={userNum} onGameOver={gameOverHandler} />
  } else if (GRounds > 0) {
    content = <GameOverScreen RoundNum={GRounds} userNum={userNum} onAgain={configNewGameHandler} />;
  }

  return (
    <View style={styles.rootView}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  rootView: {
    flex: 1
  }
});
