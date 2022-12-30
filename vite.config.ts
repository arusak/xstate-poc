import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import fullReload from 'vite-plugin-full-reload';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths(), fullReload(['src/machines/**/*'])],
  build: {
    sourcemap: true,
  },
}));
