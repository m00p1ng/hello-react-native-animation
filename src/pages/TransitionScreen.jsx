import React, { useState, useRef } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import {
  Transitioning,
  Transition,
} from 'react-native-reanimated'

import { Button } from '../components/Button'

const { width } = Dimensions.get('window')

const cards = [
  { style: { backgroundColor: 'red' } },
  { style: { backgroundColor: 'green' } },
  { style: { backgroundColor: 'blue' } }
]

const column = {
  id: "column",
  name: "Column",
  layout: {
    container: {
      flexDirection: 'column'
    }
  }
}

const row = {
  id: "row",
  name: "Row",
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    child: {
      flex: 0,
      width: width / 2 - 32,
    }
  }
}

const wrap = {
  id: "wrap",
  name: "Wrap",
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      flexWrap: 'wrap'
    },
    child: {
      flex: 0,
      width: width / 2 - 32,
    }
  }
}

const layouts = [column, row, wrap]
const transition = <Transition.Change durationMs={400} interpolation="easeInOut" />

export const TransitionScreen = () => {
  const ref = useRef(null)
  const [currentLayout, setCurrentLayout] = useState(layouts[0].layout)

  return (
    <View style={styles.container}>
      <Transitioning.View
        style={[styles.cardContainer, currentLayout.container]}
        {...{ ref, transition }}
      >
        {cards.map(({ style }) => (
          <View style={[styles.card, style, currentLayout.child]} />
        ))}
      </Transitioning.View>

      <Button
        style={{ marginTop: 8 }}
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition()
          }
          setCurrentLayout(layouts[0].layout)
        }}
      >
        Column
      </Button>
      <Button
        style={{ marginTop: 8 }}
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition()
          }
          setCurrentLayout(layouts[1].layout)
        }}
      >
        Row
      </Button>
      <Button
        style={{ marginTop: 8 }}
        onPress={() => {
          if (ref.current) {
            ref.current.animateNextTransition()
          }
          setCurrentLayout(layouts[2].layout)
        }}
      >
        Wrap
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
  },
  card: {
    height: 100,
    backgroundColor: 'green',
    borderRadius: 16,
  },
})