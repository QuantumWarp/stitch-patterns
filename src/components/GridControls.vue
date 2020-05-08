<template>
  <div>
    <PrimaryInfo />

    <SectionPanel
      name="Color Palette"
      start-open
    >
      <ColorPalette />
    </SectionPanel>

    <SectionPanel name="Dimensions">
      <div class="row">
        <DimensionAdjuster />
        <RowColumnAdjuster />
      </div>
    </SectionPanel>

    <SectionPanel name="General Settings">
      <GeneralSettings />
    </SectionPanel>

    <SectionPanel name="Import and Export">
      <button onclick="document.getElementById('importInput').click();">
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
      </button>
    </SectionPanel>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PrimaryInfo from './controls/PrimaryInfo.vue';
import ColorPalette from './controls/ColorPalette.vue';
import GeneralSettings from './controls/GeneralSettings.vue';
import DimensionAdjuster from './controls/DimensionAdjuster.vue';
import RowColumnAdjuster from './controls/RowColumnAdjuster.vue';
import SectionPanel from './controls/SectionPanel.vue';
import FileHelper from '../helpers/file-helper';

export default {
  components: {
    PrimaryInfo,
    ColorPalette,
    GeneralSettings,
    DimensionAdjuster,
    RowColumnAdjuster,
    SectionPanel,
  },
  created() {
    this.initialisePattern();
  },
  methods: {
    ...mapActions(['initialisePattern']),
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
.name {
  padding: 0px 20px 10px 20px;
}
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.row > * {
  flex: 1;
}
</style>
