import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path, { resolve } from "path"

export default defineConfig({
    // Set the root to "public" because that"s where index.html lives
    // root: "pages",
    plugins: [react(), tailwindcss()],
    server: {
        fs: {
            // Allow Vite to serve files from the level above "public" (where src is)
            allow: [".."] 
        }, 
        port: 4000, 
        open: "/pages/index.html"
    },
    resolve: {
        alias: {
            // This maps the "@" symbol to your "src" directory
            "@": resolve(__dirname, "./src"),
        },
    },
    build: {
        // When root is changed, you must tell Vite to output 
        // the build relative to the actual project root
        outDir: "../dist",
        emptyOutDir: true,
        rollupOptions: {
            input: {
                main: resolve(__dirname, "pages/index.html"),
            },
        },
    } 
})
