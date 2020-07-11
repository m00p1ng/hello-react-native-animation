import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  Value,
  block,
  set,
  Clock,
  cond,
  not,
  clockRunning,
  useCode,
  Easing,
  startClock,
  stopClock,
  timing,
  eq,
  and,
} from 'react-native-reanimated'
import { useMemoOne } from "use-memo-one";

import { Button } from '../components/Button'

const { width: wWidth } = Dimensions.get("window");
const width = wWidth * 0.8;
const { interpolate, Extrapolate } = Animated;
const size = 32;
const simpleStyles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: width,
    width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#d3d3d3",
    borderTopLeftRadius: width / 2,
    borderTopRightRadius: width / 2,
    borderBottomLeftRadius: width / 2,
  },
  bubble: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: 'red',
  },
});

const SimpleActivityIndicator = ({ progress }) => {
  const bubbles = [0, 1, 2];
  const delta = 1 / bubbles.length;

  return (
    <View style={simpleStyles.root}>
      <View style={simpleStyles.container}>
        {bubbles.map((i) => {
          const start = i * delta;
          const end = start + delta;
          const opacity = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [0.5, 1],
            extrapolate: Extrapolate.CLAMP,
          });
          const scale = interpolate(progress, {
            inputRange: [start, end],
            outputRange: [1, 1.5],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              key={i}
              style={[simpleStyles.bubble, { opacity, transform: [{ scale }] }]}
            />
          );
        })}
      </View>
    </View>
  );
};

// ================================================

const runTiming = (clock) => {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0)
  }
  const config = {
    toValue: new Value(1),
    duration: 1000,
    easing: Easing.linear,
  }

  return block([
    timing(clock, state, config),
    cond(eq(state.finished, 1), [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(config.toValue, cond(eq(state.position, 1), 0, 1))
    ]),
    state.position
  ])
}

export const TimingScreen = () => {
  const [playing, setPlaying] = useState(false)
  const { progress, clock, isPlaying } = useMemoOne(() => ({
    progress: new Value(0),
    clock: new Clock(),
    isPlaying: new Value(0)
  }), [])

  isPlaying.setValue(playing ? 1 : 0)
  useCode(block([
    cond(and(eq(isPlaying, 0), clockRunning(clock)), stopClock(clock)),
    cond(and(eq(isPlaying, 1), not(clockRunning(clock))), startClock(clock)),
    set(progress, runTiming(clock))
  ]), [])

  return (
    <View style={styles.container}>
      <SimpleActivityIndicator {...{ progress }} />
      <Button onPress={() => setPlaying(prev => !prev)}>{playing ? 'Pause' : 'Start'}</Button>
    </View>
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