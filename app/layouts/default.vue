<template>
  <div class="min-h-screen flex flex-col">
    <AppNavbar />
    
    <main class="flex-1">
      <slot />
    </main>
    
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// Layout components are auto-imported
</script>
