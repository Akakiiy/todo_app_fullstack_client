import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { apiMethods } from "../../api"
import type {
  LoginRequestType,
  SignUpRequestType
} from "../../types/api-types/login-request-types.ts"

type LoginInitialState = {
  userEmail: string | null,
  token: string | null,
  serverErrors: string | null
}

const loginInitialState: LoginInitialState = {
  userEmail: "rnd@test.com",
  token: localStorage.getItem("token"),
  serverErrors: null
}

const authSlice = createSlice({
  name: "login",
  initialState: loginInitialState,
  reducers: {
    setToken: (state: LoginInitialState, action) => {
      state.token = action.payload
    },
    setServerErrors: (state: LoginInitialState, action) => {
      state.serverErrors = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.rejected, (state: LoginInitialState) => {
        state.serverErrors = "Ошибка сервера"
      })
      .addCase(loginThunk.fulfilled, (state: LoginInitialState, action) => {
        const {
          token,
          email,
          error
        } = action.payload
        if (error) {
          state.serverErrors = error
        } else {
          state.token = token
          localStorage.setItem("token", token)
          state.userEmail = email
          toast.success("Добро пожаловать")
        }
      })
      .addCase(signUpThunk.rejected, (state: LoginInitialState) => {
        state.serverErrors = "Ошибка сервера"
      })
      .addCase(signUpThunk.fulfilled, (state: LoginInitialState, action) => {
        const {
          token,
          email,
          error
        } = action.payload
        if (error) {
          state.serverErrors = error
        } else {
          state.token = token
          localStorage.setItem("token", token)
          state.userEmail = email
          toast.success("Добро пожаловать")
        }
      })
      .addDefaultCase(() => {
      })
  }
})

export const loginThunk = createAsyncThunk(
  "login/loginThunk",
  (data: LoginRequestType) => {
    return toast.promise(apiMethods.login(data), {
      error: "Произошла ошибка входа",
      pending: "Идет вход"
    })
  }
)

export const signUpThunk = createAsyncThunk(
  "login/signUpThunk",
  (data: SignUpRequestType) => {
    return toast.promise(apiMethods.signup(data), {
      pending: "Идет регистрация",
      error: "Регистрация не прошла"
    })
  }
)

const {
  reducer,
  actions
} = authSlice

export const {
  setToken,
  setServerErrors
} = actions

export default reducer
