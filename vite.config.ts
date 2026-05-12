import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = 'landing-varta-school'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? `/${repoName}/` : '/',
  plugins: [react()],
})
