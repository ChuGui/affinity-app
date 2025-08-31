// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/ui', '@nuxt/image'],

  // ✅ très important pour Supabase: Node runtime
  nitro: {
    preset: 'vercel',           // et surtout PAS 'vercel-edge'
    routeRules: {
      '/api/**': { node: true } // force Node pour toutes tes routes API
    }
  },

  runtimeConfig: {
    // ⚠️ privé (côté serveur uniquement)
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY, // si tu en as besoin côté serveur
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

    // ✅ public (accessible au navigateur uniquement si nécessaire)
    public: {
      // idéalement utilise des variables préfixées NUXT_PUBLIC_* en .env
      supabaseUrl: process.env.NUXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
      supabaseAnonKey: process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY
    }
  }
})
