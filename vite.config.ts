/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test:{

  },
  resolve: {
    alias: {
      '@api': path.resolve(__dirname, './src/api'), // Apunta a la carpeta de assets
    },
  },
})
