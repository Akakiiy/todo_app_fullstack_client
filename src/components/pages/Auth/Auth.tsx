import "./Auth.scss"

import {
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography
} from "@mui/material"
import { useFormik } from "formik"
import { useState } from "react"
import { toast } from "react-toastify"

import {
  loginThunk,
  signUpThunk
} from "../../../redux/slices/loginSlice.ts"
import { useAppDispatch } from "../../../redux/store.ts"

export const Auth = () => {
  const dispatch = useAppDispatch()
  const [tabsValue, setTabsValue] = useState<"login" | "register">("login")

  const handleTabChange = (_: any, value: "login" | "register") => {
    setTabsValue(value)
    formik.resetForm()
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: ""
    },
    onSubmit: (values) => {
      if (tabsValue === "login") {
        dispatch(loginThunk({
          email: values.email,
          password: values.password
        }))
      } else {
        if (values.password !== values.confirm_password) {
          toast.error("Пароли не совпадают")
          return
        }

        dispatch(signUpThunk({
          email: values.email,
          password: values.password
        }))
      }
    }
  })

  return (
    <Box
      sx={{
        p: 4,
        boxShadow: 24
      }}
      className="Auth"
    >
      <Typography
        variant="h6"
        component="h2"
      >
        {
          tabsValue === "login"
            ? "Вход"
            : "Регистрация"
        }
      </Typography>
      <form
        className="Auth__inputs"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          id="email"
          name="email"
          label="Логин или email"
          placeholder="rnd@gmial.com"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <TextField
          id="password"
          name="password"
          type="password"
          label="Пароль"
          placeholder="***********"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        {
          tabsValue === "register"
            ? <TextField
              id="confirm_password"
              name="confirm_password"
              type="password"
              label="Повторите пароль"
              placeholder="***********"
              onChange={formik.handleChange}
              value={formik.values.confirm_password}
            />
            : null
        }
        <Button
          type="submit"
          variant="outlined"
        >
          {
            tabsValue === "login"
              ? "Вход"
              : "Зарегистрироваться"
          }
        </Button>
      </form>
      <Tabs
        className="Auth__tabs"
        value={tabsValue}
        onChange={handleTabChange}
      >
        <Tab
          label="Регистрация"
          value="register"
        />
        <Tab
          label="Вход"
          value="login"
        />
      </Tabs>
    </Box>
  )
}
