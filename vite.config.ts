import { sveltekit } from '@sveltejs/kit/vite'
import { defineConfig } from 'vite'
// import { resolve } from 'path'

export default defineConfig({
	plugins: [sveltekit()]
	// server: { port: 5173 },
	// alias: {
	// 	$lib: resolve('./src/lib'),
	// 	$components: resolve('./src/components'),
	// 	$services: resolve('./src/services'),
	// 	$routes: resolve('./src/routes'),
	// 	$static: resolve('./src/static'),
	// 	$ionic: resolve('./src/lib/ionic')
	// }
})
