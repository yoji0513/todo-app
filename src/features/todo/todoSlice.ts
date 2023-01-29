import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TodoListState = {
  todoList: TodoState[]
}

export type TodoState = {
  id: number
  title: string
  description: string
  status: string
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
    remove: (state, action: PayloadAction<number>) => {
      state.todoList = state.todoList.filter(todo => todo.id !== action.payload)
    }
  },
})

export const { add, remove } = todoSlice.actions

export default todoSlice.reducer