/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { 
  FlatList, StyleSheet, Text,
  View, SectionList, Image, PixelRatio,
  TouchableOpacity, SafeAreaView,
} from 'react-native';

import Button from '../../components/Button';

function getMoviesFromApiAsync() {
  return new Promise((resolve) => {
    fetch('https://api.douban.com/v2/movie/in_theaters??apikey=0b2bdeda43b5688921839c8ecb20399b&city=上海&start=0&count=100')
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      resolve(responseJson)
    })
    .catch((error) => {
      console.error(error);
      resolve({})
    });
  })
}

export default class OnShowMovies extends Component {
    static navigationOptions = {
        title: '正在热映'
      };

  constructor(props){
    super(props);
    this.state = {
      movies: []
    };
    this._getMoviesFromApiAsync();

    fetch('https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=20&page_start=0')
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson);
    })
  }

  async _getMoviesFromApiAsync() {
    let movies = await getMoviesFromApiAsync();
    if(movies.total > 0 && movies.subjects && movies.subjects.length > 0){
      this.setState({
        movies: movies.subjects.sort((a, b) => {
          return b.rating.average - a.rating.average
        })
      })
    }
  }

  renderItem(item) {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => {
            navigate(
                'Profile', 
                { 
                    name: item.title,
                    content: item.alt,
                }
            );
        }}
        activeOpacity={0.8}
        key={item.id}
        style={{flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ececec'}}>
          <Image 
            resizeMode={'contain'}
            style={{width: 85, height: 110}}
            source={{uri: item.images.small}}/>
          <View style={{marginLeft: 15, flex: 1}}>
            <Text style={styles.item}>{item.title}</Text>
            {(item.rating.average > 0) ? (
              <Text style={styles.rating}>豆瓣评分：<Text style={{color: (item.rating.average >= 7 ? 'red' : (item.rating.average < 6 ? '#666' : 'forestgreen'))}}>{item.rating.average}</Text></Text>
            ) : (
              <Text style={styles.rating}>暂无评分</Text>
            )}
            <Text style={styles.desc}>{`导演：${item.directors[0].name}`}</Text>
            {!!item.casts && item.casts.length > 0 && (
              <Text style={styles.desc}>{`主演：${item.casts.map(cast => cast.name).join(' / ')}`}</Text>
            )}
          </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={this.state.movies}
          renderItem={({item}) => this.renderItem(item)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
  item: {
    fontSize: 18,
  },
  rating: {
    fontSize: 13,
    color: '#666666',
    marginVertical: 10
  },
  desc: {
    fontSize: 12,
    color: '#666666',
    marginTop: 5,
    lineHeight: 15,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
})
