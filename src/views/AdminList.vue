<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <PrimaryActionsPanel @refresh="refresh" />
    </template>

    <div class="centered">
      <div class="tile-grid">
        <AdminListTile
          v-for="pattern in patterns"
          :key="pattern.id"
          :pattern="pattern"
          @refresh="refresh"
        />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import AdminLayout from '@/components/AdminLayout.vue';
import AdminListTile from '@/components/listing/AdminListTile.vue';
import PrimaryActionsPanel from '@/components/listing/PrimaryActionsPanel.vue';

import { getPatterns } from '@/storage/pattern.storage.ts';

const patterns = ref(getPatterns());

function refresh() {
  patterns.value = getPatterns();
}
</script>

<style scoped>
.centered {
  display: flex;
  align-items: center;
  min-height: 100vh;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 40px;
}
.tile-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  min-width: 100%;
  gap: 50px;
  margin-bottom: 200px;
}
</style>
