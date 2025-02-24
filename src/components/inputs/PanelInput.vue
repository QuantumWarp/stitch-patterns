<template>
  <div class="panel-input">
    <label v-if="label">{{ label }}</label>

    <input
      v-model="value"
      :type="type || 'string'"
    >
  </div>
</template>

<script setup lang="ts">
import type { InputTypeHTMLAttribute } from 'vue';

defineProps<{
  type?: InputTypeHTMLAttribute,
  label: string,
}>();

const value = defineModel<string>();
</script>

<style scoped>
.panel-input {
  display: flex;
  flex-direction: column;
}
label {
  font-size: 12px;
  margin-bottom: 3px;
}
input {
  width: 100%;
  padding: 8px 10px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  color: var(--color-text)
}
#app.dark input {
  background-color: grey;
}
input:focus {
  border: 1px solid #888;
  outline: none;
}
#app.dark input:focus {
  border-color: white;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
