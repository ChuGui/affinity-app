<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          À propos de nous
        </h1>
        <p class="text-xl text-gray-600">
          Découvrez notre mission et notre équipe
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Notre mission</h2>
        <p class="text-gray-600 mb-6">
          Nous créons des applications modernes et performantes pour améliorer l'expérience utilisateur.
          Cette application est un exemple de ce que nous pouvons accomplir avec Nuxt 4.
        </p>

        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Technologies utilisées</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium">Nuxt 4</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium">Vue 3</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium">Tailwind CSS</h3>
          </div>
          <div class="text-center p-4 bg-gray-50 rounded-lg">
            <h3 class="font-medium">TypeScript</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'À propos - Affinity App',
  description: 'Découvrez notre mission et les technologies que nous utilisons'
})
</script>
