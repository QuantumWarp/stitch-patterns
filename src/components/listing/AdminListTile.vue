<template>
  <div class="tile">
    <img :src="imgData" />
    
    <div class="right">
      <div class="title">{{ pattern.name }}</div>

      <div class="buttons">
        <PanelButton @click="$router.push(`/admin/edit/${pattern.id}`)">Edit</PanelButton>
        <PanelButton @click="$router.push(`/admin/knit/${pattern.id}`)">Knit</PanelButton>
        <PanelButton @click="exportPattern(pattern)">Export</PanelButton>
        <PanelButton danger @click="deletePattern(pattern); emit('refresh')">Delete</PanelButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Pattern } from '../../models/pattern.ts';
import { createPatternImage } from '../../helpers/pattern-image-helper.ts';
import { exportPattern } from '../../helpers/persistance-helper.ts';
import { deletePattern } from '../../storage/pattern.storage.ts';
import PanelButton from '../inputs/PanelButton.vue';

const { pattern } = defineProps<{ pattern: Pattern }>();
const emit = defineEmits<{ refresh: [] }>();

const imgData = computed(() => createPatternImage(pattern));
</script>

<style scoped>
.tile {
  width: 500px;
  height: 180px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  transition: box-shadow 0.2s ease-in-out;
  background-color: #f9f9f9;
}
.tile:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}
#app.dark .tile {
  background-color: #404040;
}
img {
  height: 100%;
  width: 200px;
  min-width: 200px;
  object-fit: cover;
}
#app.dark img {
  filter: brightness(0.8);
}

.right {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.right .title {
  font-size: 24px;
}
.right .buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  gap: 10px;
  transition: opacity 0.2s ease-in-out, filter 0.2s ease-in-out;
}
.tile:not(:hover) .right .buttons {
  filter: grayscale();
  opacity: 0.2;
}
</style>