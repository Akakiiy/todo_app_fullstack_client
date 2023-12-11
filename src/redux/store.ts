import {
  combineReducers,
  configureStore
} from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"

import loginReducer from "./slices/loginSlice.ts"
import todosReducer from "./slices/todosSlice.ts"

const rootReducer = combineReducers({
  loginReducer,
  todosReducer
})
export type RootReducer = ReturnType<typeof rootReducer>

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch
