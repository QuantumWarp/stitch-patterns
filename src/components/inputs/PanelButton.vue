<template>
  <button
    :class="{ danger }"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script>
export default {
  props: {
    danger: { type: Boolean, default: false },
  },
};
</script>

<style scoped>
button {
  background-color: white;
  border: none;
  color: white;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
  border: 2px solid var(--safe-color);
  color: black;
  outline: none;
  user-select: none;
  transition: color 0.2s, background-color 0.2s;
}
button:hover {
  background-color: var(--safe-color);
  color: white;
}
button.danger {
  border: 2px solid var(--danger-color);
}
button.danger:hover {
  background-color: var(--danger-color);
}
button {
  padding: 10px 8px;
}
button:active {
  padding: 10px 7px 10px 9px;
}
</style>;
