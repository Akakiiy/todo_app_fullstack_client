import "./styles/index.scss"

import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./components/app/App.tsx"
import { store } from "./redux/store.ts"

ReactDOM.createRoot(document.getElementById("root")!)
  .render(<Provider store={store}>
    <App />
  </Provider>)
