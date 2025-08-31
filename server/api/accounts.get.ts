import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    // Get environment variables directly
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY
    
    console.log('🔍 Environment check:', {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
      hasAnonKey: !!supabaseAnonKey,
      urlStart: supabaseUrl?.substring(0, 30) + '...',
      serviceKeyStart: supabaseServiceKey?.substring(0, 20) + '...',
      anonKeyStart: supabaseAnonKey?.substring(0, 20) + '...'
    })
    
    // Check if environment variables are available
    if (!supabaseUrl) {
      return {
        success: false,
        error: 'SUPABASE_URL manquante dans le fichier .env',
        data: []
      }
    }
    
    if (!supabaseServiceKey && !supabaseAnonKey) {
      return {
        success: false,
        error: 'Aucune clé Supabase trouvée dans le fichier .env',
        data: []
      }
    }

    // Try with Service Role Key first (bypasses RLS)
    let supabase = createClient(supabaseUrl, (supabaseServiceKey || supabaseAnonKey)!, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        fetch: (url, options = {}) => {
          console.log(`🌐 Tentative de connexion à: ${url}`)
          return fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              'User-Agent': 'Nuxt-App/1.0'
            }
          }).catch(error => {
            console.error(`❌ Fetch failed pour ${url}:`, error.message)
            throw error
          })
        }
      }
    })

    console.log(`🚀 Tentative de connexion avec ${supabaseServiceKey ? 'Service Role Key' : 'Anon Key'}`)

    // Test connection first
    console.log('🔗 Test de connexion à Supabase...')
    const { data: testData, error: testError } = await supabase
      .from('ghl_accounts')
      .select('count(*)')
      .limit(1)

    if (testError) {
      console.error('❌ Erreur de connexion:', testError)
      
      // If service key failed, try with anon key
      if (supabaseServiceKey && supabaseAnonKey && testError.code === '42501') {
        console.log('🔄 Tentative avec Anon Key...')
        supabase = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        })
        
        const { data: retryTest, error: retryError } = await supabase
          .from('ghl_accounts')
          .select('count(*)')
          .limit(1)
          
        if (retryError) {
          return {
            success: false,
            error: `Erreur de connexion Supabase: ${retryError.message}`,
            data: []
          }
        }
      } else {
        return {
          success: false,
          error: `Erreur de connexion Supabase: ${testError.message}`,
          data: []
        }
      }
    }

    console.log('✅ Connexion réussie! Récupération des données...')

    // Fetch all accounts from ghl_accounts table
    const { data, error } = await supabase
      .from('ghl_accounts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Erreur lors de la requête:', error)
      return {
        success: false,
        error: `Erreur requête: ${error.message}`,
        data: []
      }
    }

    console.log(`🎉 Succès! ${data?.length || 0} comptes récupérés`)

    return {
      success: true,
      data: data || [],
      count: data?.length || 0
    }
  } catch (error: any) {
    console.error('💥 Erreur API:', {
      message: error.message,
      name: error.name,
      stack: error.stack?.split('\n')[0]
    })
    
    // Handle specific network errors
    let errorMessage = 'Erreur serveur interne'
    
    if (error.message?.includes('fetch failed')) {
      errorMessage = 'Erreur réseau - Impossible de se connecter à Supabase'
    } else if (error.message?.includes('ENOTFOUND')) {
      errorMessage = 'URL Supabase invalide'
    } else if (error.code === 'ECONNREFUSED') {
      errorMessage = 'Connexion refusée par Supabase'
    }
    
    return {
      success: false,
      error: errorMessage,
      data: []
    }
  }
})
