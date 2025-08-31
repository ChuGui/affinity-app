export default defineEventHandler(async (event) => {
  // Simulation d'une base de données d'utilisateurs
  const users = [
    { id: 1, name: 'Alice Martin', email: 'alice@example.com', role: 'admin' },
    { id: 2, name: 'Bob Dupont', email: 'bob@example.com', role: 'user' },
    { id: 3, name: 'Claire Moreau', email: 'claire@example.com', role: 'user' }
  ]

  // Simulation d'un délai de requête
  await new Promise(resolve => setTimeout(resolve, 200))

  return {
    success: true,
    data: users,
    total: users.length
  }
})
