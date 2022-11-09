import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp(App);

console.log(process.env)

app.use(
    createAuth0({
      domain: process.env.VUE_APP_AUTH0_DOMAIN,
      client_id: process.env.VUE_APP_AUTH0_CLIENTID,
      redirect_uri: window.location.origin
    })
  )
  .mount('#app');
// createApp(App).mount('#app')
