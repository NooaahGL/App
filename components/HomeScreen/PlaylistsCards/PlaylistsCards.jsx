import React from 'react'
import { View, Text } from 'react-native'

import styles from './playlistscards.styles'

export default PlaylistsCards = ({children}) => {
  return (
    <View>
      <Text>{children} </Text>
    </View>
  )
}
