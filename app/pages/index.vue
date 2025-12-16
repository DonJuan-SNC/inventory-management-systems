<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-card class="pa-4 mb-4" color="primary" dark>
            <v-card-title class="text-h4 d-flex align-center justify-space-between">
              <div>
                <v-icon class="me-2">mdi-view-dashboard</v-icon>
                Inventory Management System Dashboard
              </div>
              <v-chip color="white" text-color="primary" class="font-weight-bold">
                Last Updated: {{ currentDate }}
              </v-chip>
            </v-card-title>
            <v-card-subtitle>Welcome back! Here's an overview of your inventory operations.</v-card-subtitle>
            <v-card-actions>
              <v-btn color="white" variant="outlined" prepend-icon="mdi-plus" class="me-2">
                Add New Order
              </v-btn>
              <v-btn color="white" variant="outlined" prepend-icon="mdi-file-chart">
                View Reports
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <!-- Quick Stats -->
      <v-row class="mb-4">
        <v-col cols="12" sm="6" md="3">
          <v-card elevation="2" class="pa-3 text-center" color="blue lighten-5">
            <v-icon size="36" color="blue">mdi-package-variant-closed</v-icon>
            <div class="text-h6 font-weight-bold">{{ totalProducts }}</div>
            <div class="text-caption">Total Products</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card elevation="2" class="pa-3 text-center" color="green lighten-5">
            <v-icon size="36" color="green">mdi-truck-check</v-icon>
            <div class="text-h6 font-weight-bold">{{ completedOrders }}</div>
            <div class="text-caption">Completed Orders</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card elevation="2" class="pa-3 text-center" color="orange lighten-5">
            <v-icon size="36" color="orange">mdi-clock-alert</v-icon>
            <div class="text-h6 font-weight-bold">{{ pendingOrders }}</div>
            <div class="text-caption">Pending Orders</div>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="3">
          <v-card elevation="2" class="pa-3 text-center" color="purple lighten-5">
            <v-icon size="36" color="purple">mdi-account-group</v-icon>
            <div class="text-h6 font-weight-bold">{{ totalSuppliers }}</div>
            <div class="text-caption">Active Suppliers</div>
          </v-card>
        </v-col>
      </v-row>

      <!-- Main Widgets -->
      <v-row class="mb-6">
        <v-col cols="12" md="4">
          <v-card elevation="4" class="pa-4 text-center">
            <v-tooltip text="View detailed order statuses">
              <template v-slot:activator="{ props }">
                <v-icon size="48" color="primary" class="mb-2" v-bind="props">mdi-clipboard-list</v-icon>
              </template>
            </v-tooltip>
            <v-card-title class="text-h5">Purchase Orders by Status</v-card-title>
            <v-card-text>
              <v-chip color="warning" class="ma-1">Pending: {{ pendingOrders }}</v-chip>
              <v-chip color="success" class="ma-1">Completed: {{ completedOrders }}</v-chip>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card elevation="4" class="pa-4 text-center">
            <v-tooltip text="Products currently assigned to suppliers">
              <template v-slot:activator="{ props }">
                <v-icon size="48" color="success" class="mb-2" v-bind="props">mdi-package-variant-closed</v-icon>
              </template>
            </v-tooltip>
            <v-card-title class="text-h5">Product Count Assigned to Supplier</v-card-title>
            <v-card-text class="text-h3 font-weight-bold">{{ totalAssignedProducts }}</v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card elevation="4" class="pa-4">
            <v-card-title class="d-flex align-center">
              <v-tooltip text="Recent delivery activities">
                <template v-slot:activator="{ props }">
                  <v-icon class="me-2" v-bind="props">mdi-truck-delivery</v-icon>
                </template>
              </v-tooltip>
              Delivery History per Day
            </v-card-title>
            <v-card-text>
              <v-timeline dense>
                <v-timeline-item
                  v-for="delivery in recentDeliveries"
                  :key="delivery.id"
                  small
                  color="primary"
                >
                  <template v-slot:opposite>
                    <span class="text-caption">{{ delivery.date }}</span>
                  </template>
                  <div class="text-body-2">{{ delivery.description }}</div>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Charts -->
      <v-row class="mb-4">
        <v-col cols="12">
          <v-card elevation="2" class="pa-4">
            <v-card-title>Filter Data</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-model="dateRange"
                    label="Date Range"
                    readonly
                    prepend-icon="mdi-calendar"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    v-model="selectedSupplier"
                    :items="suppliers"
                    label="Filter by Supplier"
                    prepend-icon="mdi-truck"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-btn color="primary" @click="applyFilters">Apply Filters</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-card elevation="4">
            <v-card-title class="d-flex align-center">
              <v-icon class="me-2">mdi-chart-pie</v-icon>
              Purchase Orders Status
            </v-card-title>
            <v-card-text>
              <div class="chart-container">
                <Bar :data="ordersStatusData" :options="chartOptions" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="6">
          <v-card elevation="4">
            <v-card-title class="d-flex align-center">
              <v-icon class="me-2">mdi-chart-line</v-icon>
              Delivery History per Day
            </v-card-title>
            <v-card-text>
              <div class="chart-container">
                <Line :data="deliveryHistoryData" :options="chartOptions" />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { Bar, Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement)

