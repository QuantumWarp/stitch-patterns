<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <KnitSession />
      <KnitStitchPanel />
    </template>

    <GridPattern isKnitting />
  </AdminLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import KnitSession from '../components/todo/KnitSession.vue';
import KnitStitchPanel from '../components/todo/KnitStitchPanel.vue';
import GridPattern from '../components/GridPattern.vue';
import { usePersistanceStore } from '../store/persistance.ts';

const persistanceStore = usePersistanceStore();
const { loadSession } = persistanceStore;

onBeforeMount(() => loadSession());
</script>
