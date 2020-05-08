<template>
  <div class="pattern-editor">
    <div class="side-panel">
      <h1>
        <img src="@/assets/wool.png" />
        Stitch Patterns
      </h1>

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
  align-items: stretch;
}
.side-panel {
  width: 400px;
  border-right: 1px solid grey;
}
.main-panel {
  padding: 20px;
  flex: 1;
  overflow: scroll;
}
h1 {
  display: flex;
  flex-direction: row;
  align-items: center;
}
img {
  height: 40px;
  margin-right: 10px;;
}
</style>
