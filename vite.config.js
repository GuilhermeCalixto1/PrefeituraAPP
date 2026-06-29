import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3001
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        cadastrar: resolve(__dirname, 'src/pages/cadastrar.html'),
        consultar: resolve(__dirname, 'src/pages/consultar.html'),
        alterar: resolve(__dirname, 'src/pages/alterar.html'),
        excluir: resolve(__dirname, 'src/pages/excluir.html'),
      },
    },
  },
});