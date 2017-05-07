import React from 'react'
import { View, Image, Text, ListView, ActivityIndicator, Modal, Button } from 'react-native'
import { Container, Content, Card, CardItem, Left, Body, H2 } from 'native-base'
import MapView from 'react-native-maps'
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
    modalVisible: false,
    restData: null
  }

  _setModalVisible(val, data) {
    this.setState({
      modalVisible: val,
      restData: data
    })
  }

  renderItems(data) {
    return (
      <Content>
        <Card style={{flex:0}}>
          <CardItem>
            <Left>
              <H2>{data.restaurant.name}</H2>
            </Left>
            <Button
              onPress={() => this._setModalVisible(true, data)}
              title="Show Detail"
              color="#F44336"
              style={{margin: 10}}
            />
          </CardItem>
          <CardItem>
            <Body style={{alignItems: 'center'}}>
              <Image
                source={{uri: data.restaurant.featured_image}}
                style={{width:400, height: 300}}
              />
            </Body>
          </CardItem>
        </Card>
      </Content>
    )
  }

  render() {
    const { restaurants, loginData, addRestaurant } = this.props
    const { restData } = this.state
    const ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2})
    return (
      <Container>
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
      { restData !== null &&
      <View style={{flex:1,marginTop:45}}>
        <Modal
          animationType={"slide"}
          visible={this.state.modalVisible}
          onRequestClose={() => null}>
            <Card>
              <CardItem>
                <Left>
                  <Body>
                    <H2>{restData.restaurant.name}</H2>
                    <Text>{restData.restaurant.cuisines} <Text style={{color:'#C62828'}}>{restData.restaurant.user_rating.aggregate_rating}</Text></Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={{uri: restData.restaurant.featured_image}}
                    style={{width: '100%', height: 250}}
                  />
                  <Text>Price average for two: {restData.restaurant.currency} {restData.restaurant.average_cost_for_two}</Text>
                  <Text>Address: {restData.restaurant.location.address}</Text>
                </Body>
              </CardItem>
              <CardItem>
                <View style={styles.mapContainer}>
                  <MapView
                    style={styles.map}
                    initialRegion={{
                      latitude: Number(restData.restaurant.location.latitude),
                      longitude: Number(restData.restaurant.location.longitude),
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.05
                    }}>
                  </MapView>
                </View>
              </CardItem>
              <CardItem>
                <Button
                  onPress={() => this._setModalVisible(false, null)}
                  title="Go Back"
                  color="#F44336"
                  style={{margin: 10}}
                />
              { loginData !== null &&
                <Button
                  onPress={() => addRestaurant(restData.restaurant,loginData.token)}
                  title="Add to Wishlist"
                  color="rgba(255,121,94,0.6)"
                  style={{margin: 10}}
                />
              }
              </CardItem>
            </Card>
        </Modal>
      </View>
      }
    </Container>
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
  loginData: null
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