import path from 'path'
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        lib: {
            entry:'src/lib/index.js',
            name: 'kendo-filter-string-parser',
            fileName: (format) => `kendo-filter-string-parser.${format}.js`
        }
    },
    rollupOptions: {
        // externalize deps that shouldn't be bundled
        // into your library
        external: [
            // 'lodash', 'moment'
        ],
        output: {
            // Provide global variables to use in the UMD build
            // for externalized deps
            globals: {
                // moment: 'moment'
            }
        }
    }
})
