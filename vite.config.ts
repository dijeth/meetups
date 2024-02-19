import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: '/meetups/',
  plugins: [vue(), splitVendorChunkPlugin()],

  resolve: {
    alias: [
      {
        find: '@',
        replacement: fileURLToPath(new URL('./src', import.meta.url)),
      },
      { find: /^\/(assets|icons)\/(.*)/, replacement: '/src/$1/$2' },
    ],
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://brief-sun-arithmetic.glitch.me',
        changeOrigin: true,
      },
    },
  },
});