const baseUrl = useRuntimeConfig().public.strapiBaseURL;
const pendingOrders = ref(5);
const completedOrders = ref(12);
const totalAssignedProducts = ref(150);
const totalProducts = ref(45);
const totalSuppliers = ref(8);
const currentDate = ref(new Date().toLocaleDateString());
const dateRange = ref('Last 7 days');
const selectedSupplier = ref('');
const suppliers = ref(['Supplier A', 'Supplier B', 'Supplier C']);
const recentDeliveries = ref([
  { id: 1, date: 'Dec 15', description: 'Delivered 20 units to Supplier A' },
  { id: 2, date: 'Dec 14', description: 'Delivered 15 units to Supplier B' },
  { id: 3, date: 'Dec 13', description: 'Delivered 10 units to Supplier C' },
]);

const ordersStatusData = ref({
  labels: ['Pending', 'Completed', 'In Progress'],
  datasets: [{
    label: 'Orders',
    data: [5, 12, 3],
    backgroundColor: ['rgba(255, 193, 7, 0.5)', 'rgba(76, 175, 80, 0.5)', 'rgba(33, 150, 243, 0.5)'],
    borderColor: ['rgba(255, 193, 7, 1)', 'rgba(76, 175, 80, 1)', 'rgba(33, 150, 243, 1)'],
    borderWidth: 1
  }]
});

const deliveryHistoryData = ref({
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [{
    label: 'Deliveries',
    data: [5, 8, 12, 7, 10, 6, 9],
    borderColor: 'rgba(156, 39, 176, 1)',
    backgroundColor: 'rgba(156, 39, 176, 0.2)',
    tension: 0.1
  }]
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});

const fetchCounts = async () => {
  // Mock data for now
  pendingOrders.value = 5;
  completedOrders.value = 12;
  totalAssignedProducts.value = 150;
  totalProducts.value = 45;
  totalSuppliers.value = 8;
};

const applyFilters = () => {
  // Implement filtering logic here
  console.log('Applying filters:', dateRange.value, selectedSupplier.value);
};

onMounted(() => {
  if (process.client) {
    if (!localStorage.getItem('loggedIn')) {
      navigateTo('/login')
    } else {
      fetchCounts();
    }
  }
});
</script>

<style scoped>
.chart-container {
  height: 300px;
}

.v-card-title {
  font-weight: 600;
}

.v-timeline-item__body {
  padding-left: 8px;
}

.v-card {
  transition: transform 0.2s ease-in-out;
}

.v-card:hover {
  transform: translateY(-4px);
}
</style>