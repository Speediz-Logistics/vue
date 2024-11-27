<template>
  <div>
    <SplashScreen v-if="showSplashScreen" />
    <OnBoardScreen v-else />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import useCookies from '@composables/useCookie.js';
import SplashScreen from '@/views/pages/vendor/screens/SplashScreen.vue';
import OnBoardScreen from '@/views/pages/vendor/screens/OnBoardScreen.vue';

const { getCookie, setCookie } = useCookies();
const showSplashScreen = ref(true);

onMounted(() => {
  const splashScreenCookie = getCookie('splashScreenShown');

  if (splashScreenCookie === 'true') {
    // If cookie exists, skip splash screen
    showSplashScreen.value = false;
  } else {
    // If no cookie, show splash screen and set cookie afterward
    setTimeout(() => {
      handleSplashFinish();
    }, 2000); // Optional delay for splash screen
  }
});

const handleSplashFinish = () => {
  setCookie('splashScreenShown', 'true', { expires: '7d', path: '/' });
  showSplashScreen.value = false;
};
</script>
