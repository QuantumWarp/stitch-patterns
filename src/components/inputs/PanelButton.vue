<template>
  <button @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<style scoped>
button {
  background-color: white; 
  border: none;
  color: white;
  padding: 10px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  transition-duration: 0.2s;
  cursor: pointer;
  border: 2px solid #4CAF50;
  color: black;
}
button:hover {
  background-color: #4CAF50;
  color: white;
}
</style>
