<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <!-- Company Info -->
        <div class="col-span-1 md:col-span-2">
          <h3 class="text-lg font-semibold mb-4">Affinity App</h3>
          <p class="text-gray-400 mb-4">
            Une application moderne construite avec Nuxt 4 et Tailwind CSS.
            Découvrez nos fonctionnalités innovantes.
          </p>
          <!-- <div class="flex space-x-4">
            <UButton variant="ghost" size="sm" color="white">
              <Icon name="i-heroicons-envelope" class="h-5 w-5" />
            </UButton>
            <UButton variant="ghost" size="sm" color="white">
              <Icon name="i-simple-icons-twitter" class="h-5 w-5" />
            </UButton>
            <UButton variant="ghost" size="sm" color="white">
              <Icon name="i-simple-icons-github" class="h-5 w-5" />
            </UButton>
          </div> -->
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Liens rapides</h3>
          <!-- <ul class="space-y-2">
            <li>
              <NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">
                Accueil
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="text-gray-400 hover:text-white transition-colors">
                À propos
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/contact" class="text-gray-400 hover:text-white transition-colors">
                Contact
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-gray-400 hover:text-white transition-colors">
                Blog
              </NuxtLink>
            </li>
          </ul> -->
        </div>

        <!-- Support -->
        <div>
          <h3 class="text-lg font-semibold mb-4">Support</h3>
          <!-- <ul class="space-y-2">
            <li>
              <NuxtLink to="/help" class="text-gray-400 hover:text-white transition-colors">
                Aide
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/faq" class="text-gray-400 hover:text-white transition-colors">
                FAQ
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/privacy" class="text-gray-400 hover:text-white transition-colors">
                Confidentialité
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms" class="text-gray-400 hover:text-white transition-colors">
                Conditions
              </NuxtLink>
            </li>
          </ul> -->
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-400 text-sm">
            © {{ currentYear }} Affinity App. Tous droits réservés.
          </p>
          <p class="text-gray-400 text-sm mt-2 md:mt-0">
            Fait avec ❤️ avec Nuxt 4
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
