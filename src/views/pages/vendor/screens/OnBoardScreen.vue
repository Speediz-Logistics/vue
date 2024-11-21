<template>
  <div class="card bg-white shadow-md rounded-2xl p-6">
    <i class="speediz-image speediz-image-logo h-8" />
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="h2 font-weight-bold">Quick Delivery</h2>
    </div>
    <div class="bg-gray-100 p-4 rounded-md">
      <div class="row g-4">
        <div v-for="n in 3" :key="n" class="col-4 d-flex align-items-center">
          <div class="bg-purple-500 rounded-circle me-2" style="width: 2rem; height: 2rem"></div>
          <span class="text-gray-600">Location {{ n }}</span>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <button class="btn btn-purple text-white px-4 py-2 rounded-md hover:bg-purple-600">Explore</button>
    </div>
  </div>
</template>

<script setup>
// No JavaScript code needed
</script>
