<template>
  <div class="bg-gray-50">
    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          Bienvenue sur Affinity App
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          Une application moderne construite avec Nuxt 4 et Nuxt UI
        </p>
        <div class="space-x-4">
          <UButton size="lg" color="primary" variant="solid">
            Commencer
          </UButton>
          <UButton size="lg" color="primary" variant="outline">
            En savoir plus
          </UButton>
          <UButton size="lg" color="secondary" variant="outline" @click="navigateTo('/test')">
            Tester l'API
          </UButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">
            Fonctionnalités principales
          </h2>
          <p class="text-lg text-gray-600">
            Découvrez ce qui rend notre application unique
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UCard class="text-center">
            <template #header>
              <div class="flex justify-center mb-4">
                <div class="bg-blue-100 p-3 rounded-full">
                  <Icon name="i-heroicons-rocket-launch" class="h-8 w-8 text-blue-600" />
                </div>
              </div>
            </template>
            
            <h3 class="text-xl font-semibold mb-2">Performance</h3>
            <p class="text-gray-600">
              Optimisé pour la vitesse avec Nuxt 4 et les dernières technologies web.
            </p>
          </UCard>

          <UCard class="text-center">
            <template #header>
              <div class="flex justify-center mb-4">
                <div class="bg-green-100 p-3 rounded-full">
                  <Icon name="i-heroicons-shield-check" class="h-8 w-8 text-green-600" />
                </div>
              </div>
            </template>
            
            <h3 class="text-xl font-semibold mb-2">Sécurité</h3>
            <p class="text-gray-600">
              Sécurisé par défaut avec les meilleures pratiques de l'industrie.
            </p>
          </UCard>

          <UCard class="text-center">
            <template #header>
              <div class="flex justify-center mb-4">
                <div class="bg-purple-100 p-3 rounded-full">
                  <Icon name="i-heroicons-sparkles" class="h-8 w-8 text-purple-600" />
                </div>
              </div>
            </template>
            
            <h3 class="text-xl font-semibold mb-2">Design</h3>
            <p class="text-gray-600">
              Interface utilisateur moderne et intuitive avec Nuxt UI.
            </p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-blue-600 py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Prêt à commencer ?
        </h2>
        <p class="text-xl text-blue-100 mb-8">
          Rejoignez des milliers d'utilisateurs satisfaits
        </p>
        <UButton size="lg" color="primary" variant="solid">
          Créer un compte gratuit
        </UButton>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Page meta
useSeoMeta({
  title: 'Accueil - Affinity App',
  description: 'Bienvenue sur Affinity App, une application moderne construite avec Nuxt 4'
})
</script>