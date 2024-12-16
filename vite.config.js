import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ["react", "react-dom"], // example of manual chunking common libraries
                    // Add other libraries or modules as needed
                },
            },
        },
        chunkSizeWarningLimit: 600, // Increase if absolutely necessary, but better to keep chunks small
    },
});
