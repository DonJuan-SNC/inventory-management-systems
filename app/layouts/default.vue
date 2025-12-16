<template>
  <v-app>
    <!-- NAVIGATION DRAWER -->
    <v-navigation-drawer v-model="drawer" permanent app>
      <v-list>
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          subtitle="admin@gmail.com"
          title="Inventory Management System Admin"
        ></v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list density="compact" nav>
        <v-list-item
          prepend-icon="mdi-view-dashboard"
          title="Dashboard"
          to="/"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-package-variant"
          title="Product"
          to="/product"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-clipboard-list"
          title="Purchase Order"
          to="/purchase-order"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-truck"
          title="Suppliers"
          to="/suppliers"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-chart-line"
          title="Reports"
          to="/reports"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-account-group"
          title="User"
          to="/user"
        ></v-list-item>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Logout"
          @click="logout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- APPBAR -->
    <v-app-bar elevation="2" color="primary" dark>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>
      <v-app-bar-title>Inventory Management System</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <slot />
      </v-container>
    </v-main>

    <!-- FOOTER -->
    <v-footer app>
      <v-container>
        <v-row justify="center">
          <v-col class="text-center">
            <span>&copy; 2025 Inventory Management System. All rights reserved.</span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
const drawer = ref(true)

const logout = () => {
  localStorage.removeItem('loggedIn')
  navigateTo('/login')
}
</script>

<style>
/* Add professional styling */
.v-navigation-drawer {
  background-color: #f5f5f5;
}

.v-list-item {
  font-weight: 500;
}

.v-app-bar {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.v-footer {
  background-color: #f5f5f5;
  color: #424242;
}
</style>