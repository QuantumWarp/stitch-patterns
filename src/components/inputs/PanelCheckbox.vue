<template>
  <div>
    <label>{{ label }}</label>

    <input
      :value="value"
      @input="$emit('input', $event.target.checked)"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: { type: Boolean, default: false },
  },
};
</script>
