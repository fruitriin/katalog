<template>
  <div id="app">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    
    <div class="component-showcase">
      <h2>Button Components</h2>
      
      <div class="button-group">
        <h3>Variants</h3>
        <Button variant="primary" @click="handleClick">Primary</Button>
        <Button variant="secondary" @click="handleClick">Secondary</Button>
        <Button variant="danger" @click="handleClick">Danger</Button>
        <Button variant="outline" @click="handleClick">Outline</Button>
      </div>
      
      <div class="button-group">
        <h3>Sizes</h3>
        <Button size="small" @click="handleClick">Small</Button>
        <Button size="medium" @click="handleClick">Medium</Button>
        <Button size="large" @click="handleClick">Large</Button>
      </div>
      
      <div class="button-group">
        <h3>States</h3>
        <Button disabled @click="handleClick">Disabled</Button>
        <Button loading @click="handleClick">Loading</Button>
      </div>
      
      <p>Click count: {{ count }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Button from './components/Button.vue'

const title = 'Katalog Vue App'
const message = 'Component showcase with our custom Button'
const count = ref(0)

const handleClick = () => {
  count.value++
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.component-showcase {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.button-group {
  margin: 2rem 0;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.button-group h3 {
  margin-bottom: 1rem;
  color: #374151;
}

.button-group :deep(.btn) {
  margin: 0.5rem;
}
</style>