import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: "https://blog-app-backend-ivory-ten.vercel.app",
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost:8080/",
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
