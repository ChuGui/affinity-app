export default defineEventHandler(async (event) => {
  try {
    console.log('🧪 Test de connectivité réseau...')
    
    // Test 1: Connexion basique à Supabase
    const supabaseUrl = process.env.SUPABASE_URL
    console.log(`🔗 Test connexion à: ${supabaseUrl}`)
    
    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'GET',
      headers: {
        'apikey': process.env.SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    
    console.log(`📊 Status: ${response.status}`)
    console.log(`📋 Headers:`, Object.fromEntries(response.headers.entries()))
    
    if (response.ok) {
      return {
        success: true,
        message: 'Connexion Supabase réussie',
        status: response.status,
        headers: Object.fromEntries(response.headers.entries())
      }
    } else {
      return {
        success: false,
        message: `Erreur HTTP: ${response.status}`,
        status: response.status
      }
    }
    
  } catch (error: any) {
    console.error('💥 Erreur de test:', error)
    return {
      success: false,
      error: error.message,
      type: error.constructor.name
    }
  }
})
