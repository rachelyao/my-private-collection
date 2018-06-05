/*
 * @Author: rachel 
 * @Date: 2018-05-24 20:32:40 
 * @Last Modified by: rachel
 * @Last Modified time: 2018-05-24 21:00:26
 */
import React, { Component } from 'react';
import { 
  FlatList, StyleSheet, Text,
  View, SectionList, Image, PixelRatio,
  TouchableOpacity, SafeAreaView,
} from 'react-native';
import {connect} from 'react-redux';
import { bindActionCreators } from "redux";

import Button from '../components/Button';
import { addTodo, toggleTodo, VisibilityFilters } from '../actions';

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
      case VisibilityFilters.SHOW_ALL:
        return todos
      case VisibilityFilters.SHOW_COMPLETED:
        return todos.filter(t => t.completed)
      case VisibilityFilters.SHOW_ACTIVE:
        return todos.filter(t => !t.completed)
      default:
        throw new Error('Unknown filter: ' + filter)
    }
  }
  
class Todos extends Component{
    static navigationOptions = {
        title: 'TODOS'
    }
    
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Button 
                    title={'add todo'}
                    onPress={() => this.props.addTodo((Math.random(0,1) * 100).toFixed(2))}
                />
                {
                    this.props.todos.map((item) => {
                        return (
                            <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={() => this.props.toggleTodo(item.id)}
                                key={item.id}>
                                <Text style={{textDecorationLine: item.completed ? 'line-through' : 'none'}}>{item.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return bindActionCreators({
        addTodo,
        toggleTodo,
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Todos)