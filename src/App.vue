<template>
  <div id="app">
    <PatternEditor />
  </div>
</template>

<script>
import PatternEditor from './views/PatternEditor.vue';

export default {
  components: {
    PatternEditor,
  },
  created() {
    const sessionMutationTypes = [
      'setTime',
      'setStartStitch',
      'setKnitSettings',
      'setSelectedStitch',
      'setPatternDetails',
      'setPattern',
      'updatePoint',
      'setOpenPanels',
      'setSettings',
    ];
    let saveSessionTimeout;
    this.$store.subscribe((mutation) => {
      if (sessionMutationTypes.includes(mutation.type)) {
        clearTimeout(saveSessionTimeout);
        saveSessionTimeout = setTimeout(() => {
          this.$store.dispatch('saveSession');
        }, 500);
      }
    });
  },
};
</script>

<style>
:root {
  --safe-color: #4CAF50;
  --danger-color: rgb(255, 83, 83);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html, body, #app, .pattern-editor {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-track {
    background-color: #ebebeb;
    -webkit-border-radius: 10px;
    border-radius: 10px;
}
::-webkit-scrollbar-thumb {
    -webkit-border-radius: 10px;
    border-radius: 10px;
    background: #919191;
}
</style>
