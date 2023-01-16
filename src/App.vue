<template>
  <div id="app">
    <vote-form></vote-form>
  </div>
</template>

<script>
import VoteForm from "./components/VoteForm.vue";

export default {
  name: "App",
  components: {
    VoteForm,
  },
};
</script>
