import type {
  CreateNewTodoType,
  DeleteTodoType,
  EditTodoType,
  GetAllTodosType
} from "../../types/api-types/todos-requests-type.ts"
import type { TodoType } from "../../types/main-types/todos-types.ts"
import { axiosInstance } from "../abstract.ts"

export const todosMethods = {
  getAllTodos: async ({ userEmail }: GetAllTodosType): Promise<TodoType[]> => {
    const response = await axiosInstance.get(`/todos/${userEmail}`)
    return response.data
  },
  createNewTodo: async (data: CreateNewTodoType): Promise<TodoType> => {
    const response = await axiosInstance.post("/todos", data)
    return response.data
  },
  editTodo: async ({
    id,
    ...data
  }: EditTodoType): Promise<TodoType> => {
    const response = await axiosInstance.put(`/todos/${id}`, data)
    return response.data
  },
  deleteTodo: async ({ id }: DeleteTodoType) => await axiosInstance.delete(`/todos/${id}`)
}
