import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { theme } from './themereducer';

export const store = configureStore({
  reducer: {
    theme: theme.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
