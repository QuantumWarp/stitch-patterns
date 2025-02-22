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
import { ref, watch } from 'vue';
import AdminLayout from '../components/AdminLayout.vue';
import PatternEditor from '../components/editing/PatternEditor.vue';
import ColorPalette from '../components/editing/ColorPalette.vue';
import EditSettings from '../components/editing/EditSettings.vue';
import EditPrimary from '../components/editing/EditPrimary.vue';
import type { Pattern } from '../models/pattern.ts';
import PatternHelper from '../helpers/pattern-helper.ts';
import type { Settings } from '../models/settings.ts';
import SectionHeader from '../components/SectionHeader.vue';
import { v4 as uuid } from 'uuid';
import { useRoute  } from 'vue-router';
import { getPattern } from '../storage/pattern.storage.ts';

const defaultPattern = () => ({
  id: uuid(),
  name: '',
  colors: ["#ffffff", "red"],
  dimensions: { width: 20, height: 20 },
  squares: PatternHelper.createFilledPattern(
    { width: 20, height: 20 },
    0
  )
});

const pattern = ref<Pattern>(defaultPattern());

const settings = ref<Settings>({
  colorIndex: 0,
  mirrorX: false,
  mirrorY: false,
  rotate: false
});

const route = useRoute();
watch(() => route.params.id, loadPattern, { immediate: true })

function loadPattern() {
  if (!route.params.id) {
    pattern.value = defaultPattern();
  } else {
    pattern.value = getPattern(route.params.id as string);
  }
}
</script>
