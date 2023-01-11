<template>
  <div id="app">
    <vote-form></vote-form>
    <hello-world></hello-world>
  </div>
</template>

<script>
import VoteForm from "./components/VoteForm.vue";
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    VoteForm,
    HelloWorld,
  },
};
</script>

<style lang="scss">
body,
html {
  min-height: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  //margin-top: 60px;
}
</style>
