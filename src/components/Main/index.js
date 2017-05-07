import React from 'react'
import { View, TextInput, Picker } from 'react-native'
import { Container } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { styles } from '../../styles'
import { fetchRest } from '../../actions'

import RestaurantCard from './RestaurantCard'

class Main extends React.Component {

  static navigationOptions = {
    tabBarLabel: 'List',
  }

  state = {
    searchKeyword: '',
    city: 'Jakarta'
  }

  updateText = text => {
    this.setState({
      searchKeyword: text
    })
  }

  selectCity = city => {
    this.setState({
      city
    })
  }

  render() {
    const { city, searchKeyword } = this.state
    const { fetchRest } = this.props
    return (
      <Container>
        <View style={styles.searchContainer}>
          <Picker
            style={styles.picker}
            selectedValue={city}
            onValueChange={city => this.selectCity(city)}>
            <Picker.Item label="Jakarta" value="Jakarta" />
            <Picker.Item label="Bandung" value="Bandung" />
            <Picker.Item label="Bali" value="Bali" />
          </Picker>
          <TextInput
            style={styles.searchBox}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Search.."
            value={searchKeyword}
            onChange={e => this.updateText(e.nativeEvent.text)}
            onSubmitEditing={() => fetchRest(city,searchKeyword)}
          />
        </View>
        <RestaurantCard city={city} searchKeyword={searchKeyword}/>
      </Container>
    )
  }
}

Main.propTypes = {
  fetchRest: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => ({
  fetchRest: (city,query) => dispatch(fetchRest(city,query))
})

export default connect(null, mapDispatchToProps)(Main)
