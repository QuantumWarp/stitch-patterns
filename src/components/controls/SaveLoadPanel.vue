<template>
  <div class="save-load-panel">
    <PanelButton>
      Import
    </PanelButton>

    <div>
      <div
        v-for="pattern in savedPatterns"
        :key="pattern.name"
        @click="loadPattern(pattern.name)"
      >
        {{ pattern.name }}
      </div>
    </div>
    <!-- <button onclick="document.getElementById('importInput').click();">
      Import
    </button>
    <input
      id="importInput"
      style="display: none;"
      type="file"
      @change="importRaw"
    >

    <button @click="exportRaw()">
      Export
    </button>

    <button @click="exportToKnit()">
      Export To Knit
    </button> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PanelButton from '../inputs/PanelButton.vue';
import FileHelper from '../../helpers/file-helper';

export default {
  components: {
    PanelButton,
  },
  computed: {
    ...mapGetters(['savedPatterns']),
  },
  created() {
    this.loadIndex();
  },
  methods: {
    ...mapActions([
      'loadIndex',
      'loadPattern',
      'updateSettings',
    ]),
    async importRaw(e) {
      const { name, pattern } = await FileHelper.importRaw(e);
      this.name = name;
      this.updatePattern(pattern);
    },
    exportRaw() { FileHelper.exportRaw(this.name, this.pattern); },
    exportToKnit() { FileHelper.exportToKnit(this.name, this.pattern); },
  },
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
</style>
