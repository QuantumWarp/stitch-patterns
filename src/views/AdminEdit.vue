<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <EditPrimary :pattern="pattern" />

      <SectionHeader name="Colours" />
      <ColorPalette
        v-model:pattern="pattern"
        v-model:settings="settings"
      />

      <!-- <DimensionAdjuster />
      <RowColumnAdjuster /> -->

      <SectionHeader name="Other" />
      <EditSettings
        :settings="settings"
        @on-update="settings = $event"
      />
    </template>

    <PatternEditor
      :settings="settings"
      :pattern="pattern"
      @on-update="pattern = $event"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import PatternEditor from '../components/editing/PatternEditor.vue';
import { usePersistanceStore } from '../store/persistance.ts';
import ColorPalette from '../components/editing/ColorPalette.vue';
import EditSettings from '../components/editing/EditSettings.vue';
import EditPrimary from '../components/editing/EditPrimary.vue';
import type { Pattern } from '../models/pattern.ts';
import PatternHelper from '../helpers/pattern-helper.ts';
import type { Settings } from '../models/settings.ts';
import SectionHeader from '../components/SectionHeader.vue';

const settings = ref<Settings>({
  colorIndex: 0,
  mirrorX: false,
  mirrorY: false,
  rotate: false
});

const pattern = ref<Pattern>({
  colors: ["#ffffff", "red"],
  dimensions: { width: 20, height: 20 },
  squares: PatternHelper.createFilledPattern(
    { width: 20, height: 20 },
    0
  )
})

const persistanceStore = usePersistanceStore();
const { loadSession } = persistanceStore;

onBeforeMount(() => loadSession());
</script>
