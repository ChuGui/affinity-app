import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async () => {
    
  try {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('🔍 Test connexion Supabase:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      url: supabaseUrl
    })
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        success: false,
        error: 'Variables d\'environnement manquantes',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey
        }
      }
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    
    // Test simple de connexion
    const { data, error } = await supabase
      .from('conversation_summaries')
      .select('*')

    if (error) {
      console.error('❌ Erreur Supabase:', error)
      return {
        success: false,
        error: error.message,
        code: error.code,
        details: error.details
      }
    }

    console.log('✅ Connexion réussie!')
    
    return {
      success: true,
      message: 'Connexion Supabase réussie',
      data: data,
      count: data?.length || 0
    }
    
  } catch (error: any) {
    console.error('💥 Erreur:', error)
    return {
      success: false,
      error: error.message || 'Erreur inconnue',
      type: error.constructor.name
    }
  }
})
