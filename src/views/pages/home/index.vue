<script setup>
import { useProductStore } from '@/store/index.js';

const { all: allProduct, data } = useProductStore();

const fetchProductData = async () => {
  await allProduct();
};

onMounted(() => {
  fetchProductData();
});
</script>

<template>
  <div>
    <ul>
      <li v-for="(product, index) in data" :key="index">
        <p><strong>Name:</strong> {{ product.name }}</p>
        <p><strong>Description:</strong> {{ product.description }}</p>
        <p><strong>Category:</strong> {{ product.category }}</p>
        <p><strong>Price:</strong> {{ product.price }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
ul {
  list-style: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
}

p {
  margin: 5px 0;
}
</style>
