<template>
  <section :class="{ open }">
    <div
      class="heading"
      @click="$emit('update:open', !open)"
    >
      <span>{{ name }}</span>
    </div>

    <div
      class="container"
      :style="{ maxHeight: open ? maxHeightOpen : 0 }"
    >
      <div
        ref="content"
        class="content"
      >
        <slot />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    name: { type: String, required: true },
    open: { type: Boolean, default: false },
  },
  data: () => ({
    maxHeightOpen: '0',
  }),
  mounted() {
    this.maxHeightOpen = `${this.$refs.content.getBoundingClientRect().height}px`;
  },
};
</script>

<style scoped>
section {
  border-top: 2px solid grey;
}
.heading {
  display: flex;
  justify-content: center;
  font-size: 20px;
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
  padding: 15px 20px;
}
</style>
