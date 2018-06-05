/*
 * @Author: rachel 
 * @Date: 2018-05-24 17:50:31 
 * @Last Modified by: rachel
 * @Last Modified time: 2018-05-24 20:43:53
 */
import React, { Component } from 'react';
import { 
  FlatList, StyleSheet, Text,
  View, SectionList, Image, PixelRatio,
  TouchableOpacity, SafeAreaView,
} from 'react-native';

import Button from '../components/Button';

export default class Home extends Component{
    static navigationOptions = {
        title: '首页'
    }

    constructor(props){
        super(props);        
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                    title={'电影'}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate('Movie', {})
                    }}
                />
                <Button 
                    title={'TODOS'}
                    onPress={() => {
                        const { navigate } = this.props.navigation;
                        navigate('Todos', {})
                    }}
                />
            </View>
        )
    }
}