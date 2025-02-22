<template>
  <div>
    Test
    {{ pattern.name }}
    <img :src="imgData" />

    <button @click="$router.push(`/admin/edit/${pattern.id}`)">Edit</button>
    <button @click="$router.push(`/admin/knit/${pattern.id}`)">Knit</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Pattern } from '../../models/pattern.ts';
import { createPatternImage } from '../../helpers/pattern-image-helper.ts';

const { pattern } = defineProps<{ pattern: Pattern }>();

const imgData = computed(() => createPatternImage(pattern));
</script>
