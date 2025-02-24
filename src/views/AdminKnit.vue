<template>
  <AdminLayout v-if="session && pattern">
    <template v-slot:sidenav>
      <KnitPrimary :pattern="pattern" />

      <SectionHeader name="Knit Session" />
      <div class="knit-settings">
        <KnitSettingsPanel
          v-model:session="session"
          :pattern="pattern"
        />
        <KnitStitchPanel
          v-model:session="session"
          :pattern="pattern"
        />
      </div>
    </template>

    <PatternKnitDisplay
      v-model:session="session"
      :pattern="pattern"
    />
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import AdminLayout from '@/components/AdminLayout.vue';
import KnitStitchPanel from '@/components/knitting/KnitStitchPanel.vue';
import PatternKnitDisplay from '@/components/knitting/PatternKnitDisplay.vue';
import KnitSettingsPanel from '@/components/knitting/KnitSettingsPanel.vue';
import KnitPrimary from '@/components/knitting/KnitPrimaryPanel.vue';
import SectionHeader from '@/components/common/PanelHeader.vue';

import type { KnitSession } from '@/models/knit.ts';
import type { Pattern } from '@/models/pattern.ts';
import { router } from '@/router.ts';
import { getPattern } from '@/storage/pattern.storage.ts';
import { getKnittingSession, saveKnittingSession } from '@/storage/knitting.storage.ts';
import { defaultKnitSession } from '../helpers/knitting.helper.ts';

const session = ref<KnitSession>();
const pattern = ref<Pattern>();

// Save session
const saveSessionTimeout = ref<number>();
watch(session, delayedSave)

function delayedSave() {
  clearTimeout(saveSessionTimeout.value);
  saveSessionTimeout.value = setTimeout(() => {
    if (!session.value) return;
    saveKnittingSession(session.value);
  }, 500);
}

// Load previous session
const route = useRoute();
watch(() => route.params.id, loadSession, { immediate: true });

function loadSession() {
  const existingSession = getKnittingSession();

  if ((route.params.id === existingSession?.patternId) || (!route.params.id && existingSession)) {
    session.value = existingSession;
    pattern.value = getPattern(existingSession.patternId);
  } else if (route.params.id) {
    session.value = {
      patternId: route.params.id as string,
      ...defaultKnitSession(),
    }
    pattern.value = getPattern(route.params.id as string);
  } else {
    router.push('/admin/list');
    return;
  }

  history.replaceState({}, '', '/admin/knit');
}
</script>

<style scoped>
.knit-settings {
  display: flex;
  padding: 30px 20px;
}
</style>