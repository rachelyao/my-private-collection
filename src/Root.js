import { 
    FlatList, StyleSheet, Text,
    View, SectionList, Image, PixelRatio,
    TouchableOpacity, ActivityIndicator,
    AsyncStorage,
    StatusBar, Platform,
  } from 'react-native';

import {
    StackNavigator, TabNavigator, DrawerNavigator, SwitchNavigator,
  } from 'react-navigation';

import OnShowMovies from './pages/onShowMovies/index';
import Profile from './pages/movieDetail/index';
import MovieExplore from './pages/movieExplore/index';
import Home from './pages/home';
import Todos from './pages/todos';

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

const tabStack = TabNavigator(
    {
        Left: {
            screen: OnShowMovies
        },
        Right: {
            screen: MovieExplore
        }
    },
    {
      initialRouteName: 'Left',
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 13,
          top: -10
        },
        style: {
          height: 43,
          justifyContent: 'center',
          alignItems: 'center'
        }
      },
    }
)

export default StackNavigator(
    {
      Main: {
        screen: Home,
      },
      Movie: {
        screen: tabStack,
      },
      Profile: {
        screen: Profile
      },
      Todos: {
        screen: Todos,
      }
    },
    {
      initialRouteName: 'Main',
      navigationOptions: {
        headerStyle: {
          backgroundColor: 'cornflowerblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }
    }
  );