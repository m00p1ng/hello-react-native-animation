import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export const Button = ({ children, onPress, style }) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={1}
    style={[
      {
        height: 48,
        backgroundColor: '#2E86C1',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
      },
      style
    ]}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
      }}
    >
      {children}
    </Text>
  </TouchableOpacity>
)