export const getProfileRoute = () => ({
  method: 'GET',
  path: '/profile/:tenantId',
  description: 'Serves a public rent history profile page or JSON payload.',
});

