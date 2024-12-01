<script setup>

import RegisterForm from "@/components/registerForm.vue";
</script>

<template >
  <div class="background">
    <i class="speediz-image speediz-image-vendorRegisterbg"></i>
  </div>
<div class="container">
  <div class="register-item">
    <img src="@/assets/icon/loginScreenIcon.svg" alt="register item"></img>
  </div>
  <div class="register-form">
    <RegisterForm/>
  </div>
</div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: row;
  animation: content-fade-in 0.6s;

  .register-item {
    z-index: 2;
    position: relative;
    top: 40px;
    left: 0;
    padding: 20px;
    width: 300px;
    height: 500px;
    animation: reigster-item-animation 4s infinite;
  }

  .register-form {
    z-index: 3;
    top: 40px;
    left: 300px;
    padding: 20px;
    position: relative;
    width: 500px;
    height: 550px;
    background: #fff;
    border-radius: 10px;
    border: 1px solid $primary-color;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    animation: content-fade-in 0.6s;

  }
}
@keyframes reigster-item-animation {
  0%{
    opacity: 1;
    transform: scale(0.8) translateY(-50px);
  }50%{
  opacity: 1;
  transform: scale(1) translateY(0);
     }100%{
  opacity: 1;
  transform: scale(0.8) translateY(-50px);
           }
}


</style>
