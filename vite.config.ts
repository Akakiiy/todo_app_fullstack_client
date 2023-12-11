import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/todo_app_fullstack_client",
  plugins: [react()]
})
