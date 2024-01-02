import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react-swc";
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgr(), eslint()],
    resolve: {
        alias: [{ find: "@", replacement: "/src" }],
    },
});
