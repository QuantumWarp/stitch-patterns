<template>
  <div class="row">
    <PanelCheckbox
      label="Mirror X"
      :value="drawingSettings.mirrorX"
      @input="updateDrawingSettings({ mirrorX: $event })"
    />

    <PanelCheckbox
      label="Mirror Y"
      :value="drawingSettings.mirrorY"
      @input="updateDrawingSettings({ mirrorY: $event })"
    />

    <PanelCheckbox
      label="Rotate"
      :value="drawingSettings.rotate"
      @input="updateDrawingSettings({ rotate: $event })"
    />
  </div>
</template>

<script>
import PanelCheckbox from '../inputs/PanelCheckbox.vue';

export default {
  components: {
    PanelCheckbox,
  },
};
</script>
