import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: ["favicon.ico", "apple-touch-icon.png"],
      manifest: {
        name: "Mi Alarma App",
        short_name: "Mi Alarma App",
        description: "Aplicacion de Gestion de Mi Alarma.",
        theme_color: "#B90022",
        background_color: "#FFFFFF",
        orientation: "portrait",
        display: "standalone",
        dir: "auto",
        lang: "es-419",
        start_url: "/inicio",
        scope: "/inicio",
        id: "http://34.238.44.88/",
        icons: [
          {
            purpose: "maskable",
            sizes: "512x512",
            src: "icon512_maskable.png",
            type: "image/png",
          },
          {
            purpose: "any",
            sizes: "512x512",
            src: "icon512_rounded.png",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 80,
    watch: {
      usePolling: true,
    },
  },
});
