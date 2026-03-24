import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'mailx-sdk': path.resolve(__dirname, '../mailx-sdk/src/index.ts')
    }
  }
})
