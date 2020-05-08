<template>
  <div>
    <label>{{ label }}</label>

    <input
      type="checkbox" :value="drawingSettings.mirrorX" @input="updateDrawingSettings({ mirrorX: $event.target.checked })" />
  </div>
</template>