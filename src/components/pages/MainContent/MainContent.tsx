import "./MainContent.scss"

import { Box } from "@mui/material"
import { motion } from "framer-motion"
import {
  useEffect,
  useState
} from "react"
import { useSelector } from "react-redux"

import { getUserEmailSelector } from "../../../redux/selectors/loginSliceSelectors.ts"
import { getAllTodosThunk } from "../../../redux/slices/todosSlice.ts"
import { useAppDispatch } from "../../../redux/store.ts"
import {
  animationSlideFormLeft
} from "../../../styles/animationVariants/listItemAnimationVariant/animationSlideFormLeft.ts"
import type { TabsType } from "../../../types/main-types/tabs-type.ts"
import { Actions } from "./subComponents/Actions/Actions.tsx"
import { Profile } from "./subComponents/Profile/Profile.tsx"
import { TodoList } from "./subComponents/TodoList/TodoList.tsx"

export const MainContent = () => {
  const dispatch = useAppDispatch()

  const userEmail = useSelector(getUserEmailSelector)

  useEffect(() => {
    if (userEmail) {
      dispatch(getAllTodosThunk(userEmail))
    }
  }, [userEmail])

  const [filterTodosBy, setFilterTodosBy] = useState<TabsType>("all")

  return (
    <Box className="MainContent">
      <Profile />
      <motion.h2
        className="MainContent__title"
        initial="hidden"
        animate="visible"
        transition={{
          delay: .5
        }}
        variants={animationSlideFormLeft}
      >
        todo list
      </motion.h2>
      <Actions
        filterTodosBy={filterTodosBy}
        setFilterTodosBy={setFilterTodosBy}
      />
      <TodoList filterTodosBy={filterTodosBy} />
    </Box>
  )
}
