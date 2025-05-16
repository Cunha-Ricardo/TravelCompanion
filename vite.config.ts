import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: "dist/public", // Diretório de saída
    emptyOutDir: true, // Limpa o diretório antes do build
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"], // Divida bibliotecas grandes em chunks separados
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Ajuste o limite de chunk para evitar o aviso
  },
});
