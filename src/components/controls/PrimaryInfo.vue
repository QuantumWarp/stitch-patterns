<template>
  <div class="primary-info">
    <PanelInput
      class="name-input"
      label="Name"
      :value="form.name"
      @input="updatePatternDetails({ name: $event })"
    />

    <div class="buttons">
      <PanelButton
        class="save-button"
        :danger="isOverwrite"
        @click="save"
      >
        {{ isOverwrite ? 'Overwrite' : 'Save' }}
      </PanelButton>

      <PanelButton
        danger
        class="reset-button"
        @click="reinitialise"
      >
        Reset
      </PanelButton>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PanelButton from '../inputs/PanelButton.vue';
import PanelInput from '../inputs/PanelInput.vue';

export default {
  components: {
    PanelButton,
    PanelInput,
  },
  data: () => ({
    form: {
      name: '',
    },
  }),
  computed: {
    ...mapGetters([
      'patternDetails',
      'savedPatterns',
    ]),
    isOverwrite() {
      return Boolean(this.savedPatterns.find((x) => x.name === this.patternDetails.name));
    },
  },
  watch: {
    patternDetails: {
      immediate: true,
      handler(val) {
        this.form.name = val.name;
      },
    },
  },
  methods: {
    ...mapActions([
      'savePattern',
      'reinitialise',
      'updatePatternDetails',
    ]),
    save() {
      this.savePattern();
      this.downloadPattern(this.form.name);
    },
  },
};
</script>

<style scoped>
.primary-info {
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.buttons {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.buttons > :not(:last-child) {
  margin-right: 10px;
}
.save-button {
  width: 120px;
}
.reset-button {
  width: 80px;
}
</style>
