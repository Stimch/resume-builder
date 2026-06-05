import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

function handleModuleDirectivesPlugin() {
  return {
    name: 'handle-module-directives-plugin',
    transform(code: string, id: string) {
      if (id.includes('@vkontakte/icons')) {
        code = code.replace(/"use-client";?/g, '');
      }
      return { code };
    },
  };
}

function vkMiniAppHtmlPlugin() {
  return {
    name: 'vk-mini-app-html',
    transformIndexHtml: {
      order: 'post' as const,
      handler(html: string) {
        return html.replace(
          /<script type="module" crossorigin src="(\.\/assets\/app\.js)"><\/script>/,
          '<script src="$1"></script>',
        );
      },
    },
  };
}

export default defineConfig({
  base: './',

  plugins: [react(), handleModuleDirectivesPlugin(), vkMiniAppHtmlPlugin()],

  build: {
    outDir: 'build',
    target: 'es2015',
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        format: 'iife',
        inlineDynamicImports: true,
        entryFileNames: 'assets/app.js',
      },
    },
  },
});
