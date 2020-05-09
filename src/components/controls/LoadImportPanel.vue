<template>
  <div class="load-import-panel">
    <div class="header">
      <span class="pattern-count">
        <span class="number">{{ savedPatterns.length }}</span>
        Saved Pattern{{ savedPatterns.length === 1 ? '' : 's' }}
      </span>

      <PanelButton
        class="import-button"
        danger
        @click="$refs.importInput.click()"
      >
        Import
      </PanelButton>

      <input
        ref="importInput"
        style="display: none;"
        type="file"
        @change="importPattern"
      >
    </div>

    <div class="saved-patterns">
      <div
        v-for="pattern in savedPatterns"
        :key="pattern.name"
        class="saved-pattern-row"
        @click="loadPattern(pattern.name)"
      >
        <span>{{ pattern.name }}</span>

        <div
          class="actions"
          @click="$event.stopPropagation()"
        >
          <DownloadIcon
            title="Export"
            @click="downloadPattern(pattern.name)"
          />

          <FontDownloadIcon
            title="Export Knit"
            @click="exportToKnit(pattern.name)"
          />

          <DeleteIcon
            danger
            title="Delete"
            @click="deletePattern(pattern.name)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import DownloadIcon from 'vue-material-design-icons/Download.vue';
import FontDownloadIcon from 'vue-material-design-icons/FountainPen.vue';
import PanelButton from '../inputs/PanelButton.vue';
import FileHelper from '../../helpers/file-helper';

export default {
  components: {
    PanelButton,
    DeleteIcon,
    DownloadIcon,
    FontDownloadIcon,
  },
  computed: {
    ...mapGetters(['savedPatterns']),
  },
  created() {
    this.loadIndex();
  },
  methods: {
    ...mapActions([
      'loadIndex',
      'loadPattern',
      'downloadPattern',
      'importPattern',
      'deletePattern',
      'updateSettings',
    ]),
    exportToKnit() { FileHelper.exportToKnit(this.name, this.pattern); },
  },
};
</script>

<style scoped>
.general-settings {
  display: flex;
  justify-content: space-between;
}
.header {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.import-button {
  width: 100px;
}
.pattern-count {
  font-size: 20px;
}
.pattern-count .number {
  font-weight: bold;
}
.saved-patterns {
  height: 311px;
  max-height: 311px;
  border: 2px solid grey;
  border-radius: 5px;
  overflow-y: scroll;
}
.saved-pattern-row {
  border-bottom: 1px solid grey;
  padding: 0px 10px;
  height: 38px;
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
}
.saved-pattern-row:hover {
  background-color: #eee;
}
.saved-pattern-row:last-child:nth-child(n+7) {
  border-bottom: none;
}
.saved-pattern-row > span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.saved-pattern-row:hover > span {
  width: 210px;
}
.actions {
  position: absolute;
  height: 100%;
  right: 0;
  display: flex;
  align-items: stretch;
  opacity: 0;
  transition: opacity 0.2s;
}
.saved-pattern-row:hover .actions {
  opacity: 1;
}
.actions > * {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  user-select: none;
  transition: all 0.2s;
}
.actions > *:hover {
  background-color: var(--safe-color);
  color: white;
}
.actions > *[danger]:hover {
  background-color: var(--danger-color);
  color: white;
}
</style>
