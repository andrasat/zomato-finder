import React from 'react'
import { View, TextInput } from 'react-native'

import { styles } from '../../styles'

import RestaurantCard from './RestaurantCard'

export default class Main extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'List',
  }

  state = {
    searchKeyword: ''
  }

  updateText = text => {
    this.setState({
      searchKeyword: text
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <TextInput
            style={styles.searchBox}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search.."
            onChange={e => this.updateText(e.nativeEvent.text)}
          />
        </View>
        <View style={styles.cardContainer}>
          <RestaurantCard />
        </View>
      </View>
    )
  }
}