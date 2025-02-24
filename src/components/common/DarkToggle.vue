<template>
  <i class="material-icons" @click="toggleDark">
    {{ darkMode ? "light_mode" : "dark_mode" }}
  </i>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const storageKey = 'stitch-patterns-dark';

const el = document.getElementById('app')!;
let localDark = localStorage.getItem(storageKey);

if (!localDark) {
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  localStorage.setItem(storageKey, systemDark.matches.toString());
  localDark = systemDark.matches.toString();
}

const darkMode = ref(localDark === 'true')

if (darkMode.value) {
  el.classList.add('dark')
}

const toggleDark = () => {
  if (darkMode.value) el.classList.remove('dark');
  else el.classList.add('dark');

  darkMode.value = !darkMode.value;
  localStorage.setItem(storageKey, darkMode.value.toString());
};
</script>

<style scoped>
i {
  cursor: pointer;
  user-select: none;
  height: 25px;
  color: var(--color-text);
  margin-bottom: 5px;
}
</style>
