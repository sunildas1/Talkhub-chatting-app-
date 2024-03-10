import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const activeuserSlice = createSlice({
  name: 'activeuser',
  initialState,
  reducers: {
    active_user: (state, action) => {
      state.value = action.payload
    },
  },
})


export const { active_user } = activeuserSlice.actions

export default activeuserSlice.reducer