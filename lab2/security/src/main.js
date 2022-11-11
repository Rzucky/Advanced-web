import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')

// app.config.globalProperties.danger = false

// let app = createApp(  provide:{
// 	danger:123
//   }).mount('#app')

// createApp({
//   provide:{
//     danger:false
//   }

// }).$mount('#app')

// const app = createApp(App)
// // app.config.globalProperties.$danger = false
// app.$mount('#app')