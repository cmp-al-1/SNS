import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
  server: { port: 3000, proxy: { '/alerts': 'http://localhost:3001', '/ingest': 'http://localhost:3001' } }
});
