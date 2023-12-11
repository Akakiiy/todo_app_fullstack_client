import "./TodoList.scss"

import { List } from "@mui/material"
import {
  AnimatePresence,
  motion
} from "framer-motion"
import { useSelector } from "react-redux"

import { getAllTodosSelector } from "../../../../../redux/selectors/todosSliceSelectors.ts"
import type { TabsType } from "../../../../../types/main-types/tabs-type.ts"
import { TodoListItem } from "./subComponens/TodoListItem/TodoListItem.tsx"

type Props = {
  filterTodosBy: TabsType
}

export const TodoList = ({ filterTodosBy }: Props) => {

  const todosData = useSelector(getAllTodosSelector)

  return (
    <List className="TodoList">
      <AnimatePresence>
        {
          todosData?.filter(todo => {
            switch (filterTodosBy) {
              case "all":
                return todo
              case "done":
                return todo.progress === 100
              case "not_done":
                return todo.progress !== 100
            }
          })
            .map((todo, index) => (
              <motion.div
                className="TodoList__motionDiv"
                key={todo.id}
                initial={{
                  height: 0,
                  opacity: 0
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  transition: {
                    type: "spring",
                    bounce: 0.3,
                    opacity: { delay: 0.025 }
                  }
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}
                transition={{
                  duration: 0.15,
                  type: "spring",
                  bounce: 0.3,
                  opacity: { delay: 0.03 }
                }}
              >
                <TodoListItem
                  todo={todo}
                  key={index}
                />
              </motion.div>
            ))
        }
      </AnimatePresence>
    </List>
  )
}
