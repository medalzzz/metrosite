import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        listen: resolve(__dirname, 'listen/index.html'),
      },
    },
  },
  appType: 'mpa', // Multi-page application
  server: {
    // Handle /listen without trailing slash
    middlewareMode: false,
    fs: {
      strict: false,
    },
  },
  // Rewrite /listen to /listen/ for proper routing
  plugins: [
    {
      name: 'listen-redirect',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url?.startsWith('/listen?') || req.url === '/listen') {
            req.url = req.url.replace(/^\/listen/, '/listen/');
          }
          next();
        });
      },
    },
  ],
})
