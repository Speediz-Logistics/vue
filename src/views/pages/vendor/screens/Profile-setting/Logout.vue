<script setup>
import {useRouter } from 'vue-router';
import {useAuthStore} from "@/store/auth.js";
const router = useRouter();
const backTo = () => {
  router.push({name: 'profile-setting'});
}

const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push({name: 'login'})
}
</script>

<template>
  <div class="d-flex align-items-center justify-content-center align-content-between">
    <div class="logout-container">
      <p>Are you sure to logout?</p>
      <i class="speediz-image speediz-image-logo" />
      <div class="button gap-3 d-flex ">
        <button @click="backTo">Cancel</button>
        <button @click="handleLogout">Sure!!</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.logout-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  text-align: center;
  align-items: center;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  border: 1px solid #FFBD59;
  margin-top: 50px;
  font-family: Inter, sans-serif;

}
.logout-container p{
  font-size: 20px;
}
.logout-container img {
  width: 200px;
  height: 200px;
  padding: 10px;
}
.button button {
  border: none;
  background-color: #FFBD59;
  border-radius: 10px;
  padding: 10px;
}
.button button:hover {
  opacity: 0.8;
}
.button button:active {
  opacity: 1;
}
</style>
