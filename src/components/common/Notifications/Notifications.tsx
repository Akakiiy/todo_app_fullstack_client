import "react-toastify/dist/ReactToastify.css"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import {
  Slide,
  toast,
  ToastContainer
} from "react-toastify"

import { getServerErrorsSelector } from "../../../redux/selectors/loginSliceSelectors.ts"
import { setServerErrors } from "../../../redux/slices/loginSlice.ts"
import { useAppDispatch } from "../../../redux/store.ts"

export const Notifications = () => {
  const dispatch = useAppDispatch()
  const serverErrors = useSelector(getServerErrorsSelector)

  useEffect(() => {
    if (serverErrors) {
      toast.error(serverErrors)
      dispatch(setServerErrors(null))
    }
  }, [serverErrors])

  return (
    <ToastContainer
      className="app-notifications"
      position="top-right"
      autoClose={2000}
      hideProgressBar={true}
      transition={Slide}
      newestOnTop={false}
      closeOnClick={true}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={true}
      pauseOnHover={false}
    />
  )
}
