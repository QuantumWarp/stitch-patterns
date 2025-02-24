<template>
  <div class="primary-actions">
    <div class="create">
      <RouterLink to="/admin/edit">
        <PanelButton>
          New
        </PanelButton>
      </RouterLink>

      <PanelButton @click="importInputEl!.click()">
        Import
      </PanelButton>
    </div>

    <div class="session" v-if="sessionInProgress">
      <span>You have a knitting session in progress.</span>

      <RouterLink to="/admin/knit">
        <PanelButton>
          Resume
        </PanelButton>
      </RouterLink>
    </div>
    
    <input
      v-if="runImport"
      ref="importInput"
      style="display: none;"
      type="file"
      multiple
      @change="runImport"
    >
  </div>
</template>

<script setup lang="ts">
import { computed, useTemplateRef } from 'vue';

import PanelButton from '@/components/inputs/PanelButton.vue';

import { importPatterns } from '@/helpers/persistance.helper.ts';
import { getKnittingSession } from '@/storage/knitting.storage.ts';

const importInputEl = useTemplateRef('importInput');
const knitSession = computed(() =>  getKnittingSession());
const emit = defineEmits<{ refresh: [] }>();
const sessionInProgress = Boolean(knitSession.value?.rowIndex || knitSession.value?.stitchIndex);

async function runImport(e: Event) {
  await importPatterns(e as InputEvent);
  emit('refresh');
};
</script>

<style scoped>
.primary-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.create {
  padding: 30px;
  display: flex;
  gap: 6px;
}
.session {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px
}
</style>