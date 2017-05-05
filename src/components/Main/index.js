import React from 'react'
import { View, Text } from 'react-native'

import { styles } from '../../styles'

export default class Main extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'Zomato',
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    )
  }
}