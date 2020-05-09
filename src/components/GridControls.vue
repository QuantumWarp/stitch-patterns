<template>
  <div class="grid-controls">
    <PrimaryInfo />

    <SectionPanel
      name="Colour Palette"
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

    <SectionPanel name="Knitting">
      <KnitSession />
    </SectionPanel>

    <SectionPanel name="Load &amp; Import">
      <LoadImportPanel />
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
import KnitSession from './controls/KnitSession.vue';
import LoadImportPanel from './controls/LoadImportPanel.vue';
import SectionPanel from './controls/SectionPanel.vue';

export default {
  components: {
    PrimaryInfo,
    ColorPalette,
    GeneralSettings,
    DimensionAdjuster,
    RowColumnAdjuster,
    KnitSession,
    LoadImportPanel,
    SectionPanel,
  },
  created() {
    this.loadSession();
  },
  methods: {
    ...mapActions(['loadSession']),
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.row > * {
  flex: 1;
}
.grid-controls {
  overflow-y: scroll;
  flex: 1;
}
</style>
