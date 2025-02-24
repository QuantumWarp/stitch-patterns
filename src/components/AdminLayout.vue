<script setup lang="ts">
import DarkToggle from './common/DarkToggle.vue';

</script>

<template>
  <div class="pattern-editor">
    <div class="side-panel">
      <div class="app-header">
        <img src="@/assets/wool.png">
        Stitch Patterns
      </div>

      <div class="app-sidenav">
        <slot name="sidenav"></slot>
      </div>

      <div class="app-footer">
        <DarkToggle />
        <div>© {{ new Date().getFullYear() }} - John Lowther</div>
      </div>
    </div>

    <div class="main-panel">
      <slot></slot>
    </div>
  </div>
</template>

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
.dark .side-panel {
  box-shadow: 3px 0px 10px rgb(48, 48, 48);
}

.main-panel {
  padding: 25px;
  flex: 1;
  overflow: auto;
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

.app-sidenav {
  flex: 1;
}

.app-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
}
.app-footer a {
  text-decoration: none;
}

img {
  height: 40px;
  margin-right: 10px;
}
.dark img {
  filter: invert(1);
}
</style>
