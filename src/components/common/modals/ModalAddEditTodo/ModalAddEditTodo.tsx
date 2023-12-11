import "./ModalAddEditTodo.scss"

import {
  Box,
  Button,
  Modal,
  Slider,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

import { getUserEmailSelector } from "../../../../redux/selectors/loginSliceSelectors.ts"
import {
  getIsOpenAddModalSelector,
  getTodoForEditSelector
} from "../../../../redux/selectors/todosSliceSelectors.ts"
import {
  addNewTodoThunk,
  editTodoThunk,
  setIsOpenAddModal,
  setTodoForEdit
} from "../../../../redux/slices/todosSlice.ts"
import { useAppDispatch } from "../../../../redux/store.ts"

export const ModalAddEditTodo = () => {
  const dispatch = useAppDispatch()
  const isOpenAddModal = useSelector(getIsOpenAddModalSelector)
  const userEmail = useSelector(getUserEmailSelector)
  const todoForEdit = useSelector(getTodoForEditSelector)

  const handleClose = () => {
    dispatch(setIsOpenAddModal(false))
    dispatch(setTodoForEdit(null))
    formik.resetForm()
  }

  useEffect(() => {
    if (todoForEdit) {
      formik.setValues({
        title: todoForEdit.title,
        progress: todoForEdit.progress
      })
    } else {
      formik.resetForm()
    }
  }, [todoForEdit])

  const formik = useFormik({
    initialValues: {
      title: "",
      progress: 10
    },
    onSubmit: (values) => {
      if (!userEmail) return

      if (!values.title) {
        toast.error("Название не может быть путым")
        return
      }

      if (todoForEdit) {
        dispatch(editTodoThunk({
          id: todoForEdit.id,
          data: new Date(),
          title: values.title,
          progress: values.progress,
          user_email: userEmail
        }))
      } else {
        dispatch(addNewTodoThunk({
          title: values.title,
          progress: values.progress,
          user_email: userEmail,
          data: new Date()
        }))
      }

      handleClose()
    }
  })

  return (
    <Modal
      open={isOpenAddModal}
      onClose={handleClose}
    >
      <Box
        sx={{
          p: 4,
          boxShadow: 24
        }}
        className="ModalAddEditTodo"
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        >
          {
            todoForEdit
              ? "Редактирование тудушки"
              : "Добавление новой тудушки"
          }
        </Typography>
        <form
          className="ModalAddEditTodo__inputs"
          onSubmit={formik.handleSubmit}
        >
          <TextField
            id="title"
            name="title"
            label="Название"
            placeholder="Запихать все технологии в туду"
            onChange={formik.handleChange}
            value={formik.values.title}
          />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Прогресс
          </Typography>
          <Slider
            id="progress"
            name="progress"
            value={formik.values.progress}
            valueLabelDisplay="auto"
            step={10}
            marks
            min={0}
            max={100}
            onChange={formik.handleChange}
          />
          <Button
            type="submit"
            variant="outlined"
          >
            {
              todoForEdit
                ? "Изменить"
                : "Добавить"
            }
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
