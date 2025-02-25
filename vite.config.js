import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        callLogs: resolve(__dirname, 'call-logs.html'),
        aiVoiceCollection: resolve(__dirname, 'voice-collection.html'),
        aiVoiceCreation: resolve(__dirname, 'voice-creations.html'),
        aiVoiceProfile: resolve(__dirname, 'voice-profiles.html'),
        setAiVoice: resolve(__dirname, 'set-voice.html'),
        login: resolve(__dirname, 'login.html'),
        signUp: resolve(__dirname, 'sign-up.html'),
        help: resolve(__dirname, 'help.html'),
        site: resolve(__dirname, 'src/site.js'),
        passwordToggle: resolve(__dirname, 'src/password-toggle.js'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js',
        assetFileNames: assetInfo => {
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/\.(mp3)$/.test(assetInfo.name)) {
            return 'assets/audio/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    outDir: 'dist',
  },
  base: './',
  plugins: [
    {
      name: 'move-scripts-to-body',
      transformIndexHtml(html) {
        const externalScriptRegex = /<script\b(?![^>]*type="module")[^>]*>([\s\S]*?)<\/script>/gi;
        const moduleScriptRegex = /<script\b[^>]*type="module"[^>]*>([\s\S]*?)<\/script>/gi;
        const externalScripts = html.match(externalScriptRegex) || [];
        const moduleScripts = html.match(moduleScriptRegex) || [];
        let modifiedHtml = html.replace(externalScriptRegex, '').replace(moduleScriptRegex, '');
        const allScripts = externalScripts.concat(moduleScripts).join('\n');
        modifiedHtml = modifiedHtml.replace('</body>', allScripts + '\n</body>');
        return modifiedHtml;
      },
    },
  ],
});
