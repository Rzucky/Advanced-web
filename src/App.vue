<template>
    <div class="px-2">
        <div class="containerBG">
            <HelloWorld msg="Welcome to Your Vue.js App"/>
        </div>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.containerBG {
  background-image: url(~@/assets/green.webp);
    /* Full height */
    height: 100%;

    /* Center and scale the image nicely */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.newImg {
    background-image: url('~@/assets/football.jpg');
}
</style>
