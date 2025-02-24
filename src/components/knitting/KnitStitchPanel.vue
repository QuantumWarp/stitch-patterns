<template>
  <div class="knit-panel">
    <div class="knit-panel-header">
      <div
        class="icon left"
        :style="{ visibility: session.rowIndex === 0 ? 'hidden' : 'visible' }"
        @click="previousRow()"
      >
        <i class="material-icons">arrow_back</i>
      </div>

      <span class="title">
        Row {{ session.rowIndex + 1 }}
      </span>

      <div
        class="icon right"
        :style="{ visibility: session.rowIndex === knitPattern.length - 1 ? 'hidden' : 'visible' }"
        @click="nextRow()"
      >
        <i class="material-icons">arrow_forward</i>
      </div>
    </div>

    <div
      class="knit-content"
    >
      <div
        v-for="(stitch, index) in selectedRow"
        :key="Object.values(stitch).concat([index]).join('-')"
        ref="stitchEntries"
        :class="stitchClass(index)"
        class="stitch-entry"
        @click="selectStitch(session.rowIndex, index)"
      >
        <div
          class="stitch-color"
          :style="<CSSProperties>{ backgroundColor: pattern.colors[stitch.colorIndex] }"
        />
        <span>{{ stitch.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, useTemplateRef, type CSSProperties } from 'vue';

import type { KnitSession } from '@/models/knit.ts';
import type { Pattern } from '@/models/pattern.ts';
import { createKnitPattern } from '@/helpers/knitting.helper.ts';

const session = defineModel<KnitSession>('session', { required: true });
const { pattern } = defineProps<{ pattern: Pattern }>();

const knitPattern = computed(() => createKnitPattern(pattern, session.value.settings));
const selectedRow = computed(() => knitPattern.value[session.value.rowIndex]);

function selectStitch(row: number, index: number) {
  session.value = {
    ...session.value, rowIndex: row, stitchIndex: index
  };
};

function nextRow() {
  selectStitch(session.value.rowIndex + 1, 0);
  scrollStitchIntoView();
};

function previousRow() {
  if (session.value.rowIndex === 0) return;
  selectStitch(session.value.rowIndex - 1, 0);
  scrollStitchIntoView();
};

function nextStitch() {
  const isEndRow = session.value.rowIndex === pattern.dimensions.height - 1;
  const isEndStitch = session.value.stitchIndex === selectedRow.value.length - 1;
  if (isEndStitch && isEndRow) return;
  if (isEndStitch) {
    selectStitch(session.value.rowIndex + 1, 0);
  } else {
    selectStitch(session.value.rowIndex, session.value.stitchIndex + 1);
  }
  scrollStitchIntoView();
};

function previousStitch() {
  const isStartRow = session.value.rowIndex === 0;
  const isStartStitch = session.value.stitchIndex === 0;
  if (isStartRow && isStartStitch) return;
  if (isStartStitch) {
    const previousRow = knitPattern.value[session.value.rowIndex - 1];
    selectStitch(session.value.rowIndex - 1, previousRow.length - 1);
  } else {
    selectStitch(session.value.rowIndex, session.value.stitchIndex - 1);
  }
  scrollStitchIntoView();
};

function stitchClass(index: number) {
  return {
    selected: session.value.stitchIndex === index,
    complete: session.value.stitchIndex > index
  }
};

const stitchEntriesEl = useTemplateRef('stitchEntries');

onMounted(() => document.addEventListener('keydown', keyDownHandler));
onUnmounted(() => document.removeEventListener('keydown', keyDownHandler));

function keyDownHandler(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowLeft': previousRow(); break;
    case 'ArrowRight': nextRow(); break;
    case 'ArrowDown': nextStitch(); break;
    case 'ArrowUp': previousStitch(); break;
    default: break;
  }
};

function scrollStitchIntoView() {
  nextTick(() => {
    if (!stitchEntriesEl.value) return;
    const stitchEl = stitchEntriesEl.value.find((x: Element) => x.classList.contains('selected'));
    if (stitchEl) {
      stitchEl.scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  });
};
</script>

<style scoped>
.knit-panel {
  flex: 1;
  margin-left: 10px;
  border: 2px solid grey;
  border-radius: 5px;
  overflow: hidden;
}

.knit-content {
  overflow-y: auto;
  height: 382px;
  max-height: 382px;
}

.knit-content.completed {
  background-color: lightgreen;
}

.knit-panel-header {
  display: flex;
  align-items: stretch;
  justify-content: center;
  border-bottom: 2px solid grey;
  height: 45px;
  font-size: 20px;
  font-weight: bold;
  user-select: none;
  position: relative;
}

.knit-panel-header>.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  position: absolute;
  height: 100%;
  width: 35px;
}

.knit-panel-header>.icon.left {
  left: 0;
}

.knit-panel-header>.icon.right {
  right: 0;
}

.knit-panel-header>.icon:hover {
  background-color: #eee;
}

.knit-panel-header>.title {
  display: flex;
  align-items: center;
}

.stitch-entry {
  height: 18px;
  padding: 10px 20px;
  font-size: 22px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}

.stitch-entry.selected {
  background-color: plum;
}
#app.dark .stitch-entry.selected {
  background-color: lightcoral;
}

.stitch-entry.complete {
  background-color: lightgreen;
}
#app.dark .stitch-entry.complete {
  background-color: #4CAF50;
}

.stitch-color {
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 3px;
  margin-right: 10px;
}
</style>
