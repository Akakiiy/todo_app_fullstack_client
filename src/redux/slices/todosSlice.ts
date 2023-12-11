import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit"
import { toast } from "react-toastify"

import { apiMethods } from "../../api"
import type {
  CreateNewTodoType,
  EditTodoType
} from "../../types/api-types/todos-requests-type.ts"
import type { TodoType } from "../../types/main-types/todos-types.ts"

type TodosInitialState = {
  todosData: TodoType[] | null,
  isOpenAddModal: boolean,
  todoForEdit: TodoType | null,
  disableButtons: boolean
}

const todosInitialState: TodosInitialState = {
  todosData: null,
  isOpenAddModal: false,
  todoForEdit: null,
  disableButtons: false
}

const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {
    setIsOpenAddModal: (state: TodosInitialState, action) => {
      state.isOpenAddModal = action.payload
    },
    setTodoForEdit: (state, action) => {
      state.todoForEdit = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodosThunk.pending, (state: TodosInitialState) => {
        state.disableButtons = true
      })
      .addCase(addNewTodoThunk.pending, (state: TodosInitialState) => {
        state.disableButtons = true
      })
      .addCase(editTodoThunk.pending, (state: TodosInitialState) => {
        state.disableButtons = true
      })
      .addCase(deleteTodoThunk.pending, (state: TodosInitialState) => {
        state.disableButtons = true
      })
      .addCase(getAllTodosThunk.fulfilled, (state: TodosInitialState, action) => {
        state.todosData = action.payload
        state.disableButtons = false
      })
      .addCase(addNewTodoThunk.fulfilled, (state: TodosInitialState, action) => {
        state.todosData?.push(action.payload)
        state.disableButtons = false
      })
      .addCase(editTodoThunk.fulfilled, (state: TodosInitialState, action) => {
        state.todosData = state.todosData?.map(todo => {
          if (todo.id === action.payload.id) {
            return action.payload
          }
          return todo
        }) || null
        state.disableButtons = false
      })
      .addCase(deleteTodoThunk.fulfilled, (state: TodosInitialState, action) => {
        state.todosData = state.todosData?.filter(todo => todo.id !== action.payload.id) || null
        state.disableButtons = false
      })
      .addDefaultCase(() => {
      })
  }
})

export const getAllTodosThunk = createAsyncThunk(
  "todos/getAllTodosThunk",
  (userEmail: string) => {
    return toast.promise(apiMethods.getAllTodos({ userEmail }), {
      pending: "Загружаем список тудушек",
      error: "Ошибка загрузки тудушек",
      success: "Тудушки успешно загружены"
    })
  }
)

export const addNewTodoThunk = createAsyncThunk(
  "todos/createNewTodoThunk",
  (data: CreateNewTodoType) => {
    return toast.promise(apiMethods.createNewTodo(data), {
      pending: "Создаем новую тудушку",
      error: "Ошибка создания тудушки",
      success: "Создана новая тудушка"
    })
  }
)

export const editTodoThunk = createAsyncThunk(
  "todos/editTodoThunk",
  (data: EditTodoType) => {
    return toast.promise(apiMethods.editTodo(data), {
      pending: "Редактируем тудушку",
      error: "Ошибка редактирования тудушки",
      success: "Тудушка отредактирована"
    })
  }
)

export const deleteTodoThunk = createAsyncThunk(
  "todos/deleteTodoThunk",
  async (id: string) => {
    const response = await toast.promise(apiMethods.deleteTodo({ id }), {
      pending: "Удаляем тудушку",
      error: "Ошибка удаления тудушки",
      success: "Тудушка удалена"
    })
    return {
      response,
      id
    }
  }
)

const {
  reducer,
  actions
} = todosSlice

export const {
  setIsOpenAddModal,
  setTodoForEdit
} = actions

export default reducer
