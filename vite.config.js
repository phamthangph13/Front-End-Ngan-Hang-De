import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import svgLoader from 'vite-svg-loader'
// import legacy from '@vitejs/plugin-legacy'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }


	return defineConfig({
		plugins: [
			vue({
				// customElement: true
			}),
			vueJsx(),
			vueDevTools(),
			// legacy({
			//   targets: ['ie >= 11'],
			//   additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
			//   polyfills: ["es.array.iterator"],
			// }),
			viteStaticCopy({
				targets: [
				  {
					src: 'src/**/*.json',
					dest: 'src/locales',
				  }
				]
			}),
			svgLoader(),
	
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		server: {
			proxy: {
				'/api': {
					target: 'http://localhost:5083',
					// changeOrigin: false,
					secure: false,
					// rewriteWsOrigin: true,
					// rewrite: (path) => path.replace(/^\/api/, '')
				},
				'/swagger': {
					target: 'http://localhost:5083',
					// changeOrigin: false,
					secure: false,
					// rewriteWsOrigin: true,
					// rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		},
		css: {	
			devSourcemap: true
		},
		// build: {
		// 	rollupOptions: {
		// 		external: [/\.json$/]
		// 	}
		// }
	})
} 