import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import react from "@vitejs/plugin-react-swc";
import eslint from 'vite-plugin-eslint';

const DEFAULT_OPTIONS = {
    test: /\.(jpe?g|png|gif|tiff|webp|svg|avif)$/i,
    exclude: undefined,
    include: undefined,
    includePublic: true,
    logStats: true,
    ansiColors: true,
    svg: {
        multipass: true,
        plugins: [
            {
                name: 'preset-default',
                params: {
                    overrides: {
                        cleanupNumericValues: false,
                        removeViewBox: false, 
                    },
                    cleanupIDs: {
                        minify: false,
                        remove: false,
                    },
                    convertPathData: false,
                },
            },
            'sortAttrs',
            {
                name: 'addAttributesToSVGElement',
                params: {
                    attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                },
            },
        ],
    },
    png: {
        quality: 100,
    },
    jpeg: {
        quality: 100,
    },
    jpg: {
        quality: 100,
    },
    tiff: {
        quality: 100,
    },
    gif: {},
    webp: {
        lossless: true,
    },
    avif: {
        lossless: true,
    },
    cache: false,
    cacheLocation: undefined,
};

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), eslint(), ViteImageOptimizer(DEFAULT_OPTIONS)],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
});
