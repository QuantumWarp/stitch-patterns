<template>
  <div>
    <div class="controls">
      <h2>Name</h2>
      <input id="name" type="text" v-model="name" />
    </div>

    <div class="controls">
      <h2>Pattern Settings</h2>
      
      <div class="row">
        <label for="width">Width</label>
        <input id="width" type="number" v-model="patternSettings.width" />

        <label for="height">Height</label>
        <input id="height" type="number" v-model="patternSettings.height" />
      </div>

      <div class="row">
        <label for="refreshColor">Refresh Color</label>
        <input id="refreshColor" type="color" v-model="patternSettings.refreshColor" />

        <button @click="resetPattern(patternSettings)">Refresh</button>
      </div>
    </div>

    <div class="controls">
      <h2>Drawing Settings</h2>

      <div class="row">
        <label for="mirrorx">Mirror X</label>
        <input id="mirrorx" type="checkbox" :value="drawingSettings.mirrorX" @input="updateDrawingSettings({ mirrorX: $event })" />

        <label for="mirrory">Mirror Y</label>
        <input id="mirrory" type="checkbox" :value="drawingSettings.mirrorY" @input="updateDrawingSettings({ mirrorY: $event })" />
      </div>

      <div class="row">
        <label for="color">Color</label>
        <input id="color" type="color" :value="drawingSettings.color" @input="updateDrawingSettings({ color: $event.target.value })" />

        <button @click="togglePreviousColor">Previous Color</button>
      </div>
    </div>

    <div>
      <h2>Import and Export</h2>

      <button onclick="document.getElementById('importInput').click();">Import</button>
      <input style="display: none;" id="importInput" @change="importRaw" type="file" />

      <button @click="exportRaw()">Export</button>

      <button @click="exportToKnit()">Export To Knit</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import FileHelper from '../file-helper';

export default {
  data: () => ({
    name: `Pattern ${Date.now()}`,
    patternSettings: {
      refreshColor: '#FFFFFF',
      width: 30,
      height: 30,
    },
  }),
  computed: {
    ...mapGetters([
      'dimensions',
      'drawingSettings',
      'pattern',
    ]),
  },
  created() {
    this.resetPattern(this.patternSettings);
  },
  watch: {
    dimensions(val) {
      this.patternSettings.width = val.width;
      this.patternSettings.height = val.height;
    },
  },
  methods: {
    ...mapActions([
      'togglePreviousColor',
      'updateDrawingSettings',
      'updatePattern',
      'resetPattern',
    ]),
    async importRaw(e) {
      const { name, pattern } = await FileHelper.importRaw(e);
      this.name = name;
      this.updatePattern(pattern);      
    },
    exportRaw() { FileHelper.exportRaw(this.name, this.pattern) },
    exportToKnit() { FileHelper.exportToKnit(this.name, this.pattern); },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  flex-direction: column;
  align-items: left;
  margin-bottom: 20px;
}
.row {
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
button {
  background-color: white; 
  border: none;
  color: white;
  padding: 14px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.4s;
  cursor: pointer;
  border: 2px solid #4CAF50;
  color: black;
}
button:hover {
  background-color: #4CAF50;
  color: white;
}
input[type=text], input[type=number] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
.row > input {
  margin-left: 10px;
  margin-right: 30px;
}
</style>
