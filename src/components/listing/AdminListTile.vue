<template>
  <div>
    {{ pattern.name }}
  </div>
</template>

<script setup lang="ts">
import { Pattern } from "@/models/pattern";

const { pattern } = defineProps<{ pattern: Pattern }>();
</script>
