<template>
  <div id="app">
    <div class="controls">
      <input id="name" v-model="name" />
      <label for="name">Name</label>
    </div>

    <div class="controls">
      <input id="width" type="number" v-model="width" />
      <label for="width">Width</label>

      <input id="height" type="number" v-model="height" />
      <label for="height">Height</label>

      <input id="refreshColor" type="color" v-model="refreshColor" />
      <label for="refreshColor">Refresh Color</label>

      <button @click="refreshPoints()">Refresh</button>
    </div>

    <div class="controls">
      <button @click="color = previousColor">Toggle Previous</button>

      <input id="color" type="color" v-model="color" />
      <label for="color">Color</label>

      <input id="mirrorx" type="checkbox" v-model="mirrorX" />
      <label for="mirrorx">Mirror X</label>

      <input id="mirrory" type="checkbox" v-model="mirrorY" />
      <label for="mirrory">Mirror Y</label>

      <button onclick="document.getElementById('importInput').click();">Import</button>
      <input style="display: none;" id="importInput" @change="importRaw" type="file" />

      <button @click="exportRaw()">Export</button>

      <button @click="exportToKnit()">Export To Knit</button>
    </div>

    <GridPattern
      v-model="pattern"
      :mirrorX="mirrorX"
      :mirrorY="mirrorY"
      :color="color"
    />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid';
import GridPattern from './components/GridPattern.vue'

export default {
  components: {
    GridPattern,
  },
  data: () => ({
    name: uuid().replace(/-/g, ''),
    color: '#000000',
    previousColor: '#FFFFFF',
    refreshColor: '#FFFFFF',
    mirrorX: false,
    mirrorY: false,
    width: 30,
    height: 30,
    pattern: [],
  }),
  created() {
    this.refreshPoints();
  },
  watch: {
    color(_val, prevVal) {
      this.previousColor = prevVal;
    },
  },
  methods: {
    refreshPoints() {
      this.pattern = [];
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          this.pattern.push({
            x: x,
            y: y,
            color: this.refreshColor,
          });
        }
      }
    },
    exportRaw() {
      this.download(`${this.name}.json`, JSON.stringify(this.pattern));
    },
    importRaw(e) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        this.name = file.name.replace(/\.json/g, '');
        this.pattern = JSON.parse(evt.target.result);
      };
      reader.readAsText(file);
    },
    exportToKnit() {
      let text = `-------- ${this.name} --------\r\n\r\n`;
      const height = Math.max(...this.pattern.map((point) => point.y)) + 1;

      for (let y = 0; y < height; y++) {
        text += this.exportToKnitRow(
          y,
          this.pattern.filter((point) => point.y === (height - 1 - y)),
          y % 2
        );
      }

      this.download(`${this.name}.txt`, text);
    },
    exportToKnitRow(row, points, reversed) {
      let text = `-------- Row ${row + 1} --------${reversed ? ' (Reversed)' : ''}\r\n`
      let count = 1;
      const r = reversed ? -1 : 1;
      points
        .sort((a, b) => (a.x > b.x ? r : -r))
        .forEach((point, index, self) => {
          const nextPoint = self[index + 1];
          const notSame = !nextPoint || point.color !== nextPoint.color;
          if (notSame) {
            text += `Knit ${count * 2}: ${this.colorString(point.color)}\r\n`;
            count = 1;
          } else {
            count += 1;
          }
        });

      return `${text}\r\n`;
    },
    colorString(color) {
      switch (color) {
        case '#FFFFFF': return 'White';
        case '#000000': return 'Black';
        default: return color;
      }
    },
    download(filename, text) {
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
      element.setAttribute('download', filename);
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

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