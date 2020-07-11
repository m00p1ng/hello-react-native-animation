import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import Animated, {
  Value,
  block,
  cond,
  eq,
  add,
  set,
} from 'react-native-reanimated'
import { onGestureEvent, diffClamp } from 'react-native-redash'

const { width, height } = Dimensions.get("window")

const withOffset = (value, state, offset) => {
  return block([
    cond(
      eq(state, State.END),
      [set(offset, add(offset, value)), offset],
      add(offset, value)
    )
  ])
}

export const PanGestureScreen = () => {
  const state = new Value(State.UNDETERMINED)
  const translationX = new Value(0)
  const translationY = new Value(0)
  const offsetX = new Value((width - 100) / 2)
  const offsetY = new Value((height - 164) / 2)
  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY
  })
  const translateX = diffClamp(withOffset(translationX, state, offsetX), 0, width - 100)
  const translateY = diffClamp(withOffset(translationY, state, offsetY), 0, height - 164)

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