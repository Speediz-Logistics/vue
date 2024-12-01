<template>
  <div class="page">
    <i class="speediz-image speediz-image-VendorWelcome" />
  </div>
  <div class="container">
    <div class="icon">
      <a >
        <img src="@/assets/icon/loginScreenIcon.svg" alt="loginScreenIcon" />
      </a>
    </div>
    <div class="login-form">
      <loginForm></loginForm>
    </div>
  </div>
</template>

<script setup>
import loginForm from "@/components/loginForm.vue";
</script>

<style scoped lang="scss">
.page{
  animation: content-fade-in 0.6s;
}
.container {
  position: relative;
  display: flex;
  animation: content-fade-in 0.6s;

}
.container .icon{
  position: relative;
  z-index: 2;
  top:40px;
  left:0px;
  padding: 20px;
  width: 300px;
  height: 500px;
}

.container .login-form{
  width: 300px;
  height: 50%;
  top: 60px;
  left: 20%;
  padding: 10px;
  position: relative;
  z-index: 3;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border: 0.5px solid #FFBD59;

}
</style>
