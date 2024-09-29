<template>
  <div class="primary-info">
    <PanelInput
      class="name-input"
      label="Name"
      :value="form.name"
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
        @click="loadPattern(form.name)"
      >
        Reload
      </PanelButton>

      <PanelButton @click="exportSavedPattern(form.name)">
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

<script>
import { storeToRefs } from 'pinia';
import { useRootStore } from '@/store/store';
import { usePatternStore } from '@/store/pattern/state';
import { usePersistanceStore } from '@/store/persistance/state';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';

export default {
  components: {
    PanelButton,
    PanelInput,
  },
  setup() {
    const rootStore = useRootStore();
    const { reinitialise } = rootStore;

    const patternStore = usePatternStore();
    const { dirty, patternDetails } = storeToRefs(patternStore);
    const { updatePatternDetails } = patternStore;

    const persistanceStore = usePersistanceStore();
    const { savedPatterns } = storeToRefs(persistanceStore);
    const { savePattern, loadPattern, exportSavedPattern } = persistanceStore;

    return {
      dirty,
      patternDetails,
      savedPatterns,
      savePattern,
      loadPattern,
      exportSavedPattern,
      reinitialise,
      updatePatternDetails,
    };
  },
  data: () => ({
    form: {
      name: '',
    },
  }),
  computed: {
    patternExists() {
      return Boolean(this.savedPatterns.find((x) => x.name === this.patternDetails.name));
    },
  },
  watch: {
    patternDetails: {
      immediate: true,
      handler(val) {
        this.form.name = val.name;
      },
    },
  },
};
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
