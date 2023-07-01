import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type TodoStatusType = {
  status: string
}

export type TodoStatusList  ={
  statusList: TodoStatusType[]
}

const initialState: TodoStatusList = {
  statusList: [{
    status: 'Todo'
  },
  {
    status: 'Doing'
  },
  {
    status: 'Done'
  },
  ]
}

export const statusSlice = createSlice({
  name: 'statusSlice',
  initialState,
  reducers: {
    addStatus: (state, action: PayloadAction<TodoStatusType>) => {
      const filterStatusList = state.statusList.filter(item => item !== action.payload)
      if(filterStatusList.length) state.statusList.push(action.payload)
    }
  },
})

export const { addStatus } = statusSlice.actions

export default statusSlice.reducer