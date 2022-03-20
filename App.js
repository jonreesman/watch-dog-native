import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/screens/HomeScreen';
import TickerScreen from './src/screens/TickerScreen';

const navigator = createStackNavigator({
    Home: HomeScreen,
    TickerShow: TickerScreen,
}, {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    title: 'Watch Dog',
    headerMode: 'screen',
    headerStyle: { backgroundColor: '#161143'},
    headerTitleStyle: { color: '#FEFFFF'  },
    cardStyle: { backgroundColor: '#C5DDE1' },
  }
})

export default createAppContainer(navigator);

