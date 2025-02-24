<template>
  <AdminLayout>
    <template v-slot:sidenav>
      <EditPrimary v-model:pattern="pattern" />

      <SectionHeader name="Colours" />
      <ColorPalette
        v-model:pattern="pattern"
        v-model:settings="settings"
      />

      <SectionHeader name="Dimensions" />
      <DimensionAdjuster
        v-model:pattern="pattern"
        :settings="settings"
      />
      <RowColumnAdjuster
        v-model:pattern="pattern"
        :settings="settings"
      />

      <SectionHeader name="Other" />
      <EditSettingsPanel v-model:settings="settings" />
    </template>

    <PatternEditor
      v-model:pattern="pattern"
      :settings="settings"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute  } from 'vue-router';
import { v4 as uuid } from 'uuid';

import AdminLayout from '@/components/AdminLayout.vue';
import PatternEditor from '@/components/editing/PatternEditor.vue';
import ColorPalette from '@/components/editing/ColorPalettePanel.vue';
import EditSettingsPanel from '@/components/editing/EditSettingsPanel.vue';
import EditPrimary from '@/components/editing/EditPrimaryPanel.vue';
import SectionHeader from '@/components/common/PanelHeader.vue';
import DimensionAdjuster from '@/components/editing/DimensionsPanel.vue';
import RowColumnAdjuster from '@/components/editing/RowColumnPanel.vue';

import type { Pattern } from '@/models/pattern.ts';
import type { EditSettings } from '@/models/settings.ts';
import { PatternHelper } from '@/helpers/pattern.helper.ts';
import { getPattern } from '@/storage/pattern.storage.ts';

const defaultPattern = () => ({
  id: uuid(),
  name: '',
  colors: ['#000000', '#ffffff'],
  dimensions: { width: 30, height: 30 },
  squares: PatternHelper.createFilledPattern(
    { width: 30, height: 30 },
    1,
  )
});

const pattern = ref<Pattern>(defaultPattern());

const settings = ref<EditSettings>({
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
