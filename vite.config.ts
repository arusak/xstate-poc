import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  plugins: [react(), tsconfigPaths()],
  build: {
    sourcemap: true,
  },
  css: {
    modules: {
      generateScopedName:
        mode === 'production'
          ? '[name]__[local]___[hash:base64:5]'
          : (name, filename) => {
              const match = filename.match(/([^/]+)\.module\.css$/);
              const componentName = match && match.length > 1 ? match[1] : 'UnknownComponent';
              const rand = String(Math.random()).substring(2, 5);
              return `${componentName}_${name}_${rand}`;
            },
    },
  },
}));
