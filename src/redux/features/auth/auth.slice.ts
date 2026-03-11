import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { MeResponse } from '@/types/responses/auth/auth.responses';

interface AuthState {
  user: MeResponse | null;
  isHydrating: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isHydrating: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    bootstrapStarted: (state) => {
      state.isHydrating = true;
    },
    bootstrapFinished: (state) => {
      state.isHydrating = false;
      state.isInitialized = true;
    },
    setUser: (state, action: PayloadAction<MeResponse>) => {
      state.user = action.payload;
      state.isHydrating = false;
      state.isInitialized = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isHydrating = false;
      state.isInitialized = true;
    },
    resetAuthState: () => initialState,
  },
});

export const {
  bootstrapStarted,
  bootstrapFinished,
  setUser,
  clearUser,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
