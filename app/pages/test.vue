<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Test Full-Stack
        </h1>
        <p class="text-xl text-gray-600">
          Démonstration des API serveur
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Liste des utilisateurs</h2>
        
        <UButton @click="fetchUsers" :loading="loading" class="mb-6">
          {{ loading ? 'Chargement...' : 'Charger les utilisateurs' }}
        </UButton>

        <div v-if="users.length > 0" class="space-y-4">
          <UCard v-for="user in users" :key="user.id">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="font-semibold">{{ user.name }}</h3>
                <p class="text-gray-600">{{ user.email }}</p>
              </div>
              <UBadge :color="user.role === 'admin' ? 'red' : 'primary'">
                {{ user.role }}
              </UBadge>
            </div>
          </UCard>
        </div>

        <div v-if="error" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {{ error }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
  role: string
}

const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

const fetchUsers = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const response = await $fetch<{success: boolean, data: User[]}>('/api/users')
    users.value = response.data
  } catch (err: any) {
    error.value = 'Erreur lors du chargement des utilisateurs'
    console.error(err)
  } finally {
    loading.value = false
  }
}

useSeoMeta({
  title: 'Test Full-Stack - Affinity App',
  description: 'Page de test pour démontrer les fonctionnalités full-stack'
})
</script>
