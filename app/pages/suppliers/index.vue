<template>
  <v-container>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col>
        <h1 class="text-h4 font-weight-bold">Suppliers</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" dark @click="navigateTo('/suppliers/new')">
          <v-icon left>mdi-plus</v-icon>
          Add Supplier
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Search Suppliers"
          clearable
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="filterCity"
          :items="cityOptions"
          label="Filter by City"
          clearable
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="sortedSuppliers"
      item-value="id"
      class="elevation-1"
      :items-per-page="itemsPerPage"
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Manage Suppliers</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="fetchSuppliers">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:actions="{ item }">
        <v-btn icon color="primary" @click="editSupplier(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="deleteSupplier(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      v-model="page"
      :length="pageCount"
      total-visible="7"
      class="mt-4"
    ></v-pagination>
  </v-container>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Name', value: 'name' },
  { text: 'Contact', value: 'contact' },
  { text: 'Address', value: 'address' },
  { text: 'City', value: 'city' },
  { text: 'Actions', value: 'actions', sortable: false },
];

const suppliers = ref([]);
const search = ref('');
const filterCity = ref(null);
const page = ref(1);
const itemsPerPage = 5;

const cityOptions = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'];

const fetchSuppliers = async () => {
  try {
    suppliers.value = [
      { id: 1, name: 'Supplier A', contact: '123-456-7890', address: '123 Main St', city: 'New York' },
      { id: 2, name: 'Supplier B', contact: '987-654-3210', address: '456 Elm St', city: 'Los Angeles' },
    ];
  } catch (error) {
    console.error('Failed to fetch suppliers:', error);
  }
};

const filteredSuppliers = computed(() => {
  let filtered = suppliers.value;

  if (search.value) {
    filtered = filtered.filter((supplier) =>
      supplier.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (filterCity.value) {
    filtered = filtered.filter((supplier) => supplier.city === filterCity.value);
  }

  return filtered;
});

const sortedSuppliers = computed(() => {
  return filteredSuppliers.value.sort((a, b) => a.name.localeCompare(b.name));
});

const pageCount = computed(() => Math.ceil(suppliers.value.length / itemsPerPage));

const editSupplier = (id: number) => {
  navigateTo(`/suppliers/${id}`);
};

const deleteSupplier = async (id: number) => {
  if (confirm('Are you sure you want to delete this supplier?')) {
    try {
      suppliers.value = suppliers.value.filter((supplier) => supplier.id !== id);
    } catch (error) {
      console.error('Failed to delete supplier:', error);
    }
  }
};

onMounted(fetchSuppliers);
</script>

<style scoped>
.text-h4 {
  color: #1976d2;
}
</style>