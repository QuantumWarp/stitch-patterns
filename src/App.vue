<template>
  <div id="app">
    <PatternEditor />
  </div>
</template>

<script>
import PatternEditor from './views/PatternEditor.vue'

export default {
  components: {
    PatternEditor,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<style scoped>

</style>
