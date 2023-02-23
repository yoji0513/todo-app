import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TodoState = {
  id: number
  title: string
  description: string
  status: string
  date: string
  judgeTerm: boolean
}

export type TodoListState = {
  todoList: TodoState[]
}

const initialState: TodoListState = {
  todoList: []
}

export const todoSlice = createSlice({
  name: 'todoSlice',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TodoState>) => {
      state.todoList.push(action.payload)
    },
    remove: (state, action: PayloadAction<string>) => {
      state.todoList = state.todoList.filter(todo => todo.title !== action.payload)
    },
    change: (state, action: PayloadAction<TodoState>) => {
      state.todoList.filter(todo => todo.id === action.payload.id).map(todo => (
        todo.id = action.payload.id,
        todo.title = action.payload.title,
        todo.status = action.payload.status,
        todo.description = action.payload.description,
        todo.date = action.payload.date,
        todo.judgeTerm = action.payload.judgeTerm
      ))
    }
  },
})

export const { add, remove, change } = todoSlice.actions

export default todoSlice.reducer