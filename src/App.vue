<template>
  <div id="app">
    <RouterView  />
  </div>
</template>

<script setup lang="ts">;
import { RouterView } from 'vue-router';
</script>

<style>
:root {
  --safe-color: #4CAF50;
  --danger-color: rgb(255, 83, 83);
  --color-background: rgb(240, 240, 240);
  --color-text: #000;
}
:root #app.dark {
  --color-text: #fff;
  --color-background: #212121;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text);
  background-color: var(--color-background);
}

html,
body,
#app,
.pattern-editor {
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
