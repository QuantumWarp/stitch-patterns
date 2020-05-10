<template>
  <div class="general-settings">
    <PanelCheckbox
      label="Mirror X"
      :value="form.mirrorX"
      @input="updateSettings({ mirrorX: $event })"
    />

    <PanelCheckbox
      label="Mirror Y"
      :value="form.mirrorY"
      @input="updateSettings({ mirrorY: $event })"
    />

    <PanelCheckbox
      label="Rotate"
      :value="form.rotate"
      @input="updateSettings({ rotate: $event })"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import PanelCheckbox from '../inputs/PanelCheckbox.vue';

export default {
  components: {
    PanelCheckbox,
  },
  data: () => ({
    form: {
      mirrorX: false,
      mirrorY: false,
      rotate: false,
    },
  }),
  computed: {
    ...mapGetters(['settings']),
  },
  watch: {
    settings: {
      immediate: true,
      handler(val) {
        this.form = { ...val };
      },
    },
  },
  methods: {
    ...mapActions(['updateSettings']),
  },
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
</style>
