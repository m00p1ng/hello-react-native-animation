import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
  Value,
  block,
  cond,
  eq,
  and,
  set,
  Clock,
  clockRunning,
  startClock,
  decay,
  stopClock,
  not,
  add,
} from 'react-native-reanimated'
import { onGestureEvent, diffClamp } from 'react-native-redash'

const { width, height } = Dimensions.get("window")

const withDecay = (value, gestureState, offset, velocity) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0)
  }
  const config = {
    deceleration: 0.998
  }
  const decayIsInterrupted = eq(gestureState, State.BEGIN)
  const finishDecay = [
    set(offset, state.position),
    stopClock(clock)
  ]

  return block([
    cond(decayIsInterrupted, finishDecay),
    cond(
      eq(gestureState, State.END),
      [
        cond(and(not(clockRunning(clock)), not(state.finished)), [
          set(state.time, 0),
          startClock(clock)
        ]),
        decay(clock, state, config),
        cond(state.finished, finishDecay)
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position,
  ])
}

export const DecayScreen = () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const velocityX = new Value(0)
  const velocityY = new Value(0)
  const offsetX = new Value((width - 100) / 2)
  const offsetY = new Value((height - 164) / 2)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  })
  const translateX = diffClamp(
    withDecay(translationX, state, offsetX, velocityX),
    0,
    width - 100,
  )
  const translateY = diffClamp(
    withDecay(translationY, state, offsetY, velocityY),
    0,
    height - 164,
  )

  return (
    <View style={styles.container}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{
          transform: [{ translateX }, { translateY }]
        }}>
          <View style={styles.card} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 100,
    width: 100,
    backgroundColor: 'green',
    borderRadius: 16,
  },
})