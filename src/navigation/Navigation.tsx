import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { Home, Question } from '@app/screens';
import { RootStackParamList } from '@app/types';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Question" component={Question} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
