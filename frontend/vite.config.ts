import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
	optimizeDeps: {
		exclude: ["@telegram-apps/sdk"], // чтобы не сканировал esbuild
	},
	build: {
		rollupOptions: {
			external: ["@telegram-apps/sdk"], // исключить из бандла
		},
	},
})
