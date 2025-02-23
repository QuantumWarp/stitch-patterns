<template>
  <div class="heading">
    <span>{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ name: string }>();
</script>

<style scoped>
.heading {
  border-top: 2px solid grey;
  display: flex;
  justify-content: center;
  font-size: 20px;
  padding: 5px;
  background-color: lightgray;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
}
</style>
