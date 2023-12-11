import { loginMethods } from "./login"
import { todosMethods } from "./todos"

export const apiMethods = {
  ...loginMethods,
  ...todosMethods
}
