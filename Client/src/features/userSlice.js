import { createSlice } from '@reduxjs/toolkit';

let storedUser = null;
try {
  const userFromStorage = localStorage.getItem('user');
  storedUser = userFromStorage ? JSON.parse(userFromStorage) : null;
} catch (error) {
  console.error("Error parsing user from localStorage", error);
  storedUser = null;
}

const storedToken = localStorage.getItem('token');

const initialState = {
  user: storedUser,
  token: storedToken || null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
