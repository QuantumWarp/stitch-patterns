<template>
  <div class="row-column-adjuster">
    <div>
      <div class="row-adjuster">
        <button @click="adjust('top', 'add')">
          +
        </button>
        <button @click="adjust('top', 'remove')">
          -
        </button>
      </div>

      <div class="column-adjusters">
        <div class="column-adjuster">
          <button @click="adjust('left', 'add')">
            +
          </button>
          <button @click="adjust('left', 'remove')">
            -
          </button>
        </div>

        <div class="center" />

        <div class="column-adjuster">
          <button @click="adjust('right', 'add')">
            +
          </button>
          <button @click="adjust('right', 'remove')">
            -
          </button>
        </div>
      </div>

      <div class="row-adjuster">
        <button @click="adjust('bottom', 'add')">
          +
        </button>
        <button @click="adjust('bottom', 'remove')">
          -
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePatternStore } from '@/bin/pattern';


const patternStore = usePatternStore();
const { incrementDimension } = patternStore;

const adjust = (side: string, op: string) => {
  incrementDimension({ side, op });
}
</script>

<style scoped>
.row-column-adjuster {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.column-adjusters {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.row-adjuster {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.column-adjuster {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.row-adjuster :first-child:hover,
.column-adjuster :first-child:hover {
  background-color: var(--safe-color);
}

.row-adjuster :last-child:hover,
.column-adjuster :last-child:hover {
  background-color: var(--danger-color);
}

button {
  margin: 1px;
  border-radius: 50%;
  transition: background-color 0.2s;
  height: 30px;
  width: 30px;
  cursor: pointer;
  outline: none;
  user-select: none;
}

.center {
  position: relative;
  width: 60px;
  height: 60px;
  margin: 5px;
  border: 2px solid black;
}

.center::before {
  content: '';
  position: absolute;
  box-sizing: border-box;
  left: calc(50% - 1px);
  height: 100%;
  border: 1px solid black;
}

.center::after {
  content: '';
  position: absolute;
  box-sizing: border-box;
  top: calc(50% - 1px);
  width: 100%;
  border: 1px solid black;
}
</style>
