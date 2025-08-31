import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig()
    
    // Initialize Supabase client
    const supabase = createClient(
      config.supabaseUrl,
      config.supabaseServiceRoleKey
    )

    // Fetch all accounts from ghl_accounts table
    const { data, error } = await supabase
      .from('ghl_accounts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Erreur lors de la récupération des comptes',
        data: error
      })
    }

    return {
      success: true,
      data: data || [],
      count: data?.length || 0
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Erreur serveur interne',
      data: error
    })
  }
})
