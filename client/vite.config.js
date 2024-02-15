import {
	defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: []
		}
	},
	server: {
		port: 8080, //默认启动的端口号
		open: true, //自动打开
		cors: true //允许跨域
	}
})