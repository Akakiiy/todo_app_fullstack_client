import "./App.scss"

import { useSelector } from "react-redux"

import { getTokenSelector } from "../../redux/selectors/loginSliceSelectors.ts"
import { ModalContainer } from "../common/modals/ModalContainer/ModalContainer.tsx"
import { Notifications } from "../common/Notifications/Notifications.tsx"
import { Auth } from "../pages/Auth/Auth.tsx"
import { MainContent } from "../pages/MainContent/MainContent.tsx"

const App = () => {
  const token = useSelector(getTokenSelector)

  return (
    <div className="app">
      {
        !token
          ? <Auth />
          : <MainContent />
      }
      <Notifications />
      <ModalContainer />
    </div>
  )
}

export default App
