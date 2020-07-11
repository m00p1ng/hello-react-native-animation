import React from 'react'
import { View, StyleSheet } from 'react-native'
import Animated, {
  Clock,
  Extrapolate,
  Value,
  add,
  cond,
  eq,
  interpolate,
  useCode,
  not,
  set,
  startClock,
} from 'react-native-reanimated'

import { Button } from '../components/Button'

export const ValueClockScreen = () => {
  const clock = new Clock();
  const startAnimation = new Value(0)
  const startTime = new Value(0)
  const duration = 1000
  const endTime = add(startTime, duration)
  const from = new Value(0)
  const to = new Value(1)
  const opacity = interpolate(clock, {
    inputRange: [startTime, endTime],
    outputRange: [from, to],
    extrapolate: Extrapolate.CLAMP
  })

  useCode(() => [cond(eq(startAnimation, 1), [
    startClock(clock),
    set(from, opacity),
    set(to, not(to)),
    set(startTime, clock),
    set(startAnimation, 0)
  ])], [])

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, { opacity }]} />
      </View>

      <Button
        onPress={() => startAnimation.setValue(1)}
      >
        Toggle
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    height: 200,
    backgroundColor: 'green',
    borderRadius: 16,
  },
})