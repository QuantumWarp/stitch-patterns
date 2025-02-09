<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <RouterLink to="/admin/edit">
        <PanelButton>
          New Pattern
        </PanelButton>
      </RouterLink>

      <RouterLink to="/admin/knit">
        <PanelButton>
          Knit Session
        </PanelButton>
      </RouterLink>

      <div>
        Welcome to Stitch Patterns
      </div>
    </template>

    <AdminListTile
      v-for="pattern in savedPatterns"
      :key="pattern.name"
      :name="pattern.name"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import { usePersistanceStore } from '../store/persistance.ts';
import AdminListTile from '../components/AdminListTile.vue';
import { storeToRefs } from 'pinia';
import PanelButton from '../components/inputs/PanelButton.vue';

const persistanceStore = usePersistanceStore();
const { savedPatterns } = storeToRefs(persistanceStore); 
const { loadSession } = persistanceStore;

onBeforeMount(() => loadSession());
</script>
