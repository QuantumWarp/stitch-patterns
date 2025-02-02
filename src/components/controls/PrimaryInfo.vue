<template>
  <div class="primary-info">
    <PanelInput
      class="name-input"
      label="Name"
      :value="name"
      @input="updatePatternDetails({ name: $event })"
    />

    <div class="buttons">
      <PanelButton
        v-if="dirty"
        :danger="patternExists"
        @click="savePattern"
      >
        Save
      </PanelButton>

      <PanelButton
        v-if="patternExists && dirty"
        danger
        @click="loadPattern(name)"
      >
        Reload
      </PanelButton>

      <PanelButton @click="exportSavedPattern()">
        Backup
      </PanelButton>

      <PanelButton
        danger
        @click="reinitialise"
      >
        Reset
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useRootStore } from '@/store/store';
import { usePatternStore } from '@/store/pattern/state';
import { usePersistanceStore } from '@/store/persistance/state';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';
import { computed, ref, watch } from 'vue';

const rootStore = useRootStore();
const { reinitialise } = rootStore;

const patternStore = usePatternStore();
const { dirty, patternDetails } = storeToRefs(patternStore);
const { updatePatternDetails } = patternStore;

const persistanceStore = usePersistanceStore();
const { savedPatterns } = storeToRefs(persistanceStore);
const { savePattern, loadPattern, exportSavedPattern } = persistanceStore;

const name = ref('');

const patternExists = computed(() => {
  return Boolean(savedPatterns.value.find((x) => x.name === patternDetails.value.name));
});

watch(patternDetails, (newVal) => {
  name.value = newVal.name;
});
</script>

<style scoped>
.primary-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}

.buttons> :not(:last-child) {
  margin-right: 5px;
}
</style>
