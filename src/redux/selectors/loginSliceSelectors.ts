import type { RootState } from "../store.ts"

export const getTokenSelector = (state: RootState) => state.loginReducer.token
export const getUserEmailSelector = (state: RootState) => state.loginReducer.userEmail
export const getServerErrorsSelector = (state: RootState) => state.loginReducer.serverErrors
