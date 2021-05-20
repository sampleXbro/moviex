import {createSlice} from '@reduxjs/toolkit'


type UserState = {
  id: string,
  name: string,
  email: string
}

const initialState: UserState = {
  id: '',
  name: '',
  email: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: any){
      const userData = action.payload
      return {...state, ...userData}
    },
    getUser(){}
  }
})

export const {setUser, getUser} = userSlice.actions

export default userSlice.reducer