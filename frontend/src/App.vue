<template>
  <div class="flex flex-col sm:flex-row min-h-screen w-full">
    <Header />

    <main class="flex-1 bg-red-100 p-6 transition-all duration-300">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
  import Header from './components/Header.vue';
</script>

<style>
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  * {
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', sans-serif;
    background-color: #f9fafb;
    margin: 0;
    padding: 0;
  }
</style>