<template>
  <div
    :class="{ disabled }"
    class="panel-checkbox"
    @click="$refs.checkbox.click();"
  >
    <label>{{ label }}</label>

    <input
      ref="checkbox"
      type="checkbox"
      :disabled="disabled"
      :checked="value"
      @click="$event.stopPropagation()"
      @input="$emit('input', $event.target.checked)"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
    label: { type: String, required: true },
    disabled: { type: Boolean, required: false },
  },
  emits: ['input'],
};
</script>

<style scoped>
.panel-checkbox {
  display: flex;
  align-items: stretch;
  cursor: pointer;
}
label {
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
}
input {
  margin: 12px;
  transform: scale(2);
  cursor: pointer;
}
.panel-checkbox.disabled {
  color: #ccc;
  cursor: not-allowed;
}
.panel-checkbox.disabled label,
.panel-checkbox.disabled input {
  cursor: not-allowed;
}
</style>
