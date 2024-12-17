<script setup>
import { useMetaTag } from '@/composables/useMetaTag';
import HomeIndex from '@/views/pages/home/index.vue';

// Set meta tags for SEO
useMetaTag({
  title: 'Speediz',
  name: 'Speediz | Vendor',
  description: 'Vendor page',
  url: 'https://ite-alumni-dev.decapsoul.one/',
  image: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
  type: 'article',
  siteName: 'Coming Soon',
  locale: 'en_US',
});

const prefix = import.meta.env.VITE_PREFIX;
const prefixClass = {
  [`${prefix}-wrapper`]: true,
};
</script>

<template>
  <div :class="prefixClass">
    <HomeIndex />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/scss/layouts/home';
</style>
