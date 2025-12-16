<template>
  <v-container fluid class="fill-height">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card elevation="12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login to Inventory Management System</v-toolbar-title>
          </v-toolbar>
          <v-card-text class="pt-4">
            <v-form ref="loginForm" v-model="valid" @submit.prevent="login">
              <v-text-field
                v-model="email"
                label="Email"
                type="email"
                :rules="[rules.required, rules.email]"
                prepend-inner-icon="mdi-email"
                variant="outlined"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                type="password"
                :rules="[rules.required]"
                prepend-inner-icon="mdi-lock"
                variant="outlined"
              ></v-text-field>
              <v-btn
                type="submit"
                color="primary"
                block
                size="large"
                :loading="loading"
                :disabled="!valid"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const email = ref('')
const password = ref('')
const valid = ref(false)
const loading = ref(false)
const loginForm = ref(null)

const rules = {
  required: (v) => !!v || 'Required',
  email: (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}

const login = async () => {
  const { valid: isValid } = await loginForm.value.validate()
  if (!isValid) return

  loading.value = true
  try {
    // Simulate login API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    // Set logged in
    localStorage.setItem('loggedIn', 'true')
    // Redirect to dashboard
    await navigateTo('/')
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

definePageMeta({
  layout: false
})
</script>

<style scoped>
.fill-height {
  height: 100vh;
}
</style>