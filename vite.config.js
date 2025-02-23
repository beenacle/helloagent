import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        callLogs: resolve(__dirname, 'call-logs.html'),
        aiVoiceCollection: resolve(__dirname, 'ai-voice-collection.html'),
        aiVoiceProfile: resolve(__dirname, 'ai-voice-profile.html'),
        setAiVoice: resolve(__dirname, 'set-ai-voice.html'),
        login: resolve(__dirname, 'login.html'),
        signUp: resolve(__dirname, 'sign-up.html'),
        help: resolve(__dirname, 'help.html'),
      },
    },
    outDir: 'dist', // Default, just confirming
  },
});