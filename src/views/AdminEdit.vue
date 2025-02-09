<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <PrimaryInfo />
      <ColorPalette />
      <DimensionAdjuster />
      <RowColumnAdjuster />
      <GeneralSettings />
    </template>

    <GridPattern />
  </AdminLayout>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import GridPattern from '../components/GridPattern.vue';
import { usePersistanceStore } from '../store/persistance.ts';
import ColorPalette from '../components/controls/ColorPalette.vue';
import DimensionAdjuster from '../components/controls/DimensionAdjuster.vue';
import GeneralSettings from '../components/controls/GeneralSettings.vue';
import PrimaryInfo from '../components/controls/PrimaryInfo.vue';
import RowColumnAdjuster from '../components/controls/RowColumnAdjuster.vue';

const persistanceStore = usePersistanceStore();
const { loadSession } = persistanceStore;

onBeforeMount(() => loadSession());
</script>
