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
  spring,
  stopClock,
  not,
  add,
} from 'react-native-reanimated'
import { onGestureEvent, clamp } from 'react-native-redash'

const { width, height } = Dimensions.get("window")

const withSpring = (value, gestureState, offset, velocity, snapPoint) => {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity,
    position: new Value(0),
    time: new Value(0)
  }
  const config = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: snapPoint,
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
        spring(clock, state, config),
        cond(state.finished, finishDecay)
      ],
      [set(state.finished, 0), set(state.position, add(offset, value))]
    ),
    state.position,
  ])
}

export const SpringScreen = () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const velocityX = new Value(0)
  const velocityY = new Value(0)
  const snapX = (width - 100) / 2
  const snapY = (height - 164) / 2
  const offsetX = new Value(snapX)
  const offsetY = new Value(snapY)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  })
  const translateX = clamp(
    withSpring(translationX, state, offsetX, velocityX, snapX),
    0,
    width - 100,
  )
  const translateY = clamp(
    withSpring(translationY, state, offsetY, velocityY, snapY),
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