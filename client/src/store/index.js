import { configureStore, createSlice } from '@reduxjs/toolkit';

const data = createSlice({
  name: 'auth',
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIslogin(state, action) {
      state.isLogin = action.payload;
    },
  },
});
