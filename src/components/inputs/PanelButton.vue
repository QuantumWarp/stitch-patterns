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
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  transition-duration: 0.2s;
  cursor: pointer;
  border: 2px solid var(--safe-color);
  color: black;
  outline: none;
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
</style>;
