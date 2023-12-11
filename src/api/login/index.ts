import type {
  LoginRequestType,
  LoginResponseType,
  SignUpRequestType,
  SignUpResponseType
} from "../../types/api-types/login-request-types.ts"
import { axiosInstance } from "../abstract.ts"

export const loginMethods = {
  login: async (data: LoginRequestType): Promise<LoginResponseType> => {
    const response = await axiosInstance.post("/login", data)
    return response.data
  },
  signup: async (data: SignUpRequestType): Promise<SignUpResponseType> => {
    const response = await axiosInstance.post("/signup", data)
    return response.data
  }
}
