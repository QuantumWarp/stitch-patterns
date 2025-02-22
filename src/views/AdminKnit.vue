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
import AdminLayout from '../components/AdminLayout.vue';
import KnitStitchPanel from '../components/knitting/KnitStitchPanel.vue';
import { getKnittingSession, saveKnittingSession } from '../storage/knitting.storage.ts';
import type { KnitSession } from '../models/knit.ts';
import { useRoute } from 'vue-router';
import { router } from '../router.ts';
import PatternKnitDisplay from '../components/knitting/PatternKnitDisplay.vue';
import type { Pattern } from '../models/pattern.ts';
import { getPattern } from '../storage/pattern.storage.ts';
import KnitSettingsPanel from '../components/knitting/KnitSettingsPanel.vue';
import KnitPrimary from '../components/knitting/KnitPrimary.vue';
import SectionHeader from '../components/SectionHeader.vue';

const session = ref<KnitSession>();
const pattern = ref<Pattern>();

// Save session
const saveSessionTimeout = ref<number>();
watch(() => session, delayedSave)

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

  if (!route.params.id && !existingSession) {
    router.push("/admin/list");
    return;
  }

  if (existingSession?.patternId === route.params.id) {
    session.value = existingSession;
    return;
  }

  session.value = {
    patternId: route.params.id as string,
    time: 0,
    rowIndex: 0,
    stitchIndex: 0,
    settings: {
      fromTop: false,
      fromRight: false,
      reverseEven: true,
      doubleStitch: true,
    }
  }

  pattern.value = getPattern(route.params.id as string);
}
</script>

<style scoped>
.knit-settings {
  display: flex;
  padding: 30px 20px;
}
</style>