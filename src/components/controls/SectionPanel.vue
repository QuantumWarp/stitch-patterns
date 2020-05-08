<template>
  <div :class="{ open }">
    <div
      class="heading"
      @click="open = !open"
    >
      <span>{{ name }}</span>
    </div>

    <div
      class="container"
      :style="{ maxHeight: open ? this.maxHeightOpen : 0 }"
    >
      <div
        ref="content"
        class="content"
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    startOpen: { type: Boolean, default: false },
  },
  data: () => ({
    open: false,
    maxHeightOpen: '0',
  }),
  mounted() {
    this.open = this.startOpen;
    this.maxHeightOpen = this.$refs.content.getBoundingClientRect().height + 'px';
  },
};
</script>

<style scoped>
.heading {
  display: flex;
  justify-content: center;
  font-size: 20px;
  border-top: 2px solid grey;
  padding: 5px;
  background-color: lightgray;
  user-select: none;
  cursor: pointer;
}
.open > .heading {
  font-weight: bold;
}
.container {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s;
}
.content {
  padding: 10px 20px;
}
</style>
