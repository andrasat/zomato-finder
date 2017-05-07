import React from 'react'
import { Image, Text, ListView, ActivityIndicator } from 'react-native'
import { Content, Card, CardItem, Left, Body, H2 } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchRest } from '../../actions'
import { styles } from '../../styles'

class RestaurantCard extends React.Component {

  componentWillMount() {
    const { fetchRest, city, searchKeyword } = this.props
    fetchRest(city, searchKeyword)
  }

  renderItems(data) {
    return (
      <Card style={{flex:0}}>
        <CardItem>
          <Left>
            <H2>{data.restaurant.name}</H2>
          </Left>
        </CardItem>
        <CardItem>
          <Body style={{alignItems: 'center'}}>
            <Image
              source={{uri: data.restaurant.featured_image}}
              style={{width:'85%', height: 300}}
            />
          </Body>
        </CardItem>
      </Card>
    )
  }

  render() {
    const { restaurants } = this.props
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    return (
      <Content>
      { restaurants.length <= 0 ?
        <Content>
          <ActivityIndicator
            animating={true}
            color="#F44336"
            style={styles.loadingIcon}
            size="large" />
          <Text style={styles.loadingText}>Fetching data...</Text>
        </Content>
        :
          <ListView
            dataSource={ds.cloneWithRows(restaurants)}
            renderRow={(rowData) => this.renderItems(rowData)}
            style={{width: '100%'}}
          />
      }
    </Content>
    )
  }
}

RestaurantCard.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchRest: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  searchKeyword: PropTypes.string
}

RestaurantCard.defaultProps = {
  searchKeyword: ''
}

const mapStateToProps = state => ({
  restaurants: state.restaurants
})

const mapDispatchToProps = dispatch => ({
  fetchRest: (city,query) => dispatch(fetchRest(city,query))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantCard)