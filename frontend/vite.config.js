import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import EnvironmentPlugin from 'vite-plugin-environment'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin(['VITE_API_LOCATION'])
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        login: resolve(__dirname, "login.html"),
        register: resolve(__dirname, "register.html"),
        user_requests: resolve(__dirname, "user_requests.html"),
        new_request: resolve(__dirname, "new_request.html")
      }
    },
    outDir: 'server/dist',
    emptyOutDir: true
  },
  base: "./"
})
