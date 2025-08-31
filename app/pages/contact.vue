<template>
  <div class="bg-gray-50 py-16">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">
          Contactez-nous
        </h1>
        <p class="text-xl text-gray-600">
          Nous sommes là pour vous aider
        </p>
      </div>

      <div class="bg-white rounded-lg shadow-md p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Contact Info -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Nos coordonnées</h2>
            
            <div class="space-y-4">
              <div class="flex items-center">
                <Icon name="i-heroicons-envelope" class="h-5 w-5 text-blue-600 mr-3" />
                <span class="text-gray-600">contact@affinity-app.com</span>
              </div>
              
              <div class="flex items-center">
                <Icon name="i-heroicons-phone" class="h-5 w-5 text-blue-600 mr-3" />
                <span class="text-gray-600">+33 1 23 45 67 89</span>
              </div>
              
              <div class="flex items-center">
                <Icon name="i-heroicons-map-pin" class="h-5 w-5 text-blue-600 mr-3" />
                <span class="text-gray-600">Paris, France</span>
              </div>
            </div>
          </div>

          <!-- Simple Contact Form -->
          <div>
            <h2 class="text-2xl font-semibold text-gray-900 mb-6">Envoyez-nous un message</h2>
            
            <form @submit.prevent="submitForm" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
                <input 
                  type="text" 
                  v-model="form.name"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre nom"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  v-model="form.email"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="votre@email.com"
                >
              </div>
              
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  v-model="form.message"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              
              <UButton 
                type="submit" 
                size="lg" 
                class="w-full" 
                :loading="isSubmitting"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? 'Envoi en cours...' : 'Envoyer le message' }}
              </UButton>
              
              <div v-if="submitMessage" class="mt-4 p-3 rounded-md" :class="submitMessage.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                {{ submitMessage }}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const submitMessage = ref('')

const submitForm = async () => {
  isSubmitting.value = true
  submitMessage.value = ''
  
  try {
    const response = await $fetch<{success: boolean, message: string}>('/api/contact', {
      method: 'POST',
      body: form.value
    })
    
    submitMessage.value = response.message
    // Reset form
    form.value = { name: '', email: '', message: '' }
  } catch (error: any) {
    submitMessage.value = error.data?.message || 'Erreur lors de l\'envoi'
  } finally {
    isSubmitting.value = false
  }
}

useSeoMeta({
  title: 'Contact - Affinity App',
  description: 'Contactez notre équipe pour toute question ou demande'
})
</script>
