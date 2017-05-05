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
      activeTintColor: 'rgba(255,52,60,0.6)',
      style: styles.header
    }
  }
)

export default App