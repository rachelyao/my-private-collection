/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  FlatList, StyleSheet, Text,
  View, SectionList, Image, PixelRatio,
  TouchableOpacity, SafeAreaView, Animated,
  Easing,
} from 'react-native';

import {SEEN_MOVIES} from '../../constants/StoreKey';
import LocalStore from '../../utils/Storage';

import MovieItem from './components/movieItem';

function getHighRateMoviesAsync(pageStart) {
  pageStart = pageStart === 0 ? 0 : (pageStart * 50 + 1);
  return new Promise((resolve) => {
    fetch('https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=50&page_start=' + pageStart)
    .then((response) => response.json())
    .then((responseJson) => {
      resolve(responseJson)
    })
    .catch((error) => {
      resolve({})
    });
  })
}

export async function storeSeenMovie(id) {
  let storedVal = await LocalStore.getValue(SEEN_MOVIES) || [];
  if(storedVal.indexOf(id) < 0){
    storedVal.push(id)
    LocalStore.setValue(SEEN_MOVIES, storedVal);
  }
}

export default class MovieExplore extends Component {
    static navigationOptions = {
        title: '豆瓣高分'
      };

  constructor(props){
    super(props);
    this.state = {
      movies: [],
      pageIndex: 0,
    };
  }

  async _getHighRateMoviesAsync() {
    let pageStart = this.state.pageIndex;
    let movies = await getHighRateMoviesAsync(pageStart);
    let seenMovieIDs = await LocalStore.getValue(SEEN_MOVIES) || [];
    if(movies.subjects && movies.subjects.length > 0){
      let newArr = movies.subjects;
      newArr = newArr.map(item => ({
        ...item,
        seen: seenMovieIDs.indexOf(item.id) > -1,
      }))
      this.setState(prevState => ({
          pageIndex: prevState.pageIndex + 1,
          movies: prevState.movies.concat(newArr)
      }))
    }else{
      this.setState(prevState => ({
          pageIndex: prevState.pageIndex + 1
      }))
    }
  }

  toMovieDetail(item) {
    const { navigate } = this.props.navigation;
    navigate(
      'Profile', 
      { 
          name: item.title,
          content: item.url,
      }
    );
  }

  _renderItem = ({item}) => {
    return (
      <MovieItem 
        movie={item}
        pressItem={(item) => this.toMovieDetail(item)}
      />
    )
  }

  _keyExtractor = (item, id) => id;

  _onEndReached = () => {
    this._getHighRateMoviesAsync();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          initialNumToRender={10}
          extraData={this}
          data={this.state.movies}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          onEndReached={this._onEndReached}
          onEndReachedThreshold={2}
          ItemSeparatorComponent={() =>{return (<View style={{height: 1, backgroundColor: '#ececec', marginHorizontal: 10, justifyContent: 'center'}}/>)}}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  }
})
