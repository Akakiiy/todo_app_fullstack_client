import "./Profile.scss"

import {
  Box,
  Button
} from "@mui/material"
import { useSelector } from "react-redux"

import { getUserEmailSelector } from "../../../../../redux/selectors/loginSliceSelectors.ts"
import { setToken } from "../../../../../redux/slices/loginSlice.ts"
import { useAppDispatch } from "../../../../../redux/store.ts"

export const Profile = () => {
  const dispatch = useAppDispatch()
  const userEmail = useSelector(getUserEmailSelector)

  const logOut = () => {
    dispatch(setToken(null))
    localStorage.removeItem("token")
  }

  return (
    <Box
      sx={{ boxShadow: 4 }}
      className="Profile"
    >
      <div className="Profile__email">
        {userEmail}
      </div>
      <Button
        className="Profile__exit"
        variant="outlined"
        onClick={logOut}
      >
        Выход
      </Button>
    </Box>
  )
}
