<template>
  <div class="panel-input">
    <label v-if="label">{{ label }}</label>

    <input
      :value="value"
      :type="type"
      @change="$emit('input', $event.target.value)"
    >
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: null },
    type: { type: String, default: 'text' },
    label: { type: String, default: null },
  },
};
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
}
input:focus {
  border: 1px solid #888;
  outline: none;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number] {
  -moz-appearance: textfield;
}
</style>
