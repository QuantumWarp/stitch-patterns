<template>
  <div class="grid-controls">
    <PrimaryInfo />

    <SectionPanel
      name="Colour Palette"
      :open="openPanels.includes('color')"
      @update:open="updatePanelState({ panel: 'color', open: $event})"
    >
      <ColorPalette />
    </SectionPanel>

    <SectionPanel
      name="Dimensions"
      :open="openPanels.includes('dimensions')"
      @update:open="updatePanelState({ panel: 'dimensions', open: $event})"
    >
      <div class="row">
        <DimensionAdjuster />
        <RowColumnAdjuster />
      </div>
    </SectionPanel>

    <SectionPanel
      name="General Settings"
      :open="openPanels.includes('general')"
      @update:open="updatePanelState({ panel: 'general', open: $event})"
    >
      <GeneralSettings />
    </SectionPanel>

    <SectionPanel
      name="Knitting"
      :open="openPanels.includes('knitting')"
      @update:open="updatePanelState({ panel: 'knitting', open: $event})"
    >
      <div class="row">
        <KnitSession />
        <KnitStitchPanel />
      </div>
    </SectionPanel>

    <SectionPanel
      name="Load &amp; Import"
      :open="openPanels.includes('loadImport')"
      @update:open="updatePanelState({ panel: 'loadImport', open: $event})"
    >
      <LoadImportPanel />
    </SectionPanel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PrimaryInfo from './controls/PrimaryInfo.vue';
import ColorPalette from './controls/ColorPalette.vue';
import GeneralSettings from './controls/GeneralSettings.vue';
import DimensionAdjuster from './controls/DimensionAdjuster.vue';
import RowColumnAdjuster from './controls/RowColumnAdjuster.vue';
import KnitSession from './controls/KnitSession.vue';
import KnitStitchPanel from './controls/KnitStitchPanel.vue';
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
    KnitStitchPanel,
    LoadImportPanel,
    SectionPanel,
  },
  computed: {
    ...mapGetters(['openPanels']),
  },
  created() {
    this.loadSession();
  },
  methods: {
    ...mapActions([
      'loadSession',
      'updatePanelState',
    ]),
  },
};
</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}
.row > * {
  flex: 1;
}
.grid-controls {
  overflow-y: auto;
  flex: 1;
}
section:last-child {
  border-bottom: 2px solid grey;
}
</style>
