<template>
  <div id="app">
    <PatternEditor />
  </div>
</template>

<script setup lang="ts">
import { useRootStore } from '@/store/store';
import { usePersistanceStore } from '@/store/persistance';
import { useKnittingStore } from '@/store/knitting';
import { usePatternStore } from '@/store/pattern';
import { useSettingsStore } from '@/store/settings';
import PatternEditor from '@/views/PatternEditor.vue';
import { onMounted } from 'vue';

onMounted(() => {
  const rootStore = useRootStore();
  const persistanceStore = usePersistanceStore();
  const knittingStore = useKnittingStore();
  const patternStore = usePatternStore();
  const settingsStore = useSettingsStore();

  let saveSessionTimeout: number | undefined;
  const delayedSave = () => {
    clearTimeout(saveSessionTimeout);
    saveSessionTimeout = setTimeout(() => {
      persistanceStore.saveSession();
    }, 500);
  }

  rootStore.$subscribe(delayedSave);
  persistanceStore.$subscribe(delayedSave);
  knittingStore.$subscribe(delayedSave);
  patternStore.$subscribe(delayedSave);
  settingsStore.$subscribe(delayedSave);
});
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
