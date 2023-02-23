import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../features/todo/todoSlice'
import statusReducer from '../features/todo/statusSlice'

export const store = configureStore({
  reducer: {
    addTodo: todoReducer,
    addStatus: statusReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch