<template>
  <div>
    <h1>Inventory Management System - Inventory</h1>
    <v-data-table :headers="headers" :items="items">
  <template v-slot:[`item.actions`]="{ item }">
        <v-btn color="primary" size="small" :to="`/inventory/${item.id}`">View</v-btn>
    </template>
    </v-data-table>
  </div>
</template>

<script  setup>
const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Name', value: 'name' },
  { title: 'Species', value: 'species' },
  { title: 'Diet', value: 'diet' },
  { title: 'Habitat', value: 'habitat' },
  { title: '', value: 'actions'}

]
const items = [
    {
      id: 1,
      name: 'African Elephant',
      species: 'Loxodonta africana',
      diet: 'Herbivore',
      habitat: 'Savanna, Forests',
    },
    {
      id: 2,
      name: 'African Elephant 2',
      species: 'Loxodonta africana 2',
      diet: 'Herbivore 2',
      habitat: 'Savanna, Forests 2',
    },
    {
      id: 3,
      name: 'African Elephant 3',
      species: 'Loxodonta africana 3',
      diet: 'Herbivore 3',
      habitat: 'Savanna, Forests 3',
    },
    {
      id: 4,
      name: 'African Elephant 4',
      species: 'Loxodonta africana 4',
      diet: 'Herbivore 4',
      habitat: 'Savanna, Forests 4',
    },
    {
      id: 5,
      name: 'African Elephant 5',
      species: 'Loxodonta africana 5',
      diet: 'Herbivore 5',
      habitat: 'Savanna, Forests 5',
    },
  
  ]
</script>

<style>

</style>