import React from 'react'
import { Image, Text, ListView, ActivityIndicator, TouchableHighlight, Modal, Button } from 'react-native'
import { Content, Card, CardItem, Left, Body, H2 } from 'native-base'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { fetchRest, addRestaurant } from '../../actions'
import { styles } from '../../styles'

class RestaurantCard extends React.Component {

  componentWillMount() {
    const { fetchRest, city, searchKeyword } = this.props
    fetchRest(city, searchKeyword)
  }

  state = {
    modalVisible: false
  }

  _setModalVisible(val) {
    this.setState({modalVisible: val})
  }

  renderItems(data) {
    const { loginData, addRestaurant } = this.props
    return (
      <Content>
        <Card style={{flex:0}}>
          <CardItem>
            <Left>
              <H2>{data.restaurant.name}</H2>
            </Left>
          </CardItem>
          <CardItem>
            <Body style={{alignItems: 'center'}}>
              <TouchableHighlight onPress={() => this._setModalVisible(true)}>
                <Image
                  source={{uri: data.restaurant.featured_image}}
                  style={{width:'85%', height: 300}}
                />
              </TouchableHighlight>
            </Body>
          </CardItem>
        </Card>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => null}>
          <Content>
            <Card style={{flex:0}}>
              <CardItem>
                <Button
                  onPress={() => this._setModalVisible(false)}
                  title="Go Back"
                  color="#F44336"
                  style={{margin: 10}}
                />
              { loginData !== {} &&
                <Button
                  onPress={() => addRestaurant(data.restaurant,loginData.token)}
                  title="Add to Wishlist"
                  color="rgba(255,121,94,0.6)"
                  style={{margin: 10}}
                />
              }
              </CardItem>
            </Card>
          </Content>
        </Modal>
      </Content>
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
  addRestaurant: PropTypes.func.isRequired,
  fetchRest: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  searchKeyword: PropTypes.string,
  loginData: PropTypes.object
}

RestaurantCard.defaultProps = {
  searchKeyword: '',
  loginData: {}
}

const mapStateToProps = state => ({
  restaurants: state.restaurants,
  loginData: state.loginData
})

const mapDispatchToProps = dispatch => ({
  fetchRest: (city,query) => dispatch(fetchRest(city,query)),
  addRestaurant: (restaurant, token) => dispatch(addRestaurant(restaurant, token))
})

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantCard)