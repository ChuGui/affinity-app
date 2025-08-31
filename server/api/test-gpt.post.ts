export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { message } = body
    
    console.log('🤖 Test ChatGPT:', {
      hasMessage: !!message,
      messageLength: message?.length || 0
    })
    
    if (!message || !message.trim()) {
      return {
        success: false,
        error: 'Message requis'
      }
    }

    const openaiApiKey = process.env.OPENAI_API_KEY
    
    if (!openaiApiKey) {
      return {
        success: false,
        error: 'Clé API OpenAI manquante'
      }
    }

    // Appel à l'API ChatGPT
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('❌ Erreur API OpenAI:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      })
      
      return {
        success: false,
        error: `Erreur API OpenAI: ${response.status} ${response.statusText}`
      }
    }

    const data = await response.json()
    const gptResponse = data.choices[0]?.message?.content || 'Aucune réponse'
    
    console.log('✅ Réponse ChatGPT reçue:', {
      responseLength: gptResponse.length,
      tokensUsed: data.usage?.total_tokens || 0
    })

    return {
      success: true,
      data: gptResponse,
      usage: data.usage
    }

  } catch (error: any) {
    console.error('❌ Erreur test ChatGPT:', error)
    
    return {
      success: false,
      error: 'Erreur serveur lors de l\'appel à ChatGPT',
      details: {
        message: error.message,
        name: error.name
      }
    }
  }
})
