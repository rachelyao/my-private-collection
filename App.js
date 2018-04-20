/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
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

import OnShowMovies from './src/pages/onShowMovies/index';
import Profile from './src/pages/movieDetail/index';
import MovieExplore from './src/pages/movieExplore/index';

import Button from './src/components/Button';

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

const RootStack = StackNavigator(
  {
    Main: {
      screen: tabStack,
    },
    Profile: {
      screen: Profile
    },
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default class App extends Component {  
  render() {  
    return (  
      <RootStack />  
    );  
  }  
}