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

      <!-- Test ChatGPT -->
      <div class="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 class="text-2xl font-semibold text-gray-900 mb-6">Test ChatGPT</h2>
        
        <div class="space-y-4">
          <UTextarea 
            v-model="message" 
            placeholder="Tapez votre message pour ChatGPT..."
            :rows="3"
            class="w-full"
          />
          
          <UButton 
            @click="sendToChatGPT" 
            :loading="gptLoading" 
            :disabled="!message.trim()"
            class="w-full"
          >
            {{ gptLoading ? 'Envoi en cours...' : 'Envoyer à ChatGPT' }}
          </UButton>
        </div>

        <div v-if="gptResponse" class="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 class="font-semibold text-blue-900 mb-2">Réponse ChatGPT:</h3>
          <p class="text-blue-800 whitespace-pre-wrap">{{ gptResponse }}</p>
        </div>

        <div v-if="gptError" class="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {{ gptError }}
        </div>
      </div>

      <!-- Test utilisateurs -->
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
              <UBadge :color="user.role === 'admin' ? 'error' : 'primary'">
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

// Variables pour les utilisateurs
const users = ref<User[]>([])
const loading = ref(false)
const error = ref('')

// Variables pour ChatGPT
const message = ref('')
const gptResponse = ref('')
const gptLoading = ref(false)
const gptError = ref('')

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

const sendToChatGPT = async () => {
  if (!message.value.trim()) return
  
  gptLoading.value = true
  gptError.value = ''
  gptResponse.value = ''
  
  try {
    const response = await $fetch<{success: boolean, data: string, error?: string}>('/api/test-gpt', {
      method: 'POST',
      body: {
        message: message.value
      }
    })
    
    if (response.success) {
      gptResponse.value = response.data
    } else {
      gptError.value = response.error || 'Erreur inconnue'
    }
  } catch (err: any) {
    gptError.value = 'Erreur lors de l\'appel à ChatGPT'
    console.error(err)
  } finally {
    gptLoading.value = false
  }
}

useSeoMeta({
  title: 'Test Full-Stack - Affinity App',
  description: 'Page de test pour démontrer les fonctionnalités full-stack'
})
</script>
