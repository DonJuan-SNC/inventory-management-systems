<template>
  <v-container>
    <h1 class="text-h4 font-weight-bold mb-4">Inventory Management System - Reports</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Sales Report</v-card-title>
          <v-card-text>
            <Bar :data="salesData" :options="chartOptions" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="downloadReport('sales')">Download</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>Inventory Levels</v-card-title>
          <v-card-text>
            <Line :data="inventoryData" :options="chartOptions" />
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="downloadReport('inventory')">Download</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Summary</v-card-title>
          <v-card-text>
            <v-data-table :headers="summaryHeaders" :items="summaryData" dense>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { Bar, Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from 'chart.js';
import { ref } from 'vue';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, LineElement, PointElement);

const salesData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
  datasets: [
    {
      label: 'Sales',
      data: [1200, 1900, 3000, 5000, 2000],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
    },
  ],
});

const inventoryData = ref({
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Stock Levels',
      data: [150, 120, 180, 200],
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      tension: 0.1,
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});

const summaryHeaders = [
  { text: 'Metric', value: 'metric' },
  { text: 'Value', value: 'value' },
];

const summaryData = [
  { metric: 'Total Sales', value: '$13,100' },
  { metric: 'Average Inventory Level', value: '162 units' },
];

const downloadReport = (type) => {
  alert(`Downloading ${type} report...`);
};
</script>

<style scoped>
.text-h4 {
  color: #1976d2;
}
</style>