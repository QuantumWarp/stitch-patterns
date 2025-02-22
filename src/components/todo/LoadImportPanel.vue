<template>
  <div class="load-import-panel">
    <div class="header">
      <span class="pattern-count">
        <span class="number">{{ savedPatterns.length }}</span>
        Saved Pattern{{ savedPatterns.length === 1 ? '' : 's' }}
      </span>

      <PanelButton
        class="import-button"
        danger
        @click="$refs.importInput.click()"
      >
        Import
      </PanelButton>

      <input
        v-if="runImport"
        ref="importInput"
        style="display: none;"
        type="file"
        @change="runImport"
      >
    </div>

    <div class="saved-patterns">
      <div
        v-for="pattern in savedPatterns"
        :key="pattern.name"
        class="saved-pattern-row"
        @click="loadPattern(pattern.name)"
      >
        <span>{{ pattern.name }}</span>

        <div
          class="actions"
          @click="$event.stopPropagation()"
        >
          <div class="icon">
            <i class="material-icons" title="Export" @click="exportSavedKnitPattern(pattern.name)">download</i>
          </div>


          <div class="icon">
            <i class="material-icons" title="Delete" @click="deletePattern(pattern.name)">delete</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef } from 'vue';
import { storeToRefs } from 'pinia';
import { usePersistanceStore } from '@/bin/store/pattern';
import PanelButton from '../inputs/PanelButton.vue';

const persistanceStore = usePersistanceStore();
const { savedPatterns } = storeToRefs(persistanceStore);
const { loadIndex, loadPattern, importPattern, deletePattern, exportSavedKnitPattern } = persistanceStore;

const importInputEl = useTemplateRef('importInput')

onMounted(() => loadIndex());

const runImport = async (e: Event) => {
  await importPattern(e as InputEvent);
  importInputEl.value!.type = 'text';
  importInputEl.value!.type = 'file';
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}

.header {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.import-button {
  width: 100px;
}

.pattern-count {
  font-size: 20px;
}

.pattern-count .number {
  font-weight: bold;
}

.saved-patterns {
  height: 311px;
  max-height: 311px;
  border: 2px solid grey;
  border-radius: 5px;
  overflow-y: scroll;
}

.saved-pattern-row {
  border-bottom: 1px solid grey;
  padding: 0px 10px;
  height: 38px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}

.saved-pattern-row:hover {
  background-color: #eee;
}

.saved-pattern-row:last-child:nth-child(n+7) {
  border-bottom: none;
}

.saved-pattern-row>span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.saved-pattern-row:hover>span {
  width: 210px;
}

.actions {
  position: absolute;
  height: 100%;
  right: 0;
  display: flex;
  align-items: stretch;
  opacity: 0;
  transition: opacity 0.2s;
}

.saved-pattern-row:hover .actions {
  opacity: 1;
  display: flex;
  align-items: center;
}

.actions>.icon {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  user-select: none;
  transition: all 0.2s;
}

.actions>*:hover {
  background-color: var(--safe-color);
  color: white;
}

.actions>*[danger]:hover {
  background-color: var(--danger-color);
  color: white;
}
</style>
