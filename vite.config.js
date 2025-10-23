import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Only import vueDevTools conditionally in dev mode
export default defineConfig(({ mode }) => {
    const plugins = [vue()]

    if (mode === 'development') {
        try {
            // Dynamically import to avoid localStorage issues in Node
            const vueDevTools = require('vite-plugin-vue-devtools').default
            plugins.push(vueDevTools())
        } catch (err) {
            console.warn('⚠️ Skipping vue-devtools plugin:', err.message)
        }
    }

    return {
        plugins,
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            },
        },
    }
})
