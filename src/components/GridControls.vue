<template>
  <div>
    <div class="controls">
      <input id="name" v-model="name" />
      <label for="name">Name</label>
    </div>

    <div class="controls">
      Pattern Settings
      
      <input id="width" type="number" v-model="patternSettings.width" />
      <label for="width">Width</label>

      <input id="height" type="number" v-model="patternSettings.height" />
      <label for="height">Height</label>

      <input id="refreshColor" type="color" v-model="patternSettings.refreshColor" />
      <label for="refreshColor">Refresh Color</label>

      <button @click="resetPattern(patternSettings)">Refresh</button>
    </div>

    <div class="controls">
      Drawing Settings

      <button @click="togglePreviousColor">Toggle Previous</button>

      <input id="color" type="color" :value="drawingSettings.color" @input="updateDrawingSettings({ color: $event.target.value })" />
      <label for="color">Color</label>

      <input id="mirrorx" type="checkbox" :value="drawingSettings.mirrorX" @input="updateDrawingSettings({ mirrorX: $event })" />
      <label for="mirrorx">Mirror X</label>

      <input id="mirrory" type="checkbox" :value="drawingSettings.mirrorY" @input="updateDrawingSettings({ mirrorY: $event })" />
      <label for="mirrory">Mirror Y</label>
    </div>

    <div>
      Import and Export

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
    name: 'Test',
    patternSettings: {
      refreshColor: '#FFFFFF',
      width: 30,
      height: 30,
    },
  }),
  computed: {
    ...mapGetters([
      'drawingSettings',
      'pattern',
    ]),
  },
  created() {
    this.resetPattern(this.patternSettings);
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
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
}
.controls > label {
  margin-left: 5px;
  margin-right: 30px;
}  
</style>
