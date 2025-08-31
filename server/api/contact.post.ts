export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  // Validation simple
  if (!body.name || !body.email || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Tous les champs sont requis'
    })
  }

  // Simulation d'un traitement (base de données, email, etc.)
  console.log('Message reçu:', {
    name: body.name,
    email: body.email,
    message: body.message,
    timestamp: new Date().toISOString()
  })

  // Simulation d'un délai de traitement
  await new Promise(resolve => setTimeout(resolve, 500))

  return {
    success: true,
    message: 'Votre message a été envoyé avec succès !',
    data: {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString()
    }
  }
})
