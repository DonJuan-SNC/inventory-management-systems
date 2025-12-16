<template>
  <v-container>
    <v-row justify="space-between" align="center" class="mb-4">
      <v-col>
        <h1 class="text-h4 font-weight-bold">Purchase Orders</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" dark @click="navigateTo('/purchase-order/new')">
          <v-icon left>mdi-plus</v-icon>
          Add Purchase Order
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Search Purchase Orders"
          clearable
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="filterStatus"
          :items="statusOptions"
          label="Filter by Status"
          clearable
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-data-table
      :headers="headers"
      :items="filteredItems"
      item-value="id"
      class="elevation-1"
      :items-per-page="itemsPerPage"
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Manage Purchase Orders</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="fetchItems">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:actions="{ item }">
        <v-btn icon color="primary" @click="viewPurchaseOrder(item.id)">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="deletePurchaseOrder(item.id)">
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

<script setup>
import { ref, computed, onMounted } from 'vue';

const headers = [
  { text: 'ID', value: 'id' },
  { text: 'Supplier', value: 'supplier' },
  { text: 'Date', value: 'date' },
  { text: 'Total', value: 'total' },
  { text: 'Status', value: 'status' },
  { text: 'Actions', value: 'actions', sortable: false },
];

const items = ref([]);
const search = ref('');
const filterStatus = ref(null);
const page = ref(1);
const itemsPerPage = 5;

const statusOptions = ['Pending', 'Completed', 'Cancelled'];

const fetchItems = async () => {
  try {
    items.value = [
      {
        id: 1,
        supplier: 'Supplier A',
        date: '2025-12-01',
        total: 2500,
        status: 'Pending',
      },
      {
        id: 2,
        supplier: 'Supplier B',
        date: '2025-11-28',
        total: 1800,
        status: 'Completed',
      },
    ];
  } catch (error) {
    console.error('Failed to fetch purchase orders:', error);
  }
};

const filteredItems = computed(() => {
  let filtered = items.value;

  if (search.value) {
    filtered = filtered.filter((item) =>
      item.supplier.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (filterStatus.value) {
    filtered = filtered.filter((item) => item.status === filterStatus.value);
  }

  const start = (page.value - 1) * itemsPerPage;
  return filtered.slice(start, start + itemsPerPage);
});

const pageCount = computed(() => Math.ceil(items.value.length / itemsPerPage));

const viewPurchaseOrder = (id) => {
  navigateTo(`/purchase-order/${id}`);
};

const deletePurchaseOrder = async (id) => {
  if (confirm('Are you sure you want to delete this purchase order?')) {
    try {
      items.value = items.value.filter((item) => item.id !== id);
    } catch (error) {
      console.error('Failed to delete purchase order:', error);
    }
  }
};

onMounted(fetchItems);
</script>

<style scoped>
.text-h4 {
  color: #1976d2;
}
</style>