<template>
  <div>
    <h1>Inventory Management System - User Management</h1>
    <v-data-table :headers="headers" :items="items">
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" size="small" :to="`/user/${item.id}`">Edit</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script setup>
const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Email', value: 'email' },
  { title: 'Role', value: 'role' },
  { title: '', value: 'actions' }
]
const items = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Admin'
  },
  {
    id: 2,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Manager'
  },
  {
    id: 3,
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'Staff'
  }
]
</script>

<style>
</style>