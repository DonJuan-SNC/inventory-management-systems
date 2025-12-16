export default defineNuxtRouteMiddleware((to, from) => {
  const user = useAuthStore(); // Assuming Pinia store for authentication

  if (!user.isAuthenticated && to.name !== 'login') {
    return navigateTo('/login');
  }

  if (to.meta.requiresAuth && !user.hasRole(to.meta.allowedRoles)) {
    return navigateTo('/');
  }
});