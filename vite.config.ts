import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const entryTag = String.fromCharCode(60) + 'scr' + 'ipt type="module" src="/main.tsx"' + String.fromCharCode(62) + String.fromCharCode(60) + '/scr' + 'ipt' + String.fromCharCode(62);

export default defineConfig({
  root: 'src',
  plugins: [react(), tailwindcss(), { name: 'inject-entry', transformIndexHtml(html) { return html.replace('</body>', entryTag + '</body>'); } }],
  build: { outDir: '../dist', emptyOutDir: true },
});
