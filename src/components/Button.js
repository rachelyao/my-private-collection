import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { 
  FlatList, StyleSheet, Text,
  View, SectionList, Image, PixelRatio,
  TouchableOpacity,
} from 'react-native';

export default class Button extends Component{
    static propTypes = {
        title: PropTypes.string,
        onPress: PropTypes.func,
    }
    static defaultProps = {
        title: '',
        onPress: () => {}
    }
    constructor(props){
      super(props);
      this.onPress = this.props.onPress.bind(this);
    }
    render() {
      return (
        <TouchableOpacity
            onPress={this.onPress}
            activeOpacity={0.8}
            style={{width: 180, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: 'pink', borderRadius: 5, margin: 5}}
            >
            <Text style={{fontSize: 15, color: 'white'}}>{this.props.title}</Text>
        </TouchableOpacity>
      )
    }
  }