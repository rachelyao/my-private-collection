/*
 * @Author: rachel 
 * @Date: 2018-05-24 19:23:14 
 * @Last Modified by: rachel
 * @Last Modified time: 2018-05-24 20:41:21
 */
import { combineReducers } from 'redux';
import {
    todos,
    visibilityFilter
} from './todos.reducer'

export default combineReducers({
  todos,
  visibilityFilter,
})