import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        callLogs: resolve(__dirname, 'call-logs.html'),
        aiVoiceCollection: resolve(__dirname, 'ai-voice-collection.html'),
        aiVoiceCreation: resolve(__dirname, 'ai-voice-creation.html'),
        aiVoiceProfile: resolve(__dirname, 'ai-voice-profile.html'),
        setAiVoice: resolve(__dirname, 'set-ai-voice.html'),
        login: resolve(__dirname, 'login.html'),
        signUp: resolve(__dirname, 'sign-up.html'),
        help: resolve(__dirname, 'help.html'),
        site: resolve(__dirname, 'src/site.js'),
        passwordToggle: resolve(__dirname, 'src/password-toggle.js'),
      },
      output: {
        entryFileNames: 'assets/js/[name].js', // JavaScript files in assets/js
        assetFileNames: assetInfo => {
          if (/\.(css)$/.test(assetInfo.name)) {
            return 'assets/css/[name]-[hash][extname]'; // CSS files in assets/css
          }
          if (/\.(png|jpe?g|gif|svg)$/.test(assetInfo.name)) {
            return 'assets/images/[name]-[hash][extname]'; // Images in assets/images
          }
          if (/\.(mp3)$/.test(assetInfo.name)) {
            return 'assets/audio/[name]-[hash][extname]'; // Audio files in assets/audio
          }
          return 'assets/[name]-[hash][extname]'; // Other assets
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