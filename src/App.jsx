import React from 'react';
import { View } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ValueClockScreen } from './pages/ValueClockScreen'
import { TransitionScreen } from './pages/TransitionScreen'
import { Button } from './components/Button'

const HomeScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={{ padding: 16 }}>
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
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;