import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    plugins: [react()],

    server: {
      proxy: {
        "/api": {
          target: process.env.VITE_BACKEND_URL,
          changeOrigin: true,
          secure: true,
        },
      },
    },
  });
};
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
