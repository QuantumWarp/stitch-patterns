<template>
  <div class="pattern-editor">
    <div class="side-panel">
      <div class="app-header">
        <img src="@/assets/wool.png">
        Stitch Patterns
      </div>

      <GridControls />

      <div class="app-footer">
        <a href="https://quantumwss.com">© 2020 - John Lowther</a>
      </div>
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
  box-shadow: 3px 0px 10px lightgray;
  display: flex;
  flex-direction: column;
}
.main-panel {
  padding: 25px;
  flex: 1;
  overflow: scroll;
}
.app-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 40px;
  font-weight: bold;
  border-bottom: 2px solid grey;
}
.app-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 30px;
}
.app-footer a {
  text-decoration: none;
}
img {
  height: 40px;
  margin-right: 10px;;
}
</style>
