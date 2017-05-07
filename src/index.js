import { TabNavigator } from 'react-navigation'

import { Main, User } from './components'
import { styles } from './styles'

const App = TabNavigator(
  {
    Main: {screen: Main},
    User: {screen: User}
  },
  {
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    initialRouteName: 'Main',
    tabBarOptions: {
      showIcon: true,
      activeTintColor: '#FFF',
      style: styles.header
    }
  }
)

export default App