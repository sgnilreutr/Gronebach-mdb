import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import viteTsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tailwindcss(), react(), viteTsconfigPaths()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    target: 'esnext',
    sourcemap: true,
  },
})
