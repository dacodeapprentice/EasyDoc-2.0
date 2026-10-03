import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function html2canvasOklchPlugin(): Plugin {
  return {
    name: 'html2canvas-oklch-fix',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (id.includes('html2canvas')) {
        return code
          .replace(
            /throw new Error\s*\(\s*["']Attempting to parse an unsupported color function[^)]*\);?/g,
            'return 0x0f172aff;'
          )
          .replace(
            /throw new Error\s*\(\s*["']Unsupported color[^)]*\);?/g,
            'return 0x0f172aff;'
          );
      }
      return null;
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [html2canvasOklchPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
