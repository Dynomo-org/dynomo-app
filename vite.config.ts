import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      '@' : path.resolve(__dirname, './src'),
      '@api': path.resolve(__dirname, "./src/apis"),
      '@store': path.resolve(__dirname, "./src/stores"),
    },
  },
  plugins: [react()],
})
