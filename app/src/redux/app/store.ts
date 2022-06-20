import { configureStore } from "@reduxjs/toolkit";
import * as Sentry from "@sentry/react";
import thunk from "redux-thunk";
import customizeReducer from "../features/themeCustomization/customizerSlice";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import buildingsReducer from "../features/buildings/buildingsSlice";
import userReducer from "../features/auth/userSlice";
import eventReducer from "../features/buildings/eventsSlice";

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  actionTransformer: (action) => {
    // if (action.type === UserType.USER_LOGIN_REQUEST) {
    //   return null;
    // }
    // if (action.type === UserType.USER_REGISTER_REQUEST) {
    //   return {
    //     ...action,
    //     password: null,
    //   };
    // }
    return action;
  },
});

const preloadedState = {};

const reducer = {
  custumize: customizeReducer,
  user: userReducer,
  buildings: buildingsReducer,
  events: eventReducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      // .concat(logger)
      .concat(thunk),
  // .concat(buildingApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  enhancers: [sentryReduxEnhancer],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
