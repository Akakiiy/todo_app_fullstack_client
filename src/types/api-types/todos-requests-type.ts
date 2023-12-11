export type GetAllTodosType = {
  userEmail: string
}

export type CreateNewTodoType = {
  user_email: string,
  title: string,
  progress: number,
  data: string | Date
}
export type EditTodoType = {
  id: string
} & CreateNewTodoType

export type DeleteTodoType = {
  id: string
}
