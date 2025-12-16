<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-col>
        <h1 class="text-h4 font-weight-bold">Products</h1>
      </v-col>
      <v-col cols="auto">
        <v-btn color="primary" dark @click="navigateTo('/product/new')">
          <v-icon left>mdi-plus</v-icon>
          Add Product
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mb-4">
      <v-col cols="12" md="4">
        <v-text-field
          v-model="search"
          label="Search Products"
          clearable
          outlined
          dense
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="filterCategory"
          :items="categories"
          label="Filter by Category"
          clearable
          outlined
          dense
        ></v-select>
      </v-col>
      <v-col cols="12" md="4">
        <v-select
          v-model="sortOption"
          :items="sortOptions"
          label="Sort By"
          clearable
          outlined
          dense
        ></v-select>
      </v-col>
    </v-row>
    <v-data-table
      :items="sortedProducts"
      :headers="headers"
      item-value="id"
      class="elevation-1"
      :items-per-page="itemsPerPage"
      show-select
      dense
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Manage Products</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="fetchProducts">
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </v-toolbar>
      </template>
      <template #body>
        <v-pagination
          v-model="page"
          :length="pageCount"
          total-visible="7"
          class="mt-4"
        ></v-pagination>
      </template>
      <template v-slot:actions="{ item }">
        <v-btn icon color="primary" @click="editProduct(item.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon color="error" @click="deleteProduct(item.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const products = ref([]);
const categories = ref([]);
const search = ref('');
const filterCategory = ref(null);
const sortOption = ref(null);
const page = ref(1);
const itemsPerPage = 5;

const headers = [
  { text: 'Name', value: 'name', align: 'start' },
  { text: 'Category', value: 'category', align: 'start' },
  { text: 'Price', value: 'price', align: 'end' },
  { text: 'Actions', value: 'actions', align: 'center', sortable: false },
];

const sortOptions = [
  { text: 'Name (A-Z)', value: 'name-asc' },
  { text: 'Name (Z-A)', value: 'name-desc' },
  { text: 'Price (Low to High)', value: 'price-asc' },
  { text: 'Price (High to Low)', value: 'price-desc' },
];

const fetchProducts = async () => {
  try {
    products.value = await $fetch('/api/products');
    categories.value = await $fetch('/api/categories');
  } catch (error) {
    console.error('Failed to fetch products or categories:', error);
  }
};

const filteredProducts = computed(() => {
  let filtered = products.value;

  if (search.value) {
    filtered = filtered.filter((product) =>
      product.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  if (filterCategory.value) {
    filtered = filtered.filter(
      (product) => product.category === filterCategory.value
    );
  }

  return filtered;
});

const sortedProducts = computed(() => {
  let sorted = [...filteredProducts.value];

  if (sortOption.value) {
    const [key, order] = sortOption.value.split('-');
    sorted.sort((a, b) => {
      if (order === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
  }

  const start = (page.value - 1) * itemsPerPage;
  return sorted.slice(start, start + itemsPerPage);
});

const pageCount = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));

const editProduct = (id) => {
  navigateTo(`/product/${id}`);
};

const deleteProduct = async (id) => {
  if (confirm('Are you sure you want to delete this product?')) {
    try {
      await $fetch(`/api/products/${id}`, { method: 'DELETE' });
      fetchProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  }
};

onMounted(fetchProducts);
</script>

<style scoped>
.text-h4 {
  color: #1976d2;
}
</style>