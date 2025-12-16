<template>
  <div>
    <h1>View Details</h1>
    {{ this.$route.params.id}}
    {{ route.params.id }}
  </div>
</template>

<script setup>
const route = useRoute()

// this.$axios.get(`/api/inventory/${route.params.id}`)
</script>

<style>

</style>