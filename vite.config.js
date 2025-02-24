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
        entryFileNames: '[name].js', // e.g., dist/site.js
        assetFileNames: 'assets/[name]-[hash][extname]', // CSS, images in dist/assets/
        // Removed chunkFileNames to disable splitting
      },
    },
    outDir: 'dist',
  },
  base: '/', // Changed from './' to '/' for absolute paths
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