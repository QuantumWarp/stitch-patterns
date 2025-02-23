<template>
  <RouterLink to="/admin/edit">
    <PanelButton>
      New
    </PanelButton>
  </RouterLink>

    <PanelButton @click="$refs.importInput.click()">
      Import
    </PanelButton>

  <RouterLink to="/admin/knit">
    <PanelButton>
      Knit Session
    </PanelButton>
  </RouterLink>
  
  <input
    v-if="runImport"
    ref="importInput"
    style="display: none;"
    type="file"
    @change="runImport"
  >
</template>

<script setup lang="ts">
import { useTemplateRef } from 'vue';
import PanelButton from '../inputs/PanelButton.vue';
import { importPattern } from '../../helpers/persistance-helper.ts';

const importInputEl = useTemplateRef('importInput')

const runImport = async (e: Event) => {
  await importPattern(e as InputEvent);
  importInputEl.value!.type = 'text';
  importInputEl.value!.type = 'file';
};
</script>
