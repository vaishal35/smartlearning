// Placeholder AI-related controllers returning mocked data

// Generate simple notes for the user based on interest
export async function getNotes(req, res) {
  res.json({ notes: [`Remember to keep practising ${req.user.interest}.`] })
}

// Provide basic learning recommendations
export async function getRecommendations(req, res) {
  res.json({ recommendations: [`Explore advanced topics in ${req.user.interest}.`] })
}
