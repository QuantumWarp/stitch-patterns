<template>
  <div class="primary-info">
    <div class="title">
      {{ pattern.name }}
    </div>

    <div class="buttons">
      <PanelButton @click="$router.push('/admin/list')">
        Pattern List
      </PanelButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import PanelButton from '@/components/inputs/PanelButton.vue';

import type { Pattern } from '@/models/pattern.ts';

const { pattern } = defineProps<{ pattern: Pattern }>();
</script>

<style scoped>
.primary-info {
  padding: 25px 10px;
  display: flex;
  flex-direction: column;
}

.title {
  display: flex;
  justify-content: center;
  padding: 10px 0px 20px 0px;
  font-size: 40px;
}

.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 6px;
}
</style>
