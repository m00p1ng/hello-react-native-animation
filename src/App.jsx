import React from 'react';
import { View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ValueClockScreen } from './pages/ValueClockScreen'
import { TransitionScreen } from './pages/TransitionScreen'
import { UseTransitionScreen } from './pages/UseTransitionScreen'
import { DarkModeScreen } from './pages/DarkModeScreen'
import { TimingScreen } from './pages/TimingScreen'
import { Button } from './components/Button'

const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={{ padding: 16 }}>
      <Button style={{ marginBottom: 16 }} onPress={() => navigation.navigate('Timing')}>
        Timing
      </Button>

      <Button style={{ marginBottom: 16 }} onPress={() => navigation.navigate('DarkMode')}>
        Dark Mode
      </Button>

      <Button style={{ marginBottom: 16 }} onPress={() => navigation.navigate('UseTransition')}>
        UseTransition
      </Button>

      <Button style={{ marginBottom: 16 }} onPress={() => navigation.navigate('Transition')}>
        Transition
      </Button>

      <Button style={{ marginBottom: 16 }} onPress={() => navigation.navigate('ValueClock')}>
        Value Clock
      </Button>
    </View>
  )
}

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ValueClock" component={ValueClockScreen} />
      <Stack.Screen name="Transition" component={TransitionScreen} />
      <Stack.Screen name="UseTransition" component={UseTransitionScreen} />
      <Stack.Screen name="DarkMode" component={DarkModeScreen} />
      <Stack.Screen name="Timing" component={TimingScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;