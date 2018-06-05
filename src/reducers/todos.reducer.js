/*
 * @Author: rachel 
 * @Date: 2018-05-24 19:23:17 
 * @Last Modified by: rachel
 * @Last Modified time: 2018-05-24 20:36:39
 */
import { 
    ADD_TODO, SET_VISIBILITY_FILTER, TOGGLE_TODO,
    VisibilityFilters
 } from '../actions'

export const todos = (state = [], action) => {
    switch (action.type) {
      case ADD_TODO:
        return [
          ...state,
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      case TOGGLE_TODO:
        return state.map(todo =>
          (todo.id === action.id)
            ? {...todo, completed: !todo.completed}
            : todo
        )
      default:
        return state
    }
  }

export const visibilityFilter = (state = VisibilityFilters.SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}