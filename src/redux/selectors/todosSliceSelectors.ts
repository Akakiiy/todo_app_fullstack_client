import type { RootState } from "../store.ts"

export const getAllTodosSelector = (state: RootState) => state.todosReducer.todosData
export const getTodoForEditSelector = (state: RootState) => state.todosReducer.todoForEdit
export const getIsOpenAddModalSelector = (state: RootState) => state.todosReducer.isOpenAddModal
export const getDisableButtonsSelector = (state: RootState) => state.todosReducer.disableButtons
