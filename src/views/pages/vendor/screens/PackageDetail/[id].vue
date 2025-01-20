<script setup>

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {useRouter, useRoute} from "vue-router";
import PackageDetail from "@/components/packageDetail.vue";
import { usePackageStore } from "@/store/package.js";

const router = useRouter();
const route = useRoute();
 const backTo = () => {
   router.push({name: "package-management"});
 }

const packageStore = usePackageStore();
const packageDetail = ref({});
const fetchPackageDetail = async (id) => {
  try {
    await packageStore.show(id);
    packageDetail.value = packageStore.packageDetail;
    console.log(packageDetail);
  } catch (error) {
    console.error('Error fetching package detail:', error);
  }
};

onMounted(() => {
  const id = route.params.id;
  fetchPackageDetail(id);
});
</script>

<template>
  <div class="page d-flex">
    <div class="side-bar ">
      <h1>Package Detail</h1>
      <button @click="backTo({name:'package-management'})">
        <font-awesome-icon :icon="['fas', 'arrow-left']"/>
        Package Management
      </button>
    </div>

    <div class="d-flex flex-column gap-3">
      <header>
        <ul class="header-container d-flex gap-3">
          <li>
            <a class href="#">
              <img src="@/assets/images/speediz-logo.png" alt="logo">
            </a>
          </li>
          <li class="w-100">
            <input type="text" placeholder="Search package by phone number" class="search"  />
          </li>
          <li class="icon">
            <a>
              <font-awesome-icon :icon="['far', 'bell']" />
            </a>
          </li>
          <li class="icon">
            <a @click="logout">
              <font-awesome-icon :icon="['far', 'user']" />
            </a>
          </li>
        </ul>
      </header>

      <div>
        <package-detail :packageDetail="packageDetail" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page{
  background-color: #E8E8E8;
  font-family: Inter, sans-serif;
}
.header-container {
  justify-content: end;
  margin-left: 50px;
  margin-top: 10px;
  align-items: center;
  gap: 20px;
  padding: 10px 60px 10px 10px;
  background: #fff;
  border-radius: 30px;
  width: 1354px;
  height: 91px;
}
.header-container img{
  width: 262px;
  height: 74px;
}
.header-container .icon{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid #E8E8E8;
  justify-content: center;
  align-items: center;
  display: flex;
}
.search {
  margin-left: 50px;
  width: 800px;
  height: 50px;
  border-radius: 20px;
  font-size: 14px;
  border: none;
  background: #E8E8E8;
  padding: 0 20px;
}


.side-bar{
  background-color: #FFBD59;
  width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-family: Inter, sans-serif;
}
.side-bar h1{
  margin: 10px;
  font-weight: bold;
  font-size: 30px;
  text-align: center;
}
.side-bar button{
  margin-bottom: 50px;
  padding: 20px;
  width: 300px;
  border: none;
  align-items: center;
  gap:  20px;
}
.side-bar button:hover{
  transform: scale(1.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.side-bar button:active{
  animation: button-animation 0.5s ease-in;
  transform: scale(1.05);
  transform-style: preserve-3d;
}
</style>
