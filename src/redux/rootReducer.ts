import { combineReducers } from '@reduxjs/toolkit'
import todosReducer from './todosSlices';

export const rootReducer = combineReducers({
    todos: todosReducer
})

export type RootState = ReturnType<typeof rootReducer>