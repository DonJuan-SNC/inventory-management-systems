import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    hasRole: (state) => (roles) => roles.includes(state.user?.role),
  },
  actions: {
    async login(credentials) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: credentials,
        });
        this.user = response.user;
        this.token = response.token;
      } catch (error) {
        throw new Error('Login failed');
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      navigateTo('/login');
    },
  },
});