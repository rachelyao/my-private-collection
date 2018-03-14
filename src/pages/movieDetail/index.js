import React, { Component } from 'react';
import { 
  FlatList, StyleSheet, Text,
  View, SectionList, Image, PixelRatio,
  WebView,
} from 'react-native';

export default class Profile extends Component{
    static navigationOptions = ({ navigation }) => {
      const { params } = navigation.state;
      
      return {
        title: params ? params.name : 'A Nested Details Screen',
      }
    };
    constructor(props){
      super(props);
    }
    render() {
      let {params} = this.props.navigation.state;

      return (
        <WebView
            automaticallyAdjustContentInsets={false}
            source={{uri: params.content}}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            decelerationRate="normal"
            startInLoadingState={true}
            scalesPageToFit={true}
        />
      )
    }
  }