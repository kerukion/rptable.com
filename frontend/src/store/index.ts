import { configureStore } from '@reduxjs/toolkit';
import * as _actions from './actions';
import { campaign } from './campaign';

export const actions = _actions.default;
export const store = configureStore({
  reducer: {
    campaign,
  },
});
export type RootState = ReturnType<typeof store.getState>
