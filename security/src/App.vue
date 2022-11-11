<template>
    <a href="#/">Home</a> |
    <a href="#/admin">Admin</a> |
    <a href="#/non-existent-path">Some other site</a> <br>
    <label class="switch">
        <input type="checkbox"  v-model="this.danger" >
        <span class="slider round"></span>
        Danger mode is currently: {{ danger }}
    </label>
    <component :isInDanger="danger" :is="currentView" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Admin from './components/Admin.vue'
import NotFound from './components/NotFound.vue'

const routes = {
  '/': HelloWorld,
  '/admin': Admin
}


export default {
    // Pathing code taken from: https://vuejs.org/guide/scaling-up/routing.html#simple-routing-from-scratch
  name: 'App',
  inject:['danger'],
  data() {
    return {
        danger: false,
      currentPath: window.location.hash
    }
  },
  computed: {
    currentView() {
      return routes[this.currentPath.slice(1) || '/'] || NotFound
    }
  },
  mounted() {
    window.addEventListener('hashchange', () => {
          this.currentPath = window.location.hash
        })
  }
}
</script>

<style>
  @import "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,600;1,400&display=swap";
  @import "./assets/css/bootstrap.min.css";
  @import "./assets/css/custom.css";
  @import "./assets/css/responsive.css";
</style>
