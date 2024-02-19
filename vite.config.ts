import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '' : '/meetups/',
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
});
