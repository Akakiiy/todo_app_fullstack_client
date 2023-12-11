import "./TodoListItem.scss"

import CloseIcon from "@mui/icons-material/Close"
import DeleteIcon from "@mui/icons-material/Delete"
import DoneIcon from "@mui/icons-material/Done"
import EditIcon from "@mui/icons-material/Edit"
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText
} from "@mui/material"
import {
  AnimatePresence,
  motion
} from "framer-motion"
import { useSelector } from "react-redux"

import {
  getDisableButtonsSelector
} from "../../../../../../../redux/selectors/todosSliceSelectors.ts"
import {
  deleteTodoThunk,
  setIsOpenAddModal,
  setTodoForEdit
} from "../../../../../../../redux/slices/todosSlice.ts"
import { useAppDispatch } from "../../../../../../../redux/store.ts"
import { formatDateTime } from "../../../../../../../shared/formatDateTime.ts"
import type { TodoType } from "../../../../../../../types/main-types/todos-types.ts"

type Props = {
  todo: TodoType
}

export const TodoListItem = ({ todo }: Props) => {
  const dispatch = useAppDispatch()
  const disableButtons = useSelector(getDisableButtonsSelector)

  const {
    id,
    progress,
    title,
    data
  } = todo

  const deleteTodoHandler = () => {
    dispatch(deleteTodoThunk(id))
  }

  const editeTodoHandler = () => {
    dispatch(setTodoForEdit(todo))
    dispatch(setIsOpenAddModal(true))
  }

  return (
    <ListItem
      className="TodoListItem"
      sx={{ boxShadow: 3 }}
      secondaryAction={
        <div className="TodoListItem__actions">
          <ListItemButton
            onClick={deleteTodoHandler}
            className="TodoListItem__actions__btn"
            disabled={disableButtons}
          >
            <DeleteIcon fontSize="small" />
          </ListItemButton>
          <ListItemButton
            onClick={editeTodoHandler}
            className="TodoListItem__actions__btn"
            disabled={disableButtons}
          >
            <EditIcon fontSize="small" />
          </ListItemButton>
        </div>
      }
    >
      <ListItemAvatar>
        <AnimatePresence>
          <motion.div
            key={progress}
            initial={{
              opacity: 0,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
          >
            {progress === 100 ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
          </motion.div>
        </AnimatePresence>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={<div className="TodoListItem__secondaryDiv">
          <div className="TodoListItem__progress">
            {`Прогресс ${progress}%`}
          </div>
          <div className="TodoListItem__time">
            {formatDateTime(data)}
          </div>
        </div>}
      />
    </ListItem>
  )
}
