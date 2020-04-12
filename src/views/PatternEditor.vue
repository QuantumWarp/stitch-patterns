<template>
  <div class="pattern-editor">
    <div class="side-panel">
      <div>
        Stitch Patterns
      </div>

      <GridControls />
    </div>

    <div class="main-panel">
      <GridPattern />
    </div>
  </div>
</template>

<script>
import GridControls from '../components/GridControls.vue';
import GridPattern from '../components/GridPattern.vue';

export default {
  components: {
    GridControls,
    GridPattern,
  },
};
</script>

<style scoped>
.pattern-editor {
  display: flex;
  flex-direction: row;
}
.side-panel {
  width: 400px;
  border-right: 1px solid grey;
}
</style>
