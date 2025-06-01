import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk('user/logoutUser', async (_, thunkAPI) => {
  try {
    await axios.post('http://localhost:5000/api/auth/logout',{}, { withCredentials: true });
    return null;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message || "Logout failed");
  }
});


const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    token: localStorage.getItem('token') || null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));  

    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    })
  }
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
