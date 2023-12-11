import "./Actions.scss"

import {
  Tab,
  Tabs
} from "@mui/material"
import Button from "@mui/material/Button"
import { useSelector } from "react-redux"

import { getDisableButtonsSelector } from "../../../../../redux/selectors/todosSliceSelectors.ts"
import { setIsOpenAddModal } from "../../../../../redux/slices/todosSlice.ts"
import { useAppDispatch } from "../../../../../redux/store.ts"
import type { TabsType } from "../../../../../types/main-types/tabs-type.ts"

type Props = {
  filterTodosBy: TabsType,
  setFilterTodosBy: (tabValue: TabsType) => void
}

export const Actions = ({
  filterTodosBy,
  setFilterTodosBy
}: Props) => {
  const dispatch = useAppDispatch()
  const disableButtons = useSelector(getDisableButtonsSelector)

  const handleTabChange = (_: any, value: TabsType) => {
    setFilterTodosBy(value)
  }

  const openAddModal = () => {
    dispatch(setIsOpenAddModal(true))
  }

  return (
    <div className="Actions">
      <Tabs
        value={filterTodosBy}
        onChange={handleTabChange}
        aria-label="basic tabs example"
      >
        <Tab
          label="Все"
          value="all"
        />
        <Tab
          label="Сделанные"
          value="done"
        />
        <Tab
          label="Не сделанные"
          value="not_done"
        />
      </Tabs>
      <Button
        variant="contained"
        className="Actions__btn_add"
        onClick={openAddModal}
        disabled={disableButtons}
      >
        Добавить
      </Button>
    </div>
  )
}
