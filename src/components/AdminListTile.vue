<template>
  <div>
    {{ name }}
  </div>
</template>

<script setup lang="ts">
const { name } = defineProps({ name: String });
</script>
