<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <PrimaryActionsPanel />

      <div>
        Welcome to Stitch Patterns
      </div>
    </template>

    <AdminListTile
      v-for="pattern in patterns"
      :key="pattern.id"
      :pattern="pattern"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from '../components/AdminLayout.vue';
import AdminListTile from '../components/listing/AdminListTile.vue';
import PrimaryActionsPanel from '../components/listing/PrimaryActionsPanel.vue';
import { getPatterns } from '../storage/pattern.storage.ts';
import { computed } from 'vue';

const patterns = computed(() => getPatterns());
</script>
