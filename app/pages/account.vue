<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-7xl mx-auto">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-4">Résumés de Conversations</h1>
        <p class="text-gray-600">Gestion des résumés de conversations Supabase</p>
      </div>

      <div class="mb-6 flex gap-4">
        <UButton 
          @click="fetchAccounts" 
          :loading="loading"
          icon="i-heroicons-arrow-path"
          size="lg"
        >
          {{ loading ? 'Chargement...' : 'Récupérer les conversations' }}
        </UButton>
        
        <UButton 
          @click="testSupabase" 
          :loading="healthLoading"
          icon="i-heroicons-heart"
          variant="outline"
          size="lg"
        >
          {{ healthLoading ? 'Test...' : 'Test Connexion Supabase' }}
        </UButton>
      </div>

      <div v-if="error" class="mb-6">
        <UAlert
          icon="i-heroicons-exclamation-triangle"
          color="red"
          variant="soft"
          :title="error"
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
          @close="error = null"
        />
      </div>

      <div v-if="healthStatus" class="mb-6">
        <UAlert
          icon="i-heroicons-check-circle"
          color="green"
          variant="soft"
          :title="healthStatus"
          :close-button="{ icon: 'i-heroicons-x-mark-20-solid', color: 'gray', variant: 'link', padded: false }"
          @close="healthStatus = null"
        />
      </div>

      <div v-if="accounts.length > 0" class="bg-white shadow-lg rounded-lg overflow-hidden">
        <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900">
            Liste des conversations ({{ accounts.length }} {{ accounts.length > 1 ? 'conversations' : 'conversation' }})
          </h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type de compte
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timezone
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Créé le
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="account in accounts" :key="account.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm font-medium text-gray-900">
                        {{ account.name || 'Non défini' }}
                      </div>
                      <div class="text-sm text-gray-500">
                        ID: {{ account.user_id || 'N/A' }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ account.location_name || 'Non défini' }}</div>
                  <div class="text-sm text-gray-500">{{ account.location_id }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <UBadge 
                    :color="account.account_type ? 'blue' : 'gray'" 
                    variant="soft"
                  >
                    {{ account.account_type || 'Non défini' }}
                  </UBadge>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ account.location_timezone || 'Non défini' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(account.created_at) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <UBadge 
                    :color="account.access_token ? 'green' : 'red'" 
                    variant="soft"
                  >
                    {{ account.access_token ? 'Connecté' : 'Déconnecté' }}
                  </UBadge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="!loading && !error" class="text-center py-12">
        <div class="text-gray-500">
          <Icon name="i-heroicons-inbox" class="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 class="text-lg font-medium text-gray-900 mb-2">Aucune conversation trouvée</h3>
          <p class="text-gray-500">Cliquez sur le bouton pour récupérer les conversations depuis la base de données.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GHLAccount {
  id: string
  user_id: string | null
  access_token: string | null
  refresh_token: string | null
  expires_at: string | null
  location_id: string
  created_at: string | null
  account_type: string | null
  name: string | null
  company_id: string | null
  location_name: string | null
  location_timezone: string | null
  scope: string | null
  token_type: string | null
  updated_at: string | null
  authorization_code: string | null
  relance_hours: number | null
  relance_nb_message: number | null
}

// Meta tags
useHead({
  title: 'Comptes GHL - Affinity App',
  meta: [
    { name: 'description', content: 'Gestion des comptes GoHighLevel connectés' }
  ]
})

// Reactive data
const accounts = ref<GHLAccount[]>([])
const loading = ref(false)
const healthLoading = ref(false)
const error = ref<string | null>(null)
const healthStatus = ref<string | null>(null)

// Methods
const fetchAccounts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await $fetch<{ success: boolean; data: GHLAccount[]; count: number }>('/api/accounts')
    
    if (response.success) {
      accounts.value = response.data
    } else {
      error.value = 'Erreur lors de la récupération des comptes'
    }
  } catch (err: any) {
    console.error('Erreur API:', err)
    error.value = err.data?.message || 'Erreur de connexion à l\'API'
  } finally {
    loading.value = false
  }
}

const testSupabase = async () => {
  healthLoading.value = true
  error.value = null
  healthStatus.value = null
  
  try {
    const response = await $fetch<{ success: boolean; message?: string; error?: string; data?: any; count?: number }>('/api/test-supabase')
    
    if (response.success) {
      healthStatus.value = `✅ ${response.message} - ${response.count || 0} enregistrements trouvés`
      error.value = null
    } else {
      error.value = `❌ Test échoué: ${response.error}`
    }
  } catch (err: any) {
    console.error('Erreur test Supabase:', err)
    error.value = `❌ Erreur: ${err.data?.message || err.message || 'Connexion échouée'}`
  } finally {
    healthLoading.value = false
  }
}

const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'Non défini'
  
  try {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  } catch {
    return 'Date invalide'
  }
}
</script>
