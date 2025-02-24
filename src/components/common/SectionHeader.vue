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
  font-weight: bold;
}
#app.dark .heading {
  background-color: dimgray;
}
</style>
