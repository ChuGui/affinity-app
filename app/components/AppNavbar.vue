<template>
  <nav class="bg-white shadow-lg border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <h1 class="text-xl font-bold text-gray-900">Affinity App</h1>
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <NuxtLink to="/" class="text-gray-900 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Accueil
            </NuxtLink>
            <NuxtLink to="/about" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              À propos
            </NuxtLink>
            <NuxtLink to="/contact" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </NuxtLink>
            <NuxtLink to="/account" class="text-gray-500 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Comptes
            </NuxtLink>
          </div>
        </div>
        
        <div class="flex items-center">
          <UButton variant="outline" size="sm" class="mr-2">
            Connexion
          </UButton>
          <UButton size="sm">
            S'inscrire
          </UButton>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <UButton variant="ghost" size="sm" @click="mobileMenuOpen = !mobileMenuOpen">
            <Icon name="i-heroicons-bars-3" class="h-6 w-6" />
          </UButton>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-show="mobileMenuOpen" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        <NuxtLink to="/" class="text-gray-900 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
          Accueil
        </NuxtLink>
        <NuxtLink to="/about" class="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
          À propos
        </NuxtLink>
        <NuxtLink to="/contact" class="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
          Contact
        </NuxtLink>
        <NuxtLink to="/account" class="text-gray-500 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium">
          Comptes
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const mobileMenuOpen = ref(false)
</script>
