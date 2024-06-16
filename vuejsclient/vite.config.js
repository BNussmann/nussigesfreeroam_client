/** @type {import('vite').UserConfig} */
import vue from '@vitejs/plugin-vue'
import dynamicImport from "vite-plugin-dynamic-import";
import path from 'path'

export default {
    // config options
    base: './',
    root: './',
    mode: 'production',
    build: {
        outDir: './output'
    },
    plugins: [vue(), dynamicImport()],
    resolve: {
        alias: [
            {find: '@', replacement: path.join(__dirname, 'src')},
            {find: /^src\//, replacement: path.join(__dirname, 'src/')},
            {find: '/root/src', replacement: path.join(__dirname, 'src')},
            {find: '~bootstrap', replacement: path.resolve(__dirname, 'node_modules/bootstrap')}
        ]
    },
    server: {
        hmr: true
    }
}