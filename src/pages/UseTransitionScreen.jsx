import React, { useState } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  not,
  multiply,
  interpolate,
} from 'react-native-reanimated'
import { useTransition } from 'react-native-redash'

import { Button } from '../components/Button'

const cards = [
  { style: { backgroundColor: 'red' } },
  { style: { backgroundColor: 'green' } },
  { style: { backgroundColor: 'blue' } }
]

const { width } = Dimensions.get('window')

const transformOrigin = -1 * (width / 2 - 32)

export const UseTransitionScreen = () => {
  const [toggled, setToggled] = useState(0)
  const transition = useTransition(toggled, not(toggled), toggled)

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        {cards.map(({ style }, index) => {
          const direction = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1]
          })

          const rotate = multiply(
            direction,
            interpolate(transition, {
              inputRange: [0, 1],
              outputRange: [0, Math.PI / 6]
            })
          )

          return (
            <Animated.View
              style={[
                styles.card,
                styles.overlaying,
                {
                  transform: [
                    { translateX: transformOrigin },
                    { rotate },
                    { translateX: -transformOrigin },
                  ]
                },
                style,
              ]}
            />
          )
        })}
      </View>

      <Button
        style={{ marginTop: 8 }}
        onPress={() => setToggled(toggled ^ 1)}
      >
        {toggled ? "Reset" : "Start"}
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    height: 200,
    borderRadius: 16,
  },
  overlaying: {
    marginTop: 150,
    position: "absolute",
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  }
})