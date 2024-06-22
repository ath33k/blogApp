import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const VITE_BACKEND_URL = JSON.stringify(process.env.VITE_BACKEND_URL);
  return defineConfig({
    plugins: [react()],

    define: {
      "process.env.VITE_BACKEND_URL": JSON.stringify(
        process.env.VITE_BACKEND_URL
      ),
    },
    server: {
      proxy: {
        "/api": {
          target: VITE_BACKEND_URL,
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
