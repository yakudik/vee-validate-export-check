import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { defineConfig } from 'vite'

import pckg from './package.json'

const cwd = process.cwd()

// https://vitejs.dev/config/
export default defineConfig({
    root: './',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    build: {
        sourcemap: true,
        assetsInlineLimit: 0,
        lib: {
            entry: resolve(cwd, 'src/index.ts'),
            fileName: 'mlab-ui',
            formats: ['es']
        },
        rollupOptions: {
            output: {
                exports: 'named',
                assetFileNames(chunkInfo) {
                    return chunkInfo.name === 'style.css'
                        ? 'mlab-ui.css'
                        : chunkInfo.name || ''
                }
            },
            external: [
                ...Object.keys(pckg.peerDependencies)
            ]
        }
    }
})
