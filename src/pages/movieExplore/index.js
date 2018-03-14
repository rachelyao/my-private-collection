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

function getHighRateMoviesAsync() {
  return new Promise((resolve) => {
    fetch('https://movie.douban.com/j/search_subjects?type=movie&tag=%E8%B1%86%E7%93%A3%E9%AB%98%E5%88%86&sort=recommend&page_limit=100&page_start=0')
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

export default class MovieExplore extends Component {
    static navigationOptions = {
        title: '豆瓣高分'
      };

  constructor(props){
    super(props);
    this.state = {
      movies: [],
      bounceAnim: new Animated.Value(0),
    };
    this._getHighRateMoviesAsync();
  }

  async _getHighRateMoviesAsync() {
    let movies = await getHighRateMoviesAsync();
    if(movies.subjects && movies.subjects.length > 0){
      this.setState({
        movies: movies.subjects
      })
    }
  }

  startAnimation() {
      Animated.sequence([
        Animated.delay(2000),
        Animated.spring(
            this.state.bounceAnim,
            {
                toValue: 1,
                friction: 5,    // 摩擦力，默认为7
                tension: 40,    // 张力，默认40
                // speed: 12,
                // bounciness: 8,
                useNativeDriver: true
            }
        )
      ]).start();
    
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
                    content: item.url,
                }
            );
        }}
        activeOpacity={0.8}
        key={item.id}
        style={{flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#ececec'}}>
          <Image 
            resizeMode={'contain'}
            style={{width: 85, height: 110}}
            source={{uri: item.cover}}/>
          <View style={{marginLeft: 15}}>
            <Text style={styles.item}>{item.title}</Text>
            {(item.rate > 0) ? (
              <Text style={styles.rating}>豆瓣评分：<Animated.Text style={{color: (item.rate >= 7 ? 'red' : (item.rate < 6 ? '#666' : 'forestgreen'))}}>{item.rate}</Animated.Text></Text>
            ) : (
              <Text style={styles.rating}>暂无评分</Text>
            )}
            {item.playable && (
                <Animated.View 
                    style={{padding: 6, borderRadius: 6, backgroundColor: 'limegreen', alignSelf: 'flex-start',
                    transform: [  // scale, scaleX, scaleY, translateX, translateY, rotate, rotateX, rotateY, rotateZ
                        {scale: this.state.bounceAnim}  // 缩放 
                    ]}}
                    onLayout={() => this.startAnimation()}>
                    <Text style={{fontSize: 13, color: 'white'}}>可播放</Text>
                </Animated.View>
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
