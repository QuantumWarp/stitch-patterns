<template>
  <div class="row">
    <label for="mirrorx">Mirror X</label>
    <input id="mirrorx" type="checkbox" :value="drawingSettings.mirrorX" @input="updateDrawingSettings({ mirrorX: $event.target.checked })" />

    <label for="mirrory">Mirror Y</label>
    <input id="mirrory" type="checkbox" :value="drawingSettings.mirrorY" @input="updateDrawingSettings({ mirrorY: $event.target.checked })" />

    <label for="rotate">Rotate</label>
    <input id="rotate" type="checkbox" :value="drawingSettings.rotate" @input="updateDrawingSettings({ rotate: $event.target.checked })" />
  </div>
</template>