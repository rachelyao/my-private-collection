import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    View, Text, TouchableOpacity, Image,
    StyleSheet,
} from 'react-native';

import {storeSeenMovie} from '../index';

export default class MovieItem extends React.PureComponent{
    static propTypes = {
        pressItem: PropTypes.func.isRequired,
        movie: PropTypes.object.isRequired
    }

    constructor(props) {
        super(props);
        this.state = {
            seen: props.movie.seen
        }
    }

    _pressMovieSeen = () => {
        this.setState(prevState => ({
            seen: !prevState.seen
        }), () => storeSeenMovie(this.props.movie.id))
    }
    
    _pressItem = () => {
        this.props.pressItem(this.props.movie);
    }

    render() {
        const {cover, title, rate} = this.props.movie;
        const {seen} = this.state;
        return (
            <TouchableOpacity
              onPress={this._pressItem}
              activeOpacity={0.8}
              style={{flexDirection: 'row', padding: 10}}>
                <Image 
                  resizeMode={'contain'}
                  style={{width: 85, height: 110}}
                  source={{uri: cover}}/>
                <View style={{marginLeft: 15}}>
                  {!seen ? (
                    <Text style={styles.item}>{title}</Text>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.item}>{title}</Text>
                      <View style={{paddingHorizontal: 3, paddingVertical: 2,  borderRadius: 4, backgroundColor: 'powderblue', marginLeft: 5, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 11, color: 'white'}}>看过</Text>
                      </View>
                    </View>
                  )}
                  {(rate > 0) ? (
                    <Text style={styles.rating}>豆瓣评分：<Text style={{color: (rate >= 7 ? 'red' : (rate < 6 ? '#666' : 'forestgreen'))}}>{rate}</Text></Text>
                  ) : (
                    <Text style={styles.rating}>暂无评分</Text>
                  )}
                  <View style={{flexDirection: 'row'}}>
                    {!seen && (
                      <TouchableOpacity 
                        onPress={this._pressMovieSeen}
                        activeOpacity={0.8}
                        style={{paddingHorizontal: 6, paddingVertical: 4,  borderRadius: 6, borderColor: 'limegreen', borderWidth: 1, marginRight: 10}}>
                          <Text style={{fontSize: 12, color: 'limegreen'}}>看过</Text>
                      </TouchableOpacity>
                    )}
                    {false && (
                      <View style={{paddingHorizontal: 6, paddingVertical: 4,  borderRadius: 6, borderColor: 'limegreen', borderWidth: 1}}>
                        <Text style={{fontSize: 12, color: 'limegreen'}}>想看</Text>
                      </View>
                    )}
                  </View>
                </View>
            </TouchableOpacity>
          )
    }
}

const styles = StyleSheet.create({
    item: {
      fontSize: 18,
    },
    rating: {
      fontSize: 13,
      color: '#666666',
      marginVertical: 10
    }
  })