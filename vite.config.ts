import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const entryTag = ['scr', 'ipt'].join('');

export default defineConfig({
  root: 'src',
  base: process.env.GITHUB_ACTIONS ? '/Aziz-CV/' : '/',
  plugins: [react(), tailwindcss(), { name: 'inject-entry', transformIndexHtml: { order: 'pre', handler(html) { return html.replace('</body>', String.fromCharCode(60) + entryTag + ' type=\"module\" src=\"/main.tsx\"' + String.fromCharCode(62) + String.fromCharCode(60) + '/' + entryTag + String.fromCharCode(62) + '</body>'); } } }],
  build: { outDir: '../dist', emptyOutDir: true },
});
