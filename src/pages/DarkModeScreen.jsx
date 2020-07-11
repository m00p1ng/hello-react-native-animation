import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {
  Transitioning,
  Transition,
} from 'react-native-reanimated'

import { Button } from '../components/Button'

const transition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Out type="fade" durationMs={400} />
  </Transition.Together>
)

export const DarkModeScreen = () => {
  const ref = useRef(null)
  const [darkMode, setDarkMode] = useState(false)

  return (
    <Transitioning.View style={styles.container} {...{ ref, transition }}>
      {darkMode && (
        <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'black' }} />
      )}
      <View style={styles.content}>
        <Text style={[styles.text, { color: darkMode ? 'white' : 'black' }]}>
          Hello
        </Text>
      </View>

      <Button
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition()
          }
          setDarkMode(prev => !prev)
        }}
      >
        Click me
      </Button>
    </Transitioning.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
  }
})