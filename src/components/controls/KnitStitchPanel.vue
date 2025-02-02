<template>
  <div class="knit-panel">
    <div class="knit-panel-header">
      <div
        class="icon left"
        @click="currentRowIndex -= 1"
      >
        <font-awesome-icon :icon="['fas', 'arrow-left']" />
      </div>

      <span class="title">
        Row {{ currentRowIndex + 1 }}
      </span>

      <div
        class="icon right"
        @click="currentRowIndex += 1"
      >
        <font-awesome-icon :icon="['fas', 'arrow-right']" />
      </div>
    </div>

    <div
      :class="{ completed: currentRowIndex < selectedStitchInfo.rowIndex }"
      class="knit-content"
    >
      <div
        v-for="(stitch, index) in currentRow"
        :key="Object.values(stitch).concat([index]).join('-')"
        ref="stitchEntries"
        :class="stitchClass(stitch)"
        class="stitch-entry"
        @click="selectStitch(stitch)"
      >
        <div
          class="stitch-color"
          :style="<CSSProperties>{ backgroundColor: stitch.color }"
        />
        <span>{{ stitch.count }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useKnittingStore } from '@/store/knitting/state';
import { computed, nextTick, onMounted, onUnmounted, ref, useTemplateRef, watch, type CSSProperties } from 'vue';
import type { Stitch } from '../../models/knit.ts';

const knittingStore = useKnittingStore();
const { knitPattern, selectedStitch, selectedStitchInfo } = storeToRefs(knittingStore);
const { selectStitch } = knittingStore;

const stitchEntriesEl = useTemplateRef('stitchEntries');

const currentRowIndex = ref(0);

const currentRow = computed(() => {
  return knitPattern.value[currentRowIndex.value];
});

watch(selectedStitch, () => {
  currentRowIndex.value = selectedStitchInfo.value.rowIndex;
})

onMounted(() => {
  document.addEventListener('keydown', keyDownHandler);
})

onUnmounted(() => {
  document.removeEventListener('keydown', keyDownHandler);
})

const keyDownHandler = (event: KeyboardEvent) => {
  if (event.ctrlKey) {
    switch (event.key) {
      case 'ArrowRight': nextRow(); break;
      case 'ArrowLeft': previousRow(); break;
      default: break;
    }
  } else {
    switch (event.key) {
      case 'ArrowDown': nextStitch(); break;
      case 'ArrowUp': previousStitch(); break;
      default: break;
    }
  }
};

const nextRow = () => {
  if (selectedStitchInfo.value.isEndRow) return;
  selectStitch(knitPattern.value[selectedStitchInfo.value.rowIndex + 1][0]);
  scrollStitchIntoView();
};

const previousRow = () => {
  if (selectedStitchInfo.value.isStartRow) return;
  const previousRow = knitPattern.value[selectedStitchInfo.value.rowIndex - 1];
  selectStitch(previousRow[previousRow.length - 1]);
  scrollStitchIntoView();
};

const nextStitch = () => {
  if (selectedStitchInfo.value.isEndStitch && selectedStitchInfo.value.isEndRow) return;
  if (selectedStitchInfo.value.isEndStitch) {
    selectStitch(knitPattern.value[selectedStitchInfo.value.rowIndex + 1][0]);
  } else {
    selectStitch(selectedStitchInfo.value.row[selectedStitchInfo.value.stitchIndex + 1]);
  }
  scrollStitchIntoView();
};

const previousStitch = () => {
  if (selectedStitchInfo.value.isStartStitch && selectedStitchInfo.value.isStartRow) return;
  if (selectedStitchInfo.value.isStartStitch) {
    const previousRow = knitPattern.value[selectedStitchInfo.value.rowIndex - 1];
    selectStitch(previousRow[previousRow.length - 1]);
  } else {
    selectStitch(selectedStitchInfo.value.row[selectedStitchInfo.value.stitchIndex - 1]);
  }
  scrollStitchIntoView();
};

const stitchClass = (stitch: Stitch) => {
  return {
    selected: selectedStitch.value === stitch,
    complete: currentRowIndex.value < selectedStitchInfo.value.rowIndex
      || (currentRowIndex.value === selectedStitchInfo.value.rowIndex
        && selectedStitchInfo.value.row.indexOf(stitch) < selectedStitchInfo.value.stitchIndex),
  };
};

const scrollStitchIntoView = () => {
  nextTick(() => {
    const stitchEl = stitchEntriesEl.value!.find((x) => x.classList.contains('selected'));
    if (stitchEl) {
      stitchEl.scrollIntoView({ block: 'center' });
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
  overflow-y: scroll;
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

.stitch-entry.complete {
  background-color: lightgreen;
}

.stitch-color {
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 3px;
  margin-right: 10px;
}
</style>
