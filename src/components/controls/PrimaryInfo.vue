<template>
  <div class="primary-info">
    <PanelInput
      v-model="name"
      class="name-input"
      label="Name"
    />

    <PanelButton
      class="save-button"
    >
      Save
    </PanelButton>
  </div>
</template>

<script>
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';

export default {
  components: {
    PanelButton,
    PanelInput,
  },
  data: () => ({
    name: `Pattern ${Date.now()}`,
  }),
};
</script>

<style scoped>
.primary-info {
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
}
.name-input {
  flex: 1;
  margin-right: 20px;
}
</style>
