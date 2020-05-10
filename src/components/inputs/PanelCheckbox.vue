<template>
  <div
    class="panel-checkbox"
    @click="$refs.checkbox.click();"
  >
    <label>{{ label }}</label>

    <input
      ref="checkbox"
      type="checkbox"
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
  },
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
input
{
  margin: 12px;
  transform: scale(2);
  cursor: pointer;
}
</style>
