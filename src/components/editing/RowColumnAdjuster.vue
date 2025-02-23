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
import type { Dimensions, Pattern, PatternSquare } from '../../models/pattern.ts';
import type { Settings } from '../../models/settings.ts';

const pattern = defineModel<Pattern>("pattern", { required: true });
const { settings } = defineProps<{ settings: Settings }>();

const adjust = (side: string, op: string) => {
  const { colorIndex } = settings;
  let existingSquares = pattern.value.squares;
  let dimensions: Dimensions = pattern.value.dimensions;
  let newSquares: PatternSquare[] = [];

  if (op === 'add') {
    switch (side) {
      case 'left':
        dimensions = { ...dimensions, width: dimensions.width + 1 };
        existingSquares = existingSquares.map((square) => ({ ...square, x: square.x + 1 }));
        newSquares = Array(dimensions.height).fill(0)
          .map((_, index) => ({ x: 0, y: index, colorIndex }));
        break;
      case 'right':
        dimensions = { ...dimensions, width: dimensions.width + 1 };
        newSquares = Array(dimensions.height).fill(0)
          .map((_, index) => ({ x: dimensions.width - 1, y: index, colorIndex }));
        break;
      case 'top':
        dimensions = { ...dimensions, height: dimensions.height + 1 };
        existingSquares = existingSquares.map((square) => ({ ...square, y: square.y + 1 }));
        newSquares = Array(dimensions.width).fill(0)
          .map((_, index) => ({ x: index, y: 0, colorIndex }));
        break;
      case 'bottom':
        dimensions = { ...dimensions, height: dimensions.height + 1 };
        newSquares = Array(dimensions.width).fill(0)
          .map((_, index) => ({ x: index, y: dimensions.height - 1, colorIndex }));
        break;
      default:
        throw new Error('Invalid side');
    }
  } else if (op === 'remove') {
    switch (side) {
      case 'left':
        dimensions = { ...dimensions, width: dimensions.width - 1 };
        existingSquares = existingSquares
          .filter((square) => square.x !== 0)
          .map((square) => ({ ...square, x: square.x - 1 }));
        break;
      case 'right':
        dimensions = { ...dimensions, width: dimensions.width - 1 };
        existingSquares = existingSquares.filter((square) => square.x !== dimensions.width);
        break;
      case 'top':
        dimensions = { ...dimensions, height: dimensions.height - 1 };
        existingSquares = existingSquares
          .filter((square) => square.y !== 0)
          .map((square) => ({ ...square, y: square.y - 1 }));
        break;
      case 'bottom':
        dimensions = { ...dimensions, height: dimensions.height - 1 };
        existingSquares = existingSquares.filter((square) => square.y !== dimensions.height);
        break;
      default:
        throw new Error('Invalid side');
    }
  }

  pattern.value = {
    ...pattern.value,
    dimensions,
    squares: existingSquares.concat(newSquares),
  }
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
