import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';

const initialState: themeReduxDetails = {
  state: false,
};

export const theme = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeDetails: (state, action: PayloadAction<themeReduxDetails>) => {
      state.state = action.payload.state;
    },
  },
});

export const { themeDetails } = theme.actions;
export const selectThemeDetails = (state: RootState) => state.theme;

export default theme.reducer;

interface themeReduxDetails {
  state: boolean;
}
