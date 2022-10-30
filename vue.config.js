const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: process.env.NODE_ENV === 'production'
  ? '/production-sub-path/'
  : '/',
//   server: {
//     proxy: {
//       "/api": {
//         target: "http://localhost/",
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, ""),
//       },
//     },
//   },
//   devServer: {
// 	proxy: 'http://localhost/*',
// 	},
	// configureWebpack: {
    //     plugins: [
    //         new Dotenv()
    //     ],
    //     devServer: {
    //         headers: { "Access-Control-Allow-Origin": "*" }
    //     }
    // }
})
