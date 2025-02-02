<template>
  <section :class="{ open }">
    <div
      class="heading"
      @click="$emit('update:open', !open)"
    >
      <span>{{ name }}</span>
    </div>

    <div
      class="container"
      :style="<CSSProperties>{ maxHeight: open ? maxHeightOpen : 0 }"
    >
      <div
        ref="content"
        class="content"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, useTemplateRef, type CSSProperties } from 'vue';

defineProps<{
  name: string,
  open?: boolean,
}>();

defineEmits<{ 'update:open': [open: boolean] }>();

const contentEl = useTemplateRef('content');

const maxHeightOpen = ref('0');

onMounted(() => {
  maxHeightOpen.value = `${contentEl.value!.getBoundingClientRect().height}px`;
});
</script>

<style scoped>
section {
  border-top: 2px solid grey;
}

.heading {
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding: 5px;
  background-color: lightgray;
  user-select: none;
  cursor: pointer;
}

.open>.heading {
  font-weight: bold;
}

.container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s;
}

.content {
  padding: 15px 20px;
}
</style>
