import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import Navigation from './src/navigation/Navigation';
import { SPLASH_ANIMATION } from '@app/assets';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <LottieView
          style={styles.lottie}
          source={SPLASH_ANIMATION}
          autoPlay
          loop={false}
          onAnimationFinish={() => setIsLoading(false)}
        />
      ) : (
        <Navigation />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});

export default App;
